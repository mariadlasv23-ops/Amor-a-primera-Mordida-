import React, { useState } from 'react';
import { Product } from '../types';

interface DessertVectorIllustrationProps {
  product: Product;
  className?: string;
}

export const DessertVectorIllustration: React.FC<DessertVectorIllustrationProps> = ({
  product,
  className = '',
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // If product has a valid image and hasn't failed, attempt to load it
  const hasImage = Boolean(product.imageUrl && !imageFailed && !product.imageUrl.includes('share.google'));

  const [fromColor, toColor] = product.accentGradient || ['#FCEBBF', '#E9ACBB'];

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex items-center justify-center select-none ${className}`}
      style={{
        background: `linear-gradient(135deg, ${fromColor} 0%, ${toColor} 100%)`,
      }}
    >
      {/* Decorative background radial pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id={`pat-${product.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50%" cy="50%" r="45%" fill={`url(#pat-${product.id})`} />
        </svg>
      </div>

      {/* Online Image if available and loaded */}
      {hasImage && (
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* 100% Offline Vector Pastry Art */}
      {(!hasImage || !imageLoaded) && (
        <div className="relative z-10 flex flex-col items-center justify-center p-4 transform transition-transform group-hover:scale-105 duration-300">
          <div className="w-20 h-20 sm:w-24 sm:h-24 filter drop-shadow-md flex items-center justify-center">
            {product.vectorType === 'cake' && (
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                {/* Cake base shadow */}
                <ellipse cx="50" cy="85" rx="36" ry="8" fill="rgba(0,0,0,0.18)" />
                {/* Plate */}
                <ellipse cx="50" cy="82" rx="38" ry="6" fill="#FFFFFF" opacity="0.9" />
                {/* Cake bottom layer */}
                <path d="M 20 54 L 20 76 Q 50 86 80 76 L 80 54 Q 50 64 20 54 Z" fill="#6B3E26" />
                {/* Middle filling */}
                <path d="M 20 54 Q 50 64 80 54 L 80 58 Q 50 68 20 58 Z" fill="#FFF2D6" />
                {/* Cake top layer */}
                <path d="M 20 36 L 20 54 Q 50 64 80 54 L 80 36 Q 50 46 20 36 Z" fill="#8B4E2E" />
                {/* Top Frosting */}
                <ellipse cx="50" cy="36" rx="30" ry="12" fill="#FFFBF5" />
                {/* Frosting Drips */}
                <path d="M 20 36 Q 26 48 30 38 Q 36 50 42 39 Q 48 52 54 39 Q 62 48 68 38 Q 74 46 80 36" stroke="#FFFBF5" strokeWidth="4" fill="none" strokeLinecap="round" />
                {/* Strawberry / Cherry on Top */}
                <circle cx="50" cy="24" r="8" fill="#E63946" />
                <path d="M 50 16 Q 54 10 58 12" stroke="#2A9D8F" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="48" cy="22" r="1.5" fill="#FFF" opacity="0.8" />
              </svg>
            )}

            {product.vectorType === 'cremolada' && (
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <ellipse cx="50" cy="90" rx="24" ry="5" fill="rgba(0,0,0,0.18)" />
                {/* Cup */}
                <path d="M 32 35 L 38 85 Q 50 89 62 85 L 68 35 Z" fill="#FFFFFF" opacity="0.8" />
                {/* Frozen Ice / Slush */}
                <path d="M 34 40 L 39 83 Q 50 86 61 83 L 66 40 Z" fill="#FF5D8F" opacity="0.9" />
                {/* Top Dome of Slush */}
                <path d="M 30 35 Q 50 15 70 35 Q 50 42 30 35 Z" fill="#FF477E" />
                {/* Straw */}
                <path d="M 55 35 L 70 8" stroke="#FFD166" strokeWidth="5" strokeLinecap="round" />
                <path d="M 55 35 L 70 8" stroke="#E76F51" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Fruit Slice */}
                <circle cx="34" cy="32" r="10" fill="#FFD166" />
                <circle cx="34" cy="32" r="7" fill="#F4A261" />
              </svg>
            )}

            {product.vectorType === 'alfajor' && (
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <ellipse cx="50" cy="80" rx="34" ry="7" fill="rgba(0,0,0,0.16)" />
                {/* Bottom cookie */}
                <path d="M 18 52 C 18 64 82 64 82 52 C 82 48 18 48 18 52 Z" fill="#E8C382" />
                {/* Manjar blanco filling */}
                <path d="M 19 46 C 19 56 81 56 81 46 C 81 42 19 42 19 46 Z" fill="#8C4F27" />
                {/* Top cookie */}
                <path d="M 18 38 C 18 50 82 50 82 38 C 82 28 18 28 18 38 Z" fill="#F4D399" />
                {/* Powdered sugar flecks */}
                <circle cx="35" cy="34" r="1.5" fill="#FFFFFF" opacity="0.9" />
                <circle cx="50" cy="32" r="1.8" fill="#FFFFFF" opacity="0.95" />
                <circle cx="65" cy="35" r="1.5" fill="#FFFFFF" opacity="0.9" />
                <circle cx="42" cy="38" r="1.2" fill="#FFFFFF" opacity="0.8" />
                <circle cx="58" cy="37" r="1.2" fill="#FFFFFF" opacity="0.85" />
              </svg>
            )}

            {product.vectorType === 'pie' && (
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <ellipse cx="50" cy="82" rx="36" ry="8" fill="rgba(0,0,0,0.18)" />
                {/* Pan */}
                <path d="M 15 52 L 24 76 Q 50 84 76 76 L 85 52 Z" fill="#B08968" />
                {/* Crust rim */}
                <ellipse cx="50" cy="50" rx="36" ry="14" fill="#DDB892" />
                {/* Lemon curd / Filling */}
                <ellipse cx="50" cy="49" rx="32" ry="11" fill="#FFD166" />
                {/* Meringue swirls */}
                <path d="M 28 47 Q 34 35 40 47 Q 50 30 60 47 Q 66 36 72 47" fill="#FFFFFF" stroke="#DDA15E" strokeWidth="1.5" />
                <ellipse cx="50" cy="43" rx="14" ry="6" fill="#FFFBF5" />
                {/* Torched peaks */}
                <path d="M 50 37 Q 52 32 54 37" stroke="#9C6644" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}

            {product.vectorType === 'flan' && (
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <ellipse cx="50" cy="84" rx="36" ry="8" fill="rgba(0,0,0,0.18)" />
                {/* Plate */}
                <ellipse cx="50" cy="80" rx="38" ry="7" fill="#FFFFFF" opacity="0.9" />
                {/* Caramel pool on plate */}
                <ellipse cx="50" cy="78" rx="30" ry="5" fill="#C86D14" opacity="0.8" />
                {/* Flan Body */}
                <path d="M 26 44 L 20 75 Q 50 83 80 75 L 74 44 Z" fill="#F4C47F" />
                {/* Flan Top */}
                <ellipse cx="50" cy="44" rx="24" ry="8" fill="#B05705" />
                {/* Caramel drip */}
                <path d="M 26 44 Q 28 58 32 50 Q 36 68 40 48 Q 46 64 52 48 Q 58 60 62 48 Q 68 62 74 44" fill="#8C3F00" opacity="0.9" />
              </svg>
            )}

            {product.vectorType === 'bowl' && (
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <ellipse cx="50" cy="84" rx="32" ry="6" fill="rgba(0,0,0,0.18)" />
                {/* Bowl */}
                <path d="M 20 45 C 20 80 80 80 80 45 Z" fill="#FFFFFF" opacity="0.95" />
                {/* Rice pudding surface */}
                <ellipse cx="50" cy="45" rx="30" ry="9" fill="#FFF9E6" />
                {/* Cinnamon dusting and stick */}
                <path d="M 40 42 L 68 25" stroke="#7F4F24" strokeWidth="4" strokeLinecap="round" />
                <circle cx="35" cy="44" r="1.2" fill="#7F4F24" opacity="0.8" />
                <circle cx="48" cy="47" r="1.5" fill="#7F4F24" opacity="0.8" />
                <circle cx="60" cy="44" r="1.2" fill="#7F4F24" opacity="0.8" />
              </svg>
            )}

            {product.vectorType === 'shot' && (
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <ellipse cx="50" cy="88" rx="20" ry="5" fill="rgba(0,0,0,0.18)" />
                {/* Glass */}
                <path d="M 34 25 L 38 84 Q 50 88 62 84 L 66 25 Z" fill="#FFFFFF" opacity="0.4" stroke="#FFFFFF" strokeWidth="1.5" />
                {/* Bottom layer */}
                <path d="M 37 70 L 38 84 Q 50 88 62 84 L 63 70 Z" fill="#78350F" />
                {/* Middle layer */}
                <path d="M 36 48 L 37 70 Q 50 74 63 70 L 64 48 Z" fill="#FCEBBF" />
                {/* Top layer */}
                <path d="M 35 28 L 36 48 Q 50 52 64 48 L 65 28 Z" fill="#E9ACBB" />
                {/* Mini spoon */}
                <path d="M 50 45 L 68 14" stroke="#C9B297" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}

            {product.vectorType === 'empanada' && (
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <ellipse cx="50" cy="80" rx="34" ry="7" fill="rgba(0,0,0,0.18)" />
                {/* Half moon empanada */}
                <path d="M 16 64 C 16 28 84 28 84 64 Z" fill="#E9B872" />
                {/* Crimped braided border */}
                <path d="M 16 64 Q 24 58 32 64 Q 40 58 48 64 Q 56 58 64 64 Q 72 58 84 64" stroke="#9E692D" strokeWidth="4" strokeLinecap="round" fill="none" />
                {/* Sugar and golden brush */}
                <ellipse cx="50" cy="46" rx="20" ry="8" fill="#F7D49C" opacity="0.6" />
                <circle cx="42" cy="42" r="1.5" fill="#FFF" opacity="0.9" />
                <circle cx="56" cy="45" r="1.5" fill="#FFF" opacity="0.9" />
              </svg>
            )}

            {product.vectorType === 'cupcake' && (
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <ellipse cx="50" cy="86" rx="24" ry="5" fill="rgba(0,0,0,0.18)" />
                {/* Cupcake Liner */}
                <path d="M 28 54 L 34 84 Q 50 88 66 84 L 72 54 Z" fill="#8FBC93" />
                {/* Liner pleats */}
                <path d="M 38 54 L 42 84 M 50 54 L 50 86 M 62 54 L 58 84" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                {/* Swirl Frosting */}
                <path d="M 22 54 Q 50 42 78 54 Q 74 34 50 30 Q 26 34 22 54 Z" fill="#E9ACBB" />
                <path d="M 32 38 Q 50 20 68 38 Q 62 20 50 18 Q 38 20 32 38 Z" fill="#FFC2D1" />
                {/* Sprinkles */}
                <rect x="42" y="38" width="4" height="1.5" rx="0.75" fill="#FFD166" transform="rotate(25 42 38)" />
                <rect x="54" y="42" width="4" height="1.5" rx="0.75" fill="#06D6A0" transform="rotate(-35 54 42)" />
                <rect x="48" y="28" width="4" height="1.5" rx="0.75" fill="#118AB2" transform="rotate(15 48 28)" />
                {/* Cherry */}
                <circle cx="50" cy="16" r="6" fill="#D90429" />
                <path d="M 50 12 Q 54 6 60 8" stroke="#2B9348" strokeWidth="1.5" fill="none" />
              </svg>
            )}

            {product.vectorType === 'truffle' && (
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <ellipse cx="50" cy="82" rx="30" ry="7" fill="rgba(0,0,0,0.2)" />
                {/* Paper cup */}
                <path d="M 24 64 L 28 78 Q 50 84 72 78 L 76 64 Z" fill="#C9B297" />
                {/* Chocolate Truffle */}
                <circle cx="50" cy="52" r="24" fill="#3D1D16" />
                {/* Chocolate Drizzle */}
                <path d="M 32 46 Q 50 38 68 52 M 36 56 Q 50 48 64 62" stroke="#E9ACBB" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* Gold flake */}
                <polygon points="50,42 52,46 56,48 52,50 50,54 48,50 44,48 48,46" fill="#FFD166" opacity="0.9" />
              </svg>
            )}

            {product.vectorType === 'skewer' && (
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                {/* Skewer stick */}
                <line x1="20" y1="80" x2="80" y2="20" stroke="#C9B297" strokeWidth="3" strokeLinecap="round" />
                {/* Fruits on stick */}
                <circle cx="34" cy="66" r="10" fill="#2A9D8F" /> {/* Kiwi */}
                <circle cx="48" cy="52" r="11" fill="#E63946" /> {/* Strawberry */}
                <circle cx="62" cy="38" r="9" fill="#7209B7" />  {/* Grape */}
                {/* Chocolate drizzle */}
                <path d="M 30 62 Q 50 45 70 30" stroke="#3D1D16" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </svg>
            )}
          </div>

          {/* Dessert Type Unboxed Badge */}
          <span className="mt-2 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/70 backdrop-blur-xs text-[#2D2322] shadow-xs">
            {product.category}
          </span>
        </div>
      )}
    </div>
  );
};
