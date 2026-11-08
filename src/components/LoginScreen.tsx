import React, { useState } from 'react';
import { User, Phone, Calendar, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (profile: UserProfile) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName.trim()) newErrors.firstName = 'Ingresa tu nombre';
    if (!lastName.trim()) newErrors.lastName = 'Ingresa tu apellido';
    if (!phone.trim()) {
      newErrors.phone = 'Ingresa tu número de teléfono';
    } else if (phone.trim().length < 8) {
      newErrors.phone = 'Ingresa un número telefónico válido (mínimo 8 dígitos)';
    }
    if (!age.trim()) {
      newErrors.age = 'Ingresa tu edad';
    } else {
      const numAge = parseInt(age, 10);
      if (isNaN(numAge) || numAge < 1 || numAge > 120) {
        newErrors.age = 'Ingresa una edad válida';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const profile: UserProfile = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      age: age.trim(),
      isRegistered: true,
      registeredAt: Date.now(),
    };

    onLoginSuccess(profile);
  };

  return (
    <div className="min-h-screen bg-[#EEEFE8] flex flex-col justify-center items-center p-4 sm:p-6 py-10 selection:bg-[#E9ACBB]/40">
      <div className="w-full max-w-md bg-white rounded-[32px] p-6 sm:p-8 shadow-xl border border-[#EEEFE8] relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#E9ACBB] via-[#FCEBBF] to-[#8FBC93]" />

        {/* Logo and Header */}
        <div className="text-center pt-2 pb-6">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#E9ACBB] via-[#FCEBBF] to-[#8FBC93] blur-sm opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden p-1 bg-white border-2 border-white shadow-md">
              <img
                src="/assets/aistudio/image_5d0b2247.png"
                alt="Logo Oficial D'Yaliz"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider text-[#E9ACBB] block mb-1">
            Registro Rápido & Offline
          </span>
          <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#2D2322] leading-tight">
            Iniciar Sesión
          </h1>
          <p className="text-xs text-[#5C4F4E] mt-1.5 max-w-xs mx-auto">
            Ingresa tus datos para acceder a nuestro catálogo completo de postres y tortas sin conexión.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F4E] mb-1.5">
                Nombre *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ej: María"
                  className={`w-full px-3.5 py-3 rounded-2xl bg-[#EEEFE8]/60 border ${
                    errors.firstName ? 'border-red-400 bg-red-50/20' : 'border-[#EEEFE8]'
                  } focus:border-[#E9ACBB] focus:bg-white text-xs sm:text-sm text-[#2D2322] placeholder:text-[#5C4F4E]/40 focus:outline-hidden transition-all`}
                />
              </div>
              {errors.firstName && (
                <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F4E] mb-1.5">
                Apellido *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Ej: De las Casas"
                  className={`w-full px-3.5 py-3 rounded-2xl bg-[#EEEFE8]/60 border ${
                    errors.lastName ? 'border-red-400 bg-red-50/20' : 'border-[#EEEFE8]'
                  } focus:border-[#E9ACBB] focus:bg-white text-xs sm:text-sm text-[#2D2322] placeholder:text-[#5C4F4E]/40 focus:outline-hidden transition-all`}
                />
              </div>
              {errors.lastName && (
                <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F4E] mb-1.5">
              Número de Teléfono *
            </label>
            <div className="relative flex items-center">
              <Phone className="w-4 h-4 absolute left-3.5 text-[#5C4F4E]/60 pointer-events-none" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+51 983 344 508 o 987654321"
                className={`w-full pl-10 pr-3.5 py-3 rounded-2xl bg-[#EEEFE8]/60 border ${
                  errors.phone ? 'border-red-400 bg-red-50/20' : 'border-[#EEEFE8]'
                } focus:border-[#E9ACBB] focus:bg-white text-xs sm:text-sm text-[#2D2322] placeholder:text-[#5C4F4E]/40 focus:outline-hidden transition-all`}
              />
            </div>
            {errors.phone && (
              <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.phone}</p>
            )}
          </div>

          {/* Edad */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4F4E] mb-1.5">
              Edad *
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-4 h-4 absolute left-3.5 text-[#5C4F4E]/60 pointer-events-none" />
              <input
                type="number"
                min="5"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ej: 24"
                className={`w-full pl-10 pr-3.5 py-3 rounded-2xl bg-[#EEEFE8]/60 border ${
                  errors.age ? 'border-red-400 bg-red-50/20' : 'border-[#EEEFE8]'
                } focus:border-[#E9ACBB] focus:bg-white text-xs sm:text-sm text-[#2D2322] placeholder:text-[#5C4F4E]/40 focus:outline-hidden transition-all`}
              />
            </div>
            {errors.age && (
              <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.age}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-[#8FBC93] hover:bg-[#7ea882] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <span>Ingresar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security & Offline Local Storage Notice */}
        <div className="mt-6 pt-4 border-t border-[#EEEFE8] flex items-center justify-center gap-2 text-[11px] text-[#5C4F4E]">
          <ShieldCheck className="w-4 h-4 text-[#8FBC93]" />
          <span>Guardado local tipo Room / DataStore (100% privado)</span>
        </div>
      </div>
    </div>
  );
};
