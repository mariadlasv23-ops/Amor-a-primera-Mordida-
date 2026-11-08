import React, { useState } from 'react';
import {
  X,
  Download,
  Smartphone,
  Apple,
  CheckCircle2,
  Sparkles,
  Share,
  MoreVertical,
  PlusSquare,
} from 'lucide-react';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  onInstall: () => Promise<boolean>;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  isInstalled,
  isIOS,
  onInstall,
}) => {
  const [activeGuideTab, setActiveGuideTab] = useState<'quick' | 'android' | 'ios'>(
    isIOS ? 'ios' : 'quick'
  );
  const [installSuccess, setInstallSuccess] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    setIsInstalling(true);
    if (isInstallable) {
      const success = await onInstall();
      if (success) {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } else if (isIOS) {
      setActiveGuideTab('ios');
    } else {
      setActiveGuideTab('android');
    }
    setIsInstalling(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Background click to dismiss via X logic */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col border border-[#EEEFE8] animate-in zoom-in-95 duration-200">
        {/* Top Decorative Color Accent */}
        <div className="h-2.5 w-full bg-gradient-to-r from-[#E9ACBB] via-[#FCEBBF] to-[#8FBC93]" />

        {/* Top Header with Close 'X' Button */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9ACBB]/15 text-[#2D2322] text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#E9ACBB]" />
            <span>App Oficial D'Yaliz</span>
          </div>

          {/* Close 'X' button (requested explicitly) */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar y omitir descarga"
            title="Cerrar (Omitir descarga)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEEFE8] hover:bg-red-50 text-[#5C4F4E] hover:text-red-600 transition-all cursor-pointer active:scale-95 shadow-xs font-bold text-xs"
          >
            <span>Omitir</span>
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 pt-2 overflow-y-auto space-y-5 text-center flex-1">
          {/* Brand Emblem */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto my-2">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#E9ACBB] via-[#FCEBBF] to-[#8FBC93] blur-sm opacity-80 animate-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden p-1 bg-white border-2 border-white shadow-xl">
              <img
                src="/assets/aistudio/image_5d0b2247.png"
                alt="Logo D'Yaliz"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div>
            <h2 className="font-serif-brand text-2xl font-bold text-[#2D2322] leading-tight">
              {isInstalled ? "¡App ya instalada en tu dispositivo!" : "¡Descarga la App de D'Yaliz!"}
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4F4E] mt-2 leading-relaxed">
              Instala nuestra app oficial para consultar todo el catálogo de alfajores, tortas y bocaditos de forma rápida y directa en tu pantalla de inicio.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-2 text-left text-[11px]">
            <div className="p-2.5 rounded-2xl bg-[#8FBC93]/15 border border-[#8FBC93]/30 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8FBC93] shrink-0" />
              <span className="text-[#2D2322] font-medium leading-tight">Catálogo rápido y actualizado</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#FCEBBF]/40 border border-[#FCEBBF] flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#E9ACBB] shrink-0" />
              <span className="text-[#2D2322] font-medium leading-tight">Acceso directo en tu celular</span>
            </div>
          </div>

          {/* Guide Selector Tabs */}
          <div className="flex rounded-xl bg-[#EEEFE8] p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveGuideTab('quick')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                activeGuideTab === 'quick' ? 'bg-white text-[#2D2322] shadow-xs' : 'text-[#5C4F4E]'
              }`}
            >
              Rápida
            </button>
            <button
              type="button"
              onClick={() => setActiveGuideTab('android')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                activeGuideTab === 'android' ? 'bg-white text-[#2D2322] shadow-xs' : 'text-[#5C4F4E]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#8FBC93]" />
              <span>Android</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveGuideTab('ios')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                activeGuideTab === 'ios' ? 'bg-white text-[#2D2322] shadow-xs' : 'text-[#5C4F4E]'
              }`}
            >
              <Apple className="w-3.5 h-3.5 text-[#2D2322]" />
              <span>iPhone</span>
            </button>
          </div>

          {/* Tab 1: Quick / Direct Install */}
          {activeGuideTab === 'quick' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              {installSuccess ? (
                <div className="p-4 rounded-2xl bg-[#8FBC93]/20 border border-[#8FBC93] text-center space-y-1">
                  <CheckCircle2 className="w-8 h-8 text-[#8FBC93] mx-auto" />
                  <p className="text-xs font-bold text-[#2D2322]">¡Instalación completada con éxito!</p>
                  <p className="text-[11px] text-[#5C4F4E]">Ya tienes D'Yaliz en tu pantalla de inicio.</p>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    disabled={isInstalling}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#8FBC93] hover:bg-[#7ea882] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>
                      {isInstallable
                        ? 'Descargar / Instalar App Ahora'
                        : isIOS
                        ? 'Ver Cómo Instalar en iPhone'
                        : 'Descargar / Instalar en mi Celular'}
                    </span>
                  </button>

                  <p className="text-[11px] text-[#5C4F4E]">
                    {isInstallable
                      ? 'Instalación instantánea con un clic mediante tu navegador.'
                      : 'Puedes agregar el ícono a tu pantalla principal en segundos.'}
                  </p>
                </>
              )}
            </div>
          )}

          {/* Tab 2: Android Step-by-Step Guide */}
          {activeGuideTab === 'android' && (
            <div className="p-4 rounded-2xl bg-[#EEEFE8]/70 border border-[#EEEFE8] text-left space-y-2.5 text-xs text-[#2D2322] animate-in fade-in duration-150">
              <h4 className="font-bold flex items-center gap-1.5 text-[#2D2322]">
                <Smartphone className="w-4 h-4 text-[#8FBC93]" />
                <span>Paso a paso en Android (Chrome):</span>
              </h4>
              <ol className="space-y-2 text-[11px] text-[#5C4F4E]">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#8FBC93] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <span>
                    Toca el menú de <strong>tres puntos (⋮)</strong> en la esquina superior derecha del navegador.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#8FBC93] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <span>
                    Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Agregar a la pantalla principal"</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#8FBC93] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <span>
                    Confirma en <strong>"Instalar"</strong>. ¡El ícono oficial aparecerá junto a tus otras apps!
                  </span>
                </li>
              </ol>

              {isInstallable && (
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-[#8FBC93] hover:bg-[#7ea882] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Probar Instalación Directa</span>
                </button>
              )}
            </div>
          )}

          {/* Tab 3: iOS Safari Step-by-Step Guide */}
          {activeGuideTab === 'ios' && (
            <div className="p-4 rounded-2xl bg-[#EEEFE8]/70 border border-[#EEEFE8] text-left space-y-2.5 text-xs text-[#2D2322] animate-in fade-in duration-150">
              <h4 className="font-bold flex items-center gap-1.5 text-[#2D2322]">
                <Apple className="w-4 h-4 text-[#2D2322]" />
                <span>Paso a paso en iPhone / iPad (Safari):</span>
              </h4>
              <ol className="space-y-2 text-[11px] text-[#5C4F4E]">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E9ACBB] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <span className="flex items-center gap-1 flex-wrap">
                    En Safari, pulsa el botón <strong>Compartir</strong>
                    <Share className="w-3.5 h-3.5 inline text-[#2D2322]" />
                    (en la barra inferior).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E9ACBB] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <span className="flex items-center gap-1 flex-wrap">
                    Desliza hacia abajo y toca <strong>"Agregar a inicio"</strong>
                    <PlusSquare className="w-3.5 h-3.5 inline text-[#2D2322]" />.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E9ACBB] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <span>
                    Pulsa <strong>"Agregar"</strong> en la esquina superior derecha. ¡Listo!
                  </span>
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Modal Footer: Action to Skip / Continue to Web */}
        <div className="p-4 pt-2 border-t border-[#EEEFE8] bg-[#EEEFE8]/30 flex flex-col sm:flex-row items-center justify-between gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#5C4F4E] hover:text-[#2D2322] hover:bg-[#EEEFE8] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Entrar a la app sin descargar (Omitir)</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
