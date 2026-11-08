import React from 'react';
import { Cake, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  favoritesCount: number;
  quoteItemsCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  favoritesCount,
  quoteItemsCount,
}) => {
  const tabs = [
    {
      id: 'catalog' as ActiveTab,
      label: 'Postres',
      icon: Cake,
      badge: 0,
    },
    {
      id: 'favorites' as ActiveTab,
      label: 'Favoritos',
      icon: Heart,
      badge: favoritesCount,
    },
    {
      id: 'quote' as ActiveTab,
      label: 'Cotizador',
      icon: Sparkles,
      badge: quoteItemsCount,
    },
    {
      id: 'contact' as ActiveTab,
      label: 'Contacto',
      icon: MessageCircle,
      badge: 0,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EEEFE8] px-2 py-1 shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-4 items-center h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center relative rounded-xl transition-all active:scale-95 text-center cursor-pointer"
            >
              {/* Material 3 Active Pill Indicator */}
              <div
                className={`relative px-3.5 py-1 rounded-full transition-all flex items-center justify-center ${
                  isActive ? 'bg-[#E9ACBB]/25 text-[#2D2322]' : 'text-[#5C4F4E]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-[#2D2322]' : 'text-[#5C4F4E]'
                  } ${tab.id === 'favorites' && isActive ? 'fill-[#E9ACBB] text-[#E9ACBB]' : ''}`}
                />

                {/* Badge */}
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#E9ACBB] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] font-medium tracking-tight mt-0.5 truncate max-w-full ${
                  isActive ? 'font-bold text-[#2D2322]' : 'text-[#5C4F4E]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
