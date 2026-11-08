import React, { useState } from 'react';
import { X, Heart, MessageCircle, Plus, Check, Cake, Sparkles, Clock } from 'lucide-react';
import { Product } from '../types';
import { DessertVectorIllustration } from './DessertVectorIllustration';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToQuote: (product: Product) => void;
  isInQuote: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToQuote,
  isInQuote,
}) => {
  const [imageError, setImageError] = useState(false);

  if (!isOpen || !product) return null;

  const handleWhatsAppInquiry = () => {
    const phone = '51943605482';
    const message = encodeURIComponent(
      `¡Hola D'yaliz! Me encantó *${product.name}* (${product.category}) de su catálogo.\nQuisiera consultar disponibilidad para mi celebración o evento.`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Background click dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col border border-[#EEEFE8]">
        {/* Header / Media - 100% Offline Vector Artwork with Coil-style fallback */}
        <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0">
          <DessertVectorIllustration product={product} />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:bg-white text-[#2D2322] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={() => onToggleFavorite(product.id)}
            aria-label="Favorito"
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-[#E9ACBB] text-[#E9ACBB]' : 'text-[#5C4F4E]'
              }`}
            />
          </button>

          {/* Bottom scrim with category */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
            <span className="inline-block px-3 py-1 bg-white/95 rounded-full text-xs font-semibold text-[#2D2322] shadow-xs">
              {product.category}
            </span>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <h2 className="font-serif-brand text-2xl font-bold text-[#2D2322] leading-tight">
              {product.name}
            </h2>
            {product.dietaryTags && product.dietaryTags.length > 0 && (
              <div className="flex items-center gap-2 mt-2 text-xs font-medium text-[#8FBC93]">
                {product.dietaryTags.map((tag, idx) => (
                  <span key={tag}>
                    {tag}
                    {idx < product.dietaryTags!.length - 1 && <span className="text-[#5C4F4E]/30 ml-2">·</span>}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5C4F4E]">
              Descripción Artesanal
            </h4>
            <p className="text-sm text-[#2D2322]/90 leading-relaxed">
              {product.longDescription || product.description}
            </p>
          </div>

          {/* Portion and recommendations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {product.portionNote && (
              <div className="p-3.5 rounded-2xl bg-[#EEEFE8] border border-[#E9ACBB]/20">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2D2322]">
                  <Clock className="w-4 h-4 text-[#C9B297]" />
                  <span>Porciones / Presentación</span>
                </div>
                <p className="text-xs text-[#5C4F4E] mt-1">{product.portionNote}</p>
              </div>
            )}

            {product.recommendedFor && (
              <div className="p-3.5 rounded-2xl bg-[#FCEBBF]/40 border border-[#FCEBBF]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2D2322]">
                  <Sparkles className="w-4 h-4 text-[#E9ACBB]" />
                  <span>Ideal Para</span>
                </div>
                <p className="text-xs text-[#5C4F4E] mt-1">{product.recommendedFor}</p>
              </div>
            )}
          </div>

          {/* Order Notice (strictly NO prices) */}
          <div className="p-3.5 rounded-2xl bg-[#8FBC93]/15 text-xs text-[#2D2322] border border-[#8FBC93]/30">
            <p className="font-medium text-[#2D2322]">
              🍰 Elaboración 100% fresca bajo pedido
            </p>
            <p className="text-[#5C4F4E] mt-0.5">
              Preparado artesanalmente para tu fecha especial. Los presupuestos se personalizan según el número de invitados y requerimientos.
            </p>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 border-t border-[#EEEFE8] bg-white flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleWhatsAppInquiry}
            className="flex-1 py-3 px-4 rounded-2xl bg-[#8FBC93] hover:bg-[#7ea882] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => onAddToQuote(product)}
            className={`py-3 px-4 rounded-2xl font-medium text-sm flex items-center gap-2 transition-all ${
              isInQuote
                ? 'bg-[#E9ACBB] text-white'
                : 'bg-[#EEEFE8] text-[#2D2322] hover:bg-[#E9ACBB]/20'
            }`}
          >
            {isInQuote ? (
              <>
                <Check className="w-4 h-4" />
                <span>En Cotización</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>+ Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
