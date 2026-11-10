import React, { useState } from 'react';
import { Smartphone, Monitor, MessageCircle, LogOut, Download } from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';

interface TopAppBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isAndroidView: boolean;
  onToggleAndroidView: () => void;
  favoritesCount: number;
  quoteItemsCount: number;
  currentUser?: UserProfile | null;
  onLogout?: () => void;
  onOpenDownloadModal?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  activeTab,
  onTabChange,
  isAndroidView,
  onToggleAndroidView,
  favoritesCount,
  quoteItemsCount,
  currentUser,
  onLogout,
  onOpenDownloadModal,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#EEEFE8]/90 backdrop-blur-md border-b border-[#2D2322]/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark & Official Graphic Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onTabChange('catalog')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#E9ACBB] shadow-sm group-hover:scale-105 transition-transform bg-white shrink-0 ring-2 ring-[#FCEBBF]/60">
              <img
                src="/assets/aistudio/image_5d0b2247.png"
                alt="Logo Pastelería D'Yaliz - Amor a primera mordida"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-serif-brand font-bold text-lg sm:text-xl text-[#2D2322] whitespace-nowrap tracking-tight group-hover:text-[#E9ACBB] transition-colors block">
                Pastelería D'Yaliz
              </span>
              <span className="hidden sm:block text-[11px] text-[#5C4F4E] -mt-1 font-medium">
                Amor a primera mordida
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-[#5C4F4E]">
          <button
            type="button"
            onClick={() => onTabChange('catalog')}
            className={`hover:text-[#2D2322] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'catalog' ? 'text-[#2D2322] font-semibold border-b-2 border-[#E9ACBB]' : ''
            }`}
          >
            Catálogo
          </button>

          <button
            type="button"
            onClick={() => onTabChange('favorites')}
            className={`hover:text-[#2D2322] transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
              activeTab === 'favorites' ? 'text-[#2D2322] font-semibold border-b-2 border-[#E9ACBB]' : ''
            }`}
          >
            <span>Favoritos</span>
            {favoritesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#E9ACBB] text-white text-[10px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onTabChange('quote')}
            className={`hover:text-[#2D2322] transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
              activeTab === 'quote' ? 'text-[#2D2322] font-semibold border-b-2 border-[#E9ACBB]' : ''
            }`}
          >
            <span>Cotizador</span>
            {quoteItemsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#8FBC93] text-white text-[10px] font-bold flex items-center justify-center">
                {quoteItemsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onTabChange('contact')}
            className={`hover:text-[#2D2322] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'contact' ? 'text-[#2D2322] font-semibold border-b-2 border-[#E9ACBB]' : ''
            }`}
          >
            Contacto
          </button>
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* User Profile Pill / Menu */}
          {currentUser && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/90 hover:bg-white text-xs font-medium text-[#2D2322] border border-[#2D2322]/10 transition-colors shadow-xs"
                title={`Usuario: ${currentUser.firstName} ${currentUser.lastName}`}
              >
                <div className="w-5 h-5 rounded-full bg-[#E9ACBB]/30 flex items-center justify-center text-[#2D2322] font-bold text-[10px]">
                  {currentUser.firstName.charAt(0)}
                </div>
                <span className="hidden sm:inline font-semibold">{currentUser.firstName}</span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#EEEFE8] p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="pb-2 border-b border-[#EEEFE8]">
                    <p className="text-xs font-bold text-[#2D2322]">
                      {currentUser.firstName} {currentUser.lastName}
                    </p>
                    <p className="text-[11px] text-[#5C4F4E]">{currentUser.phone}</p>
                    <p className="text-[10px] text-[#8FBC93] font-medium mt-0.5">
                      {currentUser.age} años · Sesión Activa
                    </p>
                  </div>

                  {onLogout && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full mt-2 py-2 px-2.5 rounded-xl hover:bg-red-50 text-red-500 text-xs font-medium flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Cerrar sesión / Cambiar</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}


          {/* Download App Modal Trigger */}
          {onOpenDownloadModal && (
            <button
              type="button"
              onClick={onOpenDownloadModal}
              title="Descargar o instalar app en tu celular"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#E9ACBB]/20 hover:bg-[#E9ACBB]/30 border border-[#E9ACBB]/40 text-xs text-[#2D2322] font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#E9ACBB]" />
              <span className="hidden sm:inline">Instalar app</span>
            </button>
          )}

          {/* Android Pixel 8 Device Frame Toggle */}
          <button
            type="button"
            onClick={onToggleAndroidView}
            title={isAndroidView ? 'Cambiar a vista de escritorio fluida' : 'Simular en dispositivo Android'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/80 hover:bg-white border border-[#2D2322]/10 text-xs text-[#2D2322] font-medium transition-colors"
          >
            {isAndroidView ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#5C4F4E]" />
                <span className="hidden sm:inline">Vista Completa</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#8FBC93]" />
                <span className="hidden sm:inline">Marco Android</span>
              </>
            )}
          </button>

          {/* Primary Action: Direct WhatsApp */}
          <button
            type="button"
            onClick={() => {
              window.open(
                'https://wa.me/51943605482?text=Hola%20D\'yaliz,%20quisiera%20consultar%20sobre%20su%20catálogo%20de%20postres',
                '_blank'
              );
            }}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#8FBC93] hover:bg-[#7ea882] rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
        </div>
      </div>
    </header>
  );
};
