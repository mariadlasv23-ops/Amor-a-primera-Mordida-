import React, { useState } from 'react';
import { MessageCircle, Globe, Clock, MapPin, Sparkles, Send, Copy, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface ContactScreenProps {
  currentUser?: UserProfile | null;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ currentUser }) => {
  const [customMessage, setCustomMessage] = useState('');
  const [eventType, setEventType] = useState('Quinceañera');
  const [copiedPhone, setCopiedPhone] = useState(false);

  const phoneNumber = '+51 943 605 482';
  const cleanPhone = '51943605482';

  const handleOpenWhatsApp = () => {
    const greeting = currentUser ? `Hola D'yaliz, soy *${currentUser.firstName} ${currentUser.lastName}*` : "Hola D'yaliz";
    const text = customMessage.trim()
      ? encodeURIComponent(`${greeting}, quisiera consultar sobre un evento tipo *${eventType}*: ${customMessage}`)
      : encodeURIComponent(`${greeting}, me comunico desde la app para consultar sobre su catálogo de postres, cremoladas y tortas para mi evento.`);
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in duration-300">
      {/* Brand Header with Official Store Emblem */}
      <div className="text-center pt-2 pb-4 flex flex-col items-center">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#E9ACBB] via-[#FCEBBF] to-[#8FBC93] shadow-lg mb-3">
          <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white shadow-inner">
            <img
              src="/assets/aistudio/image_5d0b2247.png"
              alt="Logo Oficial Amor a primera mordida D'Yaliz"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-[#E9ACBB]">
          Atención Personalizada
        </span>
        <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#2D2322] mt-1">
          Contacto & Pedidos Especiales
        </h1>
        <p className="text-sm text-[#5C4F4E] max-w-lg mx-auto mt-2">
          pastelería y repostería: amor a primera mordida D'yaliz
        </p>
      </div>

      {/* Main Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WhatsApp Field (Clickable to open WhatsApp) */}
        <div className="bg-white rounded-3xl p-6 border border-[#EEEFE8] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start justify-between gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#8FBC93]/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-[#8FBC93]" />
            </div>
            <button
              type="button"
              onClick={handleCopyPhone}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#EEEFE8] text-[#5C4F4E] hover:text-[#2D2322] flex items-center gap-1.5 transition-colors"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#8FBC93]" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5C4F4E]">
              WhatsApp Directo (Oficial)
            </span>
            <div className="text-xl sm:text-2xl font-bold text-[#2D2322] mt-1 tracking-tight">
              {phoneNumber}
            </div>
            <p className="text-xs text-[#5C4F4E] mt-1">
              Haz clic para iniciar chat instantáneo y cotizar tu pedido de postres o tortas personalizadas.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full mt-5 py-3 px-4 rounded-2xl bg-[#8FBC93] hover:bg-[#7ea882] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Abrir WhatsApp Ahora</span>
          </button>
        </div>

        {/* Facebook Page Field (Muy pronto) */}
        <div className="bg-white rounded-3xl p-6 border border-[#EEEFE8] shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#1877F2]/15 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-[#1877F2] fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>

          <div className="mt-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5C4F4E]">
              Página de Facebook
            </span>
            <div className="mt-2 p-3.5 rounded-2xl bg-[#EEEFE8]/70 border border-dashed border-[#1877F2]/40 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#2D2322]">
                Página de Facebook
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#E9ACBB]/20 text-[#2D2322] border border-[#E9ACBB]/40">
                Muy pronto
              </span>
            </div>
            <p className="text-xs text-[#5C4F4E] mt-3">
              Estamos preparando nuestra página oficial de Facebook con promociones, fotos de eventos y novedades dulces.
            </p>
          </div>
        </div>
      </div>

      {/* Quick WhatsApp Inquiry Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EEEFE8] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#E9ACBB]" />
          <h3 className="font-serif-brand font-bold text-lg text-[#2D2322]">
            Envía tu consulta o cotización a WhatsApp
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F4E] mb-2">
              Tipo de Celebración o Compromiso
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'Quinceañera',
                'Boda / Matrimonio',
                'Cumpleaños',
                'Bautizo / Comunión',
                'Mesa de Bocaditos Dulces',
                'Antojo / Reunión Familiar',
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEventType(type)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    eventType === type
                      ? 'bg-[#E9ACBB] text-white'
                      : 'bg-[#EEEFE8] text-[#2D2322] hover:bg-[#FCEBBF]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F4E] mb-2">
              Mensaje o Detalles (Opcional)
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Ejemplo: Hola, quisiera una torta de tres leches para 20 personas y 50 mini shots para una quinceañera este sábado..."
              rows={3}
              className="w-full p-4 rounded-2xl bg-[#EEEFE8]/60 border border-[#EEEFE8] focus:border-[#E9ACBB] focus:bg-white text-sm text-[#2D2322] placeholder:text-[#5C4F4E]/50 focus:outline-hidden transition-all resize-none"
            />
          </div>

          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-[#8FBC93] hover:bg-[#7ea882] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Enviar Consulta a WhatsApp (+51 943 605 482)</span>
          </button>
        </div>
      </div>

      {/* Horarios & Políticas de Pedidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-[#FCEBBF]/40 border border-[#FCEBBF] flex items-start gap-3">
          <Clock className="w-5 h-5 text-[#2D2322] shrink-0 mt-0.5" />
          <div className="text-xs text-[#2D2322]">
            <h4 className="font-bold text-sm text-[#2D2322]">Tiempos de Anticipación</h4>
            <ul className="mt-2 space-y-1 text-[#5C4F4E]">
              <li>• <strong>Tortas completas y postres:</strong> 24 a 48 horas de anticipación.</li>
              <li>• <strong>Mesa de dulces para Quinceañeras:</strong> 7 a 15 días previos.</li>
              <li>• <strong>Bocaditos finos por ciento:</strong> 3 días de anticipación.</li>
            </ul>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#EEEFE8] border border-[#C9B297]/30 flex items-start gap-3">
          <MapPin className="w-5 h-5 text-[#C9B297] shrink-0 mt-0.5" />
          <div className="text-xs text-[#2D2322]">
            <h4 className="font-bold text-sm text-[#2D2322]">Entregas & Cobertura</h4>
            <p className="mt-2 text-[#5C4F4E] leading-relaxed">
              Atención en Lima, Perú. Servicio de entrega cuidadoso y climatizado para tortas de varios pisos y fuentes de bocaditos para que lleguen impecables a tu evento.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
