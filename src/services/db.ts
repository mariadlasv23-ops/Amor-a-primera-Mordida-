/**
 * Room-like Offline Database for "Pastelería y Repostería: Amor a primera mordida D'yaliz"
 * Uses IndexedDB with transparent LocalStorage fallback.
 * Guarantees 100% offline availability of the dessert catalog, favorites, and custom event quotes.
 */
import { INITIAL_PRODUCTS } from '../data/products';
import { Product, QuoteItem, UserProfile } from '../types';

const DB_NAME = 'dyaliz_pasteleria_room_db';
const DB_VERSION = 3;
const STORE_PRODUCTS = 'products';
const STORE_FAVORITES = 'favorites';
const STORE_QUOTES = 'quotes';

class OfflineDatabase {
  private db: IDBDatabase | null = null;
  private isInitialized = false;

  public async init(): Promise<void> {
    if (this.isInitialized) return;

    if (typeof window === 'undefined' || !window.indexedDB) {
      // LocalStorage fallback
      this.initLocalStorageFallback();
      this.isInitialized = true;
      return;
    }

    return new Promise((resolve) => {
      try {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (db.objectStoreNames.contains(STORE_PRODUCTS)) {
            db.deleteObjectStore(STORE_PRODUCTS);
          }
          const productStore = db.createObjectStore(STORE_PRODUCTS, { keyPath: 'id' });
          productStore.createIndex('categoryId', 'categoryId', { unique: false });

          if (!db.objectStoreNames.contains(STORE_FAVORITES)) {
            db.createObjectStore(STORE_FAVORITES, { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains(STORE_QUOTES)) {
            db.createObjectStore(STORE_QUOTES, { keyPath: 'id' });
          }
        };

        request.onsuccess = async (event) => {
          this.db = (event.target as IDBOpenDBRequest).result;
          this.isInitialized = true;
          await this.syncProducts();
          resolve();
        };

        request.onerror = () => {
          this.initLocalStorageFallback();
          this.isInitialized = true;
          resolve();
        };
      } catch (e) {
        this.initLocalStorageFallback();
        this.isInitialized = true;
        resolve();
      }
    });
  }

  private initLocalStorageFallback(): void {
    localStorage.setItem(`${DB_NAME}_${STORE_PRODUCTS}`, JSON.stringify(INITIAL_PRODUCTS));
  }

  private async syncProducts(): Promise<void> {
    if (!this.db) return;
    try {
      const tx = this.db.transaction(STORE_PRODUCTS, 'readwrite');
      const store = tx.objectStore(STORE_PRODUCTS);
      store.clear();
      for (const p of INITIAL_PRODUCTS) {
        store.put(p);
      }
      localStorage.setItem(`${DB_NAME}_${STORE_PRODUCTS}`, JSON.stringify(INITIAL_PRODUCTS));
    } catch (e) {
      console.warn('Sync products error:', e);
    }
  }

  private getProductCount(): Promise<number> {
    return new Promise((resolve) => {
      if (!this.db) return resolve(0);
      try {
        const tx = this.db.transaction(STORE_PRODUCTS, 'readonly');
        const store = tx.objectStore(STORE_PRODUCTS);
        const countReq = store.count();
        countReq.onsuccess = () => resolve(countReq.result);
        countReq.onerror = () => resolve(0);
      } catch {
        resolve(0);
      }
    });
  }

  // --- Products DAO Methods ---
  public async getAllProducts(): Promise<Product[]> {
    await this.init();

    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db!.transaction(STORE_PRODUCTS, 'readonly');
          const store = tx.objectStore(STORE_PRODUCTS);
          const req = store.getAll();
          req.onsuccess = () => {
            const res = req.result as Product[];
            resolve(res && res.length > 0 ? res : INITIAL_PRODUCTS);
          };
          req.onerror = () => resolve(INITIAL_PRODUCTS);
        } catch {
          resolve(INITIAL_PRODUCTS);
        }
      });
    }

    const saved = localStorage.getItem(`${DB_NAME}_${STORE_PRODUCTS}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  }

  // --- Favorites DAO Methods ---
  public async getFavorites(): Promise<string[]> {
    await this.init();
    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db!.transaction(STORE_FAVORITES, 'readonly');
          const store = tx.objectStore(STORE_FAVORITES);
          const req = store.getAll();
          req.onsuccess = () => {
            const list = req.result as { id: string }[];
            resolve(list.map((item) => item.id));
          };
          req.onerror = () => resolve([]);
        } catch {
          resolve([]);
        }
      });
    }
    const saved = localStorage.getItem(`${DB_NAME}_${STORE_FAVORITES}`);
    return saved ? JSON.parse(saved) : [];
  }

  public async toggleFavorite(productId: string): Promise<boolean> {
    await this.init();
    const favs = await this.getFavorites();
    const isFav = favs.includes(productId);
    const newFavs = isFav ? favs.filter((id) => id !== productId) : [...favs, productId];

    if (this.db) {
      const tx = this.db.transaction(STORE_FAVORITES, 'readwrite');
      const store = tx.objectStore(STORE_FAVORITES);
      if (isFav) {
        store.delete(productId);
      } else {
        store.put({ id: productId, timestamp: Date.now() });
      }
    }

    localStorage.setItem(`${DB_NAME}_${STORE_FAVORITES}`, JSON.stringify(newFavs));
    return !isFav;
  }

  // --- Quote / Event Order Builder DAO Methods ---
  public async getQuoteItems(): Promise<QuoteItem[]> {
    await this.init();
    const saved = localStorage.getItem(`${DB_NAME}_${STORE_QUOTES}`);
    return saved ? JSON.parse(saved) : [];
  }

  public async saveQuoteItems(items: QuoteItem[]): Promise<void> {
    await this.init();
    localStorage.setItem(`${DB_NAME}_${STORE_QUOTES}`, JSON.stringify(items));
  }

  // --- User Profile (DataStore / Local persistence) ---
  public getUserProfile(): UserProfile | null {
    try {
      const saved = localStorage.getItem(`${DB_NAME}_user_profile`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading user profile:', e);
    }
    return null;
  }

  public saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(`${DB_NAME}_user_profile`, JSON.stringify(profile));
    } catch (e) {
      console.warn('Error saving user profile:', e);
    }
  }

  public clearUserProfile(): void {
    try {
      localStorage.removeItem(`${DB_NAME}_user_profile`);
    } catch (e) {
      console.warn('Error clearing user profile:', e);
    }
  }
}

export const offlineDb = new OfflineDatabase();
