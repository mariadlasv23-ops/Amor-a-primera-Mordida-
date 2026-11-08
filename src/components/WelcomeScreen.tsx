import React from 'react';
import { ArrowRight, Cake, Sparkles, WifiOff, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface WelcomeScreenProps {
  user: UserProfile;
  onContinueToCatalog: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  user,
  onContinueToCatalog,
}) => {
  return (
    <div className="min-h-screen bg-[#EEEFE8] flex flex-col justify-center items-center p-4 sm:p-6 py-10 selection:bg-[#E9ACBB]/40">
      <div className="w-full max-w-lg bg-white rounded-[36px] p-6 sm:p-10 shadow-2xl border border-[#EEEFE8] text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-400">
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-r from-[#E9ACBB] via-[#FCEBBF] to-[#8FBC93]" />

        {/* Official Store Logo with ambient backlight glow */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-6">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#E9ACBB] via-[#FCEBBF] to-[#8FBC93] blur-md opacity-70 animate-pulse" />
          <div className="relative w-full h-full rounded-full overflow-hidden p-1.5 bg-white border-4 border-white shadow-xl">
            <img
              src="/assets/aistudio/image_5d0b2247.png"
              alt="Logo D'Yaliz"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Welcome Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E9ACBB]/20 text-[#2D2322] text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#E9ACBB]" />
          <span>Amor a primera mordida D'Yaliz</span>
        </div>

        {/* Personalized Welcome Heading strictly following user instructions */}
        <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#2D2322] leading-tight">
          ¡Bienvenido, {user.firstName}!
        </h1>

        {/* Exact message mandated by user */}
        <p className="text-sm sm:text-base text-[#5C4F4E] mt-4 leading-relaxed max-w-md mx-auto">
          Esta app está diseñada para que puedas ver nuestro delicioso menú de postres, cremoladas y tortas de forma rápida y sin necesidad de internet.
        </p>

        {/* User Summary Pill */}
        <div className="my-6 p-4 rounded-2xl bg-[#EEEFE8]/70 border border-[#EEEFE8] flex items-center justify-around text-xs text-[#2D2322]">
          <div>
            <span className="text-[10px] text-[#5C4F4E] block uppercase font-medium">Cliente</span>
            <span className="font-bold">{user.firstName} {user.lastName}</span>
          </div>
          <div className="h-6 w-px bg-[#2D2322]/15" />
          <div>
            <span className="text-[10px] text-[#5C4F4E] block uppercase font-medium">Teléfono</span>
            <span className="font-bold">{user.phone}</span>
          </div>
          <div className="h-6 w-px bg-[#2D2322]/15" />
          <div>
            <span className="text-[10px] text-[#5C4F4E] block uppercase font-medium">Edad</span>
            <span className="font-bold">{user.age} años</span>
          </div>
        </div>

        {/* Features highlight */}
        <div className="grid grid-cols-2 gap-3 mb-8 text-left text-xs">
          <div className="p-3 rounded-2xl bg-[#8FBC93]/15 border border-[#8FBC93]/30 flex items-center gap-2.5">
            <WifiOff className="w-4 h-4 text-[#8FBC93] shrink-0" />
            <span className="text-[#2D2322] font-medium">100% Offline (Room DB)</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#FCEBBF]/40 border border-[#FCEBBF] flex items-center gap-2.5">
            <Cake className="w-4 h-4 text-[#E9ACBB] shrink-0" />
            <span className="text-[#2D2322] font-medium">Tortas, Cremoladas y Pies</span>
          </div>
        </div>

        {/* Primary Navigation Button to Catalog */}
        <button
          type="button"
          onClick={onContinueToCatalog}
          className="w-full py-4 px-6 rounded-2xl bg-[#8FBC93] hover:bg-[#7ea882] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer"
        >
          <span>Ir al Catálogo Principal</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-[11px] text-[#5C4F4E] mt-3 flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#8FBC93]" />
          <span>Tus datos han sido guardados localmente</span>
        </p>
      </div>
    </div>
  );
};
