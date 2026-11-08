import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Send, Sparkles, Cake } from 'lucide-react';
import { QuoteItem } from '../types';

interface QuoteBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearQuote: () => void;
}

export const QuoteBuilderModal: React.FC<QuoteBuilderModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearQuote,
}) => {
  const [eventType, setEventType] = useState('Quinceañera');
  const [guestCount, setGuestCount] = useState('50');
  const [eventDate, setEventDate] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  if (!isOpen) return null;

  const handleSendToWhatsApp = () => {
    const phone = '51983344508';

    if (items.length === 0) return;

    let text = `¡Hola D'yaliz! 🌸\nQuisiera solicitar una cotización para un evento:\n\n`;
    text += `🎉 *Tipo de Evento:* ${eventType}\n`;
    if (guestCount) text += `👥 *Invitados Aprox:* ${guestCount} personas\n`;
    if (eventDate) text += `📅 *Fecha Estimada:* ${eventDate}\n`;
    text += `\n🍰 *Postres Seleccionados del Catálogo:*\n`;

    items.forEach((item, index) => {
      text += `${index + 1}. *${item.product.name}* (Cant: ${item.quantity})\n   Categoría: ${item.product.category}\n`;
    });

    if (additionalNotes.trim()) {
      text += `\n📝 *Notas adicionales:* ${additionalNotes.trim()}\n`;
    }

    text += `\nQuedo a la espera de su respuesta. ¡Muchas gracias!`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl z-10 flex flex-col max-h-[90vh] border border-[#EEEFE8] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#EEEFE8] flex items-center justify-between bg-[#FCEBBF]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E9ACBB] bg-white shadow-xs shrink-0">
              <img
                src="/assets/aistudio/image_5d0b2247.png"
                alt="Logo D'Yaliz"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif-brand font-bold text-lg text-[#2D2322]">
                Lista de Cotización para Eventos
              </h3>
              <p className="text-xs text-[#5C4F4E]">
                Arma tu selección dulce y envíala directamente a WhatsApp (+51 983 344 508)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5C4F4E] hover:text-[#2D2322] shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable List */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {items.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-[#EEEFE8] flex items-center justify-center mx-auto text-[#E9ACBB]">
                <Cake className="w-8 h-8" />
              </div>
              <h4 className="font-serif-brand font-bold text-base text-[#2D2322]">
                Aún no has agregado postres a tu lista
              </h4>
              <p className="text-xs text-[#5C4F4E] max-w-xs mx-auto">
                Explora el catálogo de tortas, alfajores, pies y bocaditos para eventos y pulsa <strong>"+ Cotizar"</strong>.
              </p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5C4F4E]">
                  <span>Postres seleccionados ({items.length})</span>
                  <button
                    type="button"
                    onClick={onClearQuote}
                    className="text-[#E9ACBB] hover:underline"
                  >
                    Vaciar lista
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-2xl bg-[#EEEFE8]/60 border border-[#EEEFE8] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover shrink-0 bg-white"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="min-w-0">
                        <h5 className="font-semibold text-xs text-[#2D2322] truncate">
                          {item.product.name}
                        </h5>
                        <p className="text-[11px] text-[#5C4F4E] truncate">
                          {item.product.category}
                        </p>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center bg-white rounded-xl border border-[#EEEFE8] p-1 shadow-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#5C4F4E] hover:text-[#2D2322]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#2D2322]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#5C4F4E] hover:text-[#2D2322]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="w-7 h-7 rounded-xl hover:bg-red-50 text-red-400 flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Event Details Form */}
              <div className="p-4 rounded-2xl bg-[#FCEBBF]/20 border border-[#FCEBBF]/50 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2D2322]">
                  Datos de tu Evento (Para un presupuesto exacto)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#5C4F4E] mb-1">
                      Ocasión
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-[#EEEFE8] text-xs text-[#2D2322] focus:outline-hidden"
                    >
                      <option value="Quinceañera">Quinceañera (15 Años)</option>
                      <option value="Boda / Compromiso">Boda / Compromiso</option>
                      <option value="Cumpleaños Infantil">Cumpleaños Infantil</option>
                      <option value="Cumpleaños Adulto">Cumpleaños Adulto</option>
                      <option value="Bautizo / Primera Comunión">Bautizo / Primera Comunión</option>
                      <option value="Reunión Privada / Antojo">Reunión Privada / Antojo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#5C4F4E] mb-1">
                      Nº de Invitados Aprox.
                    </label>
                    <input
                      type="text"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      placeholder="Ej: 30, 50, 100"
                      className="w-full p-2.5 rounded-xl bg-white border border-[#EEEFE8] text-xs text-[#2D2322] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#5C4F4E] mb-1">
                    Fecha deseada del evento
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#EEEFE8] text-xs text-[#2D2322] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#5C4F4E] mb-1">
                    Indicaciones especiales o temática
                  </label>
                  <input
                    type="text"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Ej: Colores temáticos rosa y lila, sin gluten, etc."
                    className="w-full p-2.5 rounded-xl bg-white border border-[#EEEFE8] text-xs text-[#2D2322] focus:outline-hidden"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[#EEEFE8] bg-white">
            <button
              type="button"
              onClick={handleSendToWhatsApp}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#8FBC93] hover:bg-[#7ea882] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Enviar Lista a WhatsApp (+51 983 344 508)</span>
              <Send className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
