import React from 'react';
import { Heart, MessageCircle, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { DessertVectorIllustration } from './DessertVectorIllustration';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onSelect,
  onAddToQuote,
}) => {
  // Direct WhatsApp contact message
  const handleQuickWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const phone = '51943605482';
    const message = encodeURIComponent(
      `Hola D'yaliz, quisiera consultar sobre *${product.name}* (${product.category}) de su catálogo de postres.`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-3xl overflow-hidden border border-[#EEEFE8] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between android-ripple"
      style={{
        boxShadow: '0 2px 10px rgba(45, 35, 34, 0.04)',
      }}
    >
      {/* Media Container - 100% Offline Vector Artwork with Coil-style fallback */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <DessertVectorIllustration product={product} />

        {/* Favorite Button */}
        <button
          type="button"
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-all text-[#2D2322] z-20"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-[#E9ACBB] text-[#E9ACBB]' : 'text-[#5C4F4E]'
            }`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Dietary / Feature tags unboxed text */}
          {product.dietaryTags && product.dietaryTags.length > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] text-[#8FBC93] font-medium mb-1.5 flex-wrap">
              {product.dietaryTags.map((tag, idx) => (
                <React.Fragment key={tag}>
                  <span>{tag}</span>
                  {idx < product.dietaryTags!.length - 1 && <span className="text-[#5C4F4E]/40">·</span>}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Dessert Name */}
          <h3 className="font-serif-brand font-bold text-lg text-[#2D2322] leading-snug group-hover:text-[#E9ACBB] transition-colors">
            {product.name}
          </h3>

          {/* Brief Description strictly directly below name */}
          <p className="text-xs font-normal text-[#5C4F4E] mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Action Controls - Strictly NO prices shown */}
        <div className="pt-4 mt-3 border-t border-[#EEEFE8] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleQuickWhatsApp}
            title="Consultar por WhatsApp (+51 943 605 482)"
            className="flex-1 py-2 px-3 rounded-xl bg-[#8FBC93]/15 hover:bg-[#8FBC93]/25 text-[#2D2322] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#8FBC93]" />
            <span className="whitespace-nowrap">WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToQuote(product);
            }}
            title="Añadir a cotización de evento"
            className="py-2 px-3 rounded-xl bg-[#FCEBBF]/60 hover:bg-[#FCEBBF] text-[#2D2322] text-xs font-medium transition-colors whitespace-nowrap"
          >
            + Cotizar
          </button>

          <button
            type="button"
            onClick={() => onSelect(product)}
            className="w-8 h-8 rounded-xl bg-[#EEEFE8] hover:bg-[#E9ACBB]/20 flex items-center justify-center text-[#2D2322] transition-colors"
            title="Ver detalles del postre"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
