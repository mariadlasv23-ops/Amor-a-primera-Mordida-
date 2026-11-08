import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Sparkles,
  Heart,
  Cake,
  ArrowRight,
  X,
} from 'lucide-react';
import { ActiveTab, Product, QuoteItem, UserProfile } from './types';
import { CATEGORIES } from './data/products';
import { offlineDb } from './services/db';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { ContactScreen } from './components/ContactScreen';
import { QuoteBuilderModal } from './components/QuoteBuilderModal';
import { AndroidDeviceFrame } from './components/AndroidDeviceFrame';
import { LoginScreen } from './components/LoginScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { usePWAInstall } from './hooks/usePWAInstall';
import { AppDownloadModal } from './components/AppDownloadModal';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isAndroidFrameView, setIsAndroidFrameView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // PWA Install / App Download state
  const { isInstallable, isInstalled, isIOS, isDismissed, install, dismiss } = usePWAInstall();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // User Profile & Screen lifecycle: 'loading' | 'login' | 'welcome' | 'app'
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [screenState, setScreenState] = useState<'loading' | 'login' | 'welcome' | 'app'>('loading');

  // Initialize offline Room-like DB & Check saved UserProfile
  useEffect(() => {
    async function loadData() {
      try {
        await offlineDb.init();
        const loadedProducts = await offlineDb.getAllProducts();
        const loadedFavorites = await offlineDb.getFavorites();
        const loadedQuotes = await offlineDb.getQuoteItems();
        const savedUser = offlineDb.getUserProfile();

        setProducts(loadedProducts);
        setFavorites(loadedFavorites);
        setQuoteItems(loadedQuotes);

        if (savedUser && savedUser.isRegistered) {
          setCurrentUser(savedUser);
          setScreenState('app');
        } else {
          setScreenState('login');
        }
      } catch (err) {
        console.error('Error loading offline database:', err);
        setScreenState('login');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Handle Login submission
  const handleLoginSuccess = (profile: UserProfile) => {
    offlineDb.saveUserProfile(profile);
    setCurrentUser(profile);
    setScreenState('welcome');
  };

  // Auto-show download modal immediately at app startup if not yet installed or dismissed
  useEffect(() => {
    if (!isLoading && !isInstalled && !isDismissed) {
      const timer = setTimeout(() => {
        setIsDownloadModalOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isInstalled, isDismissed]);

  const handleCloseDownloadModal = () => {
    setIsDownloadModalOpen(false);
    dismiss();
  };

  // Continue to catalog from Welcome Screen
  const handleContinueToCatalog = () => {
    setScreenState('app');
    if (!isInstalled && !isDismissed) {
      setIsDownloadModalOpen(true);
    }
  };

  // Handle Logout / Switch user
  const handleLogout = () => {
    offlineDb.clearUserProfile();
    setCurrentUser(null);
    setScreenState('login');
  };

  // Toggle favorite
  const handleToggleFavorite = async (productId: string) => {
    const isNowFav = await offlineDb.toggleFavorite(productId);
    setFavorites((prev) =>
      isNowFav ? [...prev, productId] : prev.filter((id) => id !== productId)
    );
  };

  // Add to quote list
  const handleAddToQuote = async (product: Product) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      let updated: QuoteItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...prev, { product, quantity: 1 }];
      }
      offlineDb.saveQuoteItems(updated);
      return updated;
    });
  };

  // Update quote quantity
  const handleUpdateQuoteQuantity = (productId: string, quantity: number) => {
    setQuoteItems((prev) => {
      let updated: QuoteItem[];
      if (quantity <= 0) {
        updated = prev.filter((item) => item.product.id !== productId);
      } else {
        updated = prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );
      }
      offlineDb.saveQuoteItems(updated);
      return updated;
    });
  };

  // Remove from quote
  const handleRemoveFromQuote = (productId: string) => {
    setQuoteItems((prev) => {
      const updated = prev.filter((item) => item.product.id !== productId);
      offlineDb.saveQuoteItems(updated);
      return updated;
    });
  };

  // Clear quote
  const handleClearQuote = () => {
    setQuoteItems([]);
    offlineDb.saveQuoteItems([]);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesTags = p.dietaryTags?.some((t) => t.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesCategory || matchesTags;
      }
      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  // Favorite products list
  const favoriteProducts = useMemo(() => {
    return products.filter((p) => favorites.includes(p.id));
  }, [products, favorites]);

  // Loading state
  if (screenState === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-[#EEEFE8] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-full border-4 border-[#E9ACBB] border-t-transparent animate-spin mb-4" />
        <h2 className="font-serif-brand text-xl font-bold text-[#2D2322]">
          Amor a primera mordida D'Yaliz
        </h2>
        <p className="text-xs text-[#5C4F4E] mt-1">Cargando base de datos local...</p>
      </div>
    );
  }

  // 1. First-time Login Screen
  if (screenState === 'login') {
    return (
      <AndroidDeviceFrame isAndroidView={isAndroidFrameView}>
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
        <AppDownloadModal
          isOpen={isDownloadModalOpen}
          onClose={handleCloseDownloadModal}
          isInstallable={isInstallable}
          isInstalled={isInstalled}
          isIOS={isIOS}
          onInstall={install}
        />
      </AndroidDeviceFrame>
    );
  }

  // 1. Welcome Screen (shown right after login)
  if (screenState === 'welcome' && currentUser) {
    return (
      <AndroidDeviceFrame isAndroidView={isAndroidFrameView}>
        <WelcomeScreen
          user={currentUser}
          onContinueToCatalog={handleContinueToCatalog}
        />
        <AppDownloadModal
          isOpen={isDownloadModalOpen}
          onClose={handleCloseDownloadModal}
          isInstallable={isInstallable}
          isInstalled={isInstalled}
          isIOS={isIOS}
          onInstall={install}
        />
      </AndroidDeviceFrame>
    );
  }

  // Main Application Shell
  return (
    <AndroidDeviceFrame isAndroidView={isAndroidFrameView}>
      <div className="min-h-screen bg-[#EEEFE8] text-[#2D2322] flex flex-col selection:bg-[#E9ACBB]/40">
        {/* Top App Bar */}
        <TopAppBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'quote') {
              setIsQuoteModalOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          isAndroidView={isAndroidFrameView}
          onToggleAndroidView={() => setIsAndroidFrameView((v) => !v)}
          favoritesCount={favorites.length}
          quoteItemsCount={quoteItems.reduce((acc, i) => acc + i.quantity, 0)}
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 pb-24">
          {activeTab === 'catalog' && (
            <div className="space-y-6">
              {/* Hero Banner Section with Official Store Sign */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FCEBBF]/80 via-[#EEEFE8] to-[#E9ACBB]/30 p-6 sm:p-10 border border-[#2D2322]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-[11px] font-semibold text-[#2D2322]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E9ACBB]" />
                    <span>Alfajores, Tortas & Bocaditos para Eventos</span>
                  </div>

                  <h1 className="font-serif-brand text-2xl sm:text-4xl font-bold text-[#2D2322] leading-tight text-balance">
                    {currentUser
                      ? `¡Hola ${currentUser.firstName}! Amor a primera mordida D'Yaliz`
                      : "Pastelería y Repostería: Amor a primera mordida D'Yaliz"}
                  </h1>

                  <p className="text-xs sm:text-sm text-[#5C4F4E] leading-relaxed">
                    Nuestras 3 colecciones exclusivas: Alfajores tradicionales, Tortas artesanales, y Bocaditos finos para Quinceañeras y eventos.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        window.open(
                          'https://wa.me/51943605482?text=Hola%20D\'yaliz,%20quisiera%20consultar%20sobre%20su%20catálogo%20de%20postres',
                          '_blank'
                        );
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#8FBC93] hover:bg-[#7ea882] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Cotizar por WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EEEFE8] text-[#2D2322] text-xs font-semibold border border-[#2D2322]/10 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E9ACBB]" />
                      <span>Armar Mesa de Evento ({quoteItems.length})</span>
                    </button>
                  </div>
                </div>

                {/* Official Store Sign Emblem */}
                <div className="shrink-0 flex items-center justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#E9ACBB] via-[#FCEBBF] to-[#8FBC93] opacity-70 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full p-1.5 bg-gradient-to-tr from-[#E9ACBB] via-[#FCEBBF] to-[#8FBC93] shadow-xl">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white/80 shadow-inner">
                        <img
                          src="/assets/aistudio/image_5d0b2247.png"
                          alt="Logo Oficial Amor a primera mordida D'Yaliz"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Bar & Offline Filter Controls */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#5C4F4E]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar postres (ej: torta de chocolate, cremolada, flan, tres leches)..."
                    className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-[#EEEFE8] focus:border-[#E9ACBB] text-xs sm:text-sm text-[#2D2322] placeholder:text-[#5C4F4E]/60 shadow-xs focus:outline-hidden transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5C4F4E] hover:text-[#2D2322]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category Segmented Tabs (Interactive Filter Controls) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-[#2D2322] text-white shadow-xs'
                        : 'bg-white text-[#5C4F4E] hover:bg-white/80 border border-[#EEEFE8]'
                    }`}
                  >
                    Todos ({products.length})
                  </button>

                  {CATEGORIES.map((cat) => {
                    const count = products.filter((p) => p.categoryId === cat.id).length;
                    const isSelected = selectedCategory === cat.id;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#E9ACBB] text-white shadow-xs font-semibold'
                            : 'bg-white text-[#5C4F4E] hover:bg-white/80 border border-[#EEEFE8]'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            isSelected ? 'bg-white/30 text-white' : 'bg-[#EEEFE8] text-[#5C4F4E]'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-white rounded-3xl p-8 border border-[#EEEFE8]">
                  <Cake className="w-12 h-12 text-[#E9ACBB] mx-auto opacity-70" />
                  <h3 className="font-serif-brand font-bold text-lg text-[#2D2322]">
                    No se encontraron postres con ese criterio
                  </h3>
                  <p className="text-xs text-[#5C4F4E] max-w-sm mx-auto">
                    Intenta cambiar los términos de búsqueda o selecciona otra categoría de nuestro menú dulce.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#EEEFE8] text-xs font-medium text-[#2D2322] hover:bg-[#E9ACBB]/20 transition-colors cursor-pointer"
                  >
                    Restablecer filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelect={(p) => setSelectedProduct(p)}
                      onAddToQuote={handleAddToQuote}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif-brand text-2xl font-bold text-[#2D2322]">
                    Mis Postres Favoritos
                  </h2>
                  <p className="text-xs text-[#5C4F4E] mt-0.5">
                    Guardados localmente en tu dispositivo ({favoriteProducts.length} seleccionados)
                  </p>
                </div>

                {favoriteProducts.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      favoriteProducts.forEach((p) => handleAddToQuote(p));
                      setIsQuoteModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#E9ACBB] hover:bg-[#d88c9d] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Cotizar todos por WhatsApp</span>
                  </button>
                )}
              </div>

              {favoriteProducts.length === 0 ? (
                <div className="py-20 text-center space-y-3 bg-white rounded-3xl p-8 border border-[#EEEFE8]">
                  <Heart className="w-12 h-12 text-[#E9ACBB] mx-auto opacity-40" />
                  <h3 className="font-serif-brand font-bold text-lg text-[#2D2322]">
                    No tienes postres favoritos todavía
                  </h3>
                  <p className="text-xs text-[#5C4F4E] max-w-sm mx-auto">
                    Toca el corazón en cualquier torta, alfajor o postre del catálogo para guardarlo en tu lista local.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('catalog')}
                    className="px-4 py-2 rounded-xl bg-[#8FBC93] text-white text-xs font-semibold hover:bg-[#7ea882] transition-colors cursor-pointer"
                  >
                    Explorar Catálogo
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {favoriteProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isFavorite={true}
                      onToggleFavorite={handleToggleFavorite}
                      onSelect={(p) => setSelectedProduct(p)}
                      onAddToQuote={handleAddToQuote}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && <ContactScreen currentUser={currentUser} />}
        </main>

        {/* Bottom Navigation Bar */}
        <BottomNavBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'quote') {
              setIsQuoteModalOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          favoritesCount={favorites.length}
          quoteItemsCount={quoteItems.reduce((acc, i) => acc + i.quantity, 0)}
        />

        {/* Modals */}
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
          onToggleFavorite={handleToggleFavorite}
          onAddToQuote={handleAddToQuote}
          isInQuote={selectedProduct ? quoteItems.some((i) => i.product.id === selectedProduct.id) : false}
        />

        <QuoteBuilderModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          items={quoteItems}
          onUpdateQuantity={handleUpdateQuoteQuantity}
          onRemoveItem={handleRemoveFromQuote}
          onClearQuote={handleClearQuote}
        />

        {/* Startup / On-demand App Download & Install Modal */}
        <AppDownloadModal
          isOpen={isDownloadModalOpen}
          onClose={handleCloseDownloadModal}
          isInstallable={isInstallable}
          isInstalled={isInstalled}
          isIOS={isIOS}
          onInstall={install}
        />
      </div>
    </AndroidDeviceFrame>
  );
}
