import React from 'react';
import { motion } from 'motion/react';
import {
  Utensils,
  ShoppingBag,
  Pill,
  Package,
  MapPin,
  Truck,
  Bike,
  Languages
} from 'lucide-react';
import Logo from './Logo';

interface LanguageGatewayProps {
  onSelect: (lang: 'en' | 'kn') => void;
}

export default function LanguageGateway({ onSelect }: LanguageGatewayProps) {
  const [isExiting, setIsExiting] = React.useState(false);

  const handleSelect = (selectedLang: 'en' | 'kn') => {
    setIsExiting(true);
    setTimeout(() => {
      onSelect(selectedLang);
    }, 450);
  };

  const floatingIcons = [
    { Icon: Utensils, color: 'text-[#FF6B00]/8 bg-orange-50/40 border-orange-100/20', size: 'w-12 h-12 md:w-16 md:h-16', pos: 'top-[10%] left-[8%] md:top-[12%] md:left-[15%]', delay: 0, duration: 6 },
    { Icon: ShoppingBag, color: 'text-emerald-500/8 bg-emerald-50/40 border-emerald-100/20', size: 'w-14 h-14 md:w-20 md:h-20', pos: 'top-[22%] right-[6%] md:top-[25%] md:right-[12%]', delay: 1.5, duration: 7 },
    { Icon: Pill, color: 'text-teal-500/8 bg-teal-50/40 border-teal-100/20', size: 'w-12 h-12 md:w-16 md:h-16', pos: 'bottom-[12%] left-[10%] md:bottom-[20%] md:left-[18%]', delay: 0.8, duration: 6.5 },
    { Icon: Package, color: 'text-amber-500/8 bg-amber-50/40 border-amber-100/20', size: 'w-11 h-11 md:w-14 md:h-14', pos: 'bottom-[15%] right-[10%] md:bottom-[18%] md:right-[15%]', delay: 2.2, duration: 5.5 },
    { Icon: Bike, color: 'text-blue-500/8 bg-blue-50/40 border-blue-100/20', size: 'w-14 h-14 md:w-18 md:h-18', pos: 'top-[35%] left-[5%] md:top-[38%] md:left-[25%]', delay: 1.8, duration: 8 },
    { Icon: MapPin, color: 'text-red-500/8 bg-red-50/40 border-red-100/20', size: 'w-14 h-14 md:w-18 md:h-18', pos: 'top-[15%] right-[25%] md:top-[10%] md:right-[30%]', delay: 0.5, duration: 7.2 },
    { Icon: Truck, color: 'text-indigo-500/8 bg-indigo-50/40 border-indigo-100/20', size: 'w-12 h-12 md:w-16 md:h-16', pos: 'bottom-[35%] right-[6%] md:bottom-[35%] md:right-[25%]', delay: 1.2, duration: 6.8 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      className="min-h-screen w-full bg-white relative flex flex-col justify-between items-center py-8 px-4 overflow-hidden select-none"
    >
      {/* Soft light orange gradient radial backdrop */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(255,107,0,0.04)_0%,rgba(255,255,255,0)_70%] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[circle_at_top,rgba(255,107,0,0.03)_0%,rgba(255,255,255,0)_50%] pointer-events-none" />

      {/* Floating Delivery Icons Background Panel */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {floatingIcons.map((item, index) => {
          const { Icon, color, size, pos, delay, duration } = item;
          return (
            <motion.div
              key={index}
              className={`absolute ${pos} ${size} rounded-2xl border flex items-center justify-center shadow-xs`}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
                opacity: [0.35, 0.5, 0.35]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
              }}
            >
              <Icon className={`w-[50%] h-[50%] ${color.split(' ')[0]}`} />
            </motion.div>
          );
        })}
      </div>

      {/* Header section with Grabito Mascot logo */}
      <header className="w-full max-w-7xl flex justify-center py-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Logo theme="light" showSlogan={true} className="scale-105" />
        </motion.div>
      </header>

      {/* Main Choice Section */}
      <main className="w-full max-w-4xl flex flex-col items-center justify-center my-auto py-6 z-10">
        {/* Title & Subtitle */}
        <div className="text-center space-y-4 max-w-xl mx-auto mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-100 px-3.5 py-1 rounded-full"
          >
            <Languages className="w-4 h-4 text-[#FF6B00]" />
            <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider font-mono">
              Gateway Access / ಪ್ರವೇಶ ದ್ವಾರ
            </span>
          </motion.div>
          
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-display font-black text-3xl md:text-4xl text-gray-900 tracking-tight"
            >
              Choose Your Language <span className="text-gray-300">/</span> ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-500 text-sm md:text-base font-medium"
            >
              Please select your preferred language to continue.
              <span className="block mt-1 text-xs text-gray-400 font-normal">ಮುಂದುವರಿಯಲು ದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.</span>
            </motion.p>
          </div>
        </div>

        {/* Two Large Premium Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-2">
          
          {/* Card 1: Kannada (kn) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 20, delay: 0.4 }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-white rounded-3xl border border-gray-100 hover:border-orange-200 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer min-h-[250px] md:min-h-[280px]"
            onClick={() => handleSelect('kn')}
          >
            {/* Background absolute glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:to-orange-500/2 transition-colors duration-300" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-3xl filter drop-shadow-sm">🇮🇳</span>
                <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider font-mono bg-orange-50 px-2.5 py-1 rounded-full group-hover:bg-[#FF6B00] group-hover:text-white transition-colors duration-300">
                  ಕನ್ನಡ
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display font-extrabold text-xl text-gray-900 group-hover:text-[#FF6B00] transition-colors">
                  Continue in Kannada
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  ಎಲ್ಲಾ ಮಾಹಿತಿ, ಫ್ರಾಂಚೈಸ್ ಅರ್ಜಿ ಮತ್ತು ಲೈವ್ ಹಬ್ ವಿವರಗಳು ಪರಿಪೂರ್ಣ ಕನ್ನಡದಲ್ಲಿ ಲಭ್ಯವಿರುತ್ತವೆ.
                </p>
                <p className="text-xs text-gray-400 italic">
                  Entire website will open in professional Kannada.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('kn');
                }}
                className="w-full bg-[#FF6B00] hover:bg-[#E05E00] text-white font-display font-bold text-sm py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
              >
                ಮುಂದುವರಿಯಿರಿ
              </button>
            </div>
          </motion.div>

          {/* Card 2: English (en) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-white rounded-3xl border border-gray-100 hover:border-orange-200 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer min-h-[250px] md:min-h-[280px]"
            onClick={() => handleSelect('en')}
          >
            {/* Background absolute glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:to-orange-500/2 transition-colors duration-300" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-3xl filter drop-shadow-sm">🇬🇧</span>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider font-mono bg-gray-50 px-2.5 py-1 rounded-full group-hover:bg-[#FF6B00] group-hover:text-white group-hover:border-transparent transition-colors duration-300">
                  English
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display font-extrabold text-xl text-gray-900 group-hover:text-[#FF6B00] transition-colors">
                  Continue in English
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Access all pricing models, Gundlupete operational details, interactive calculator, and franchise inquiry form.
                </p>
                <p className="text-xs text-gray-400 italic">
                  Entire website will open in English.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('en');
                }}
                className="w-full bg-[#FF6B00] hover:bg-[#E05E00] text-white font-display font-bold text-sm py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
              >
                Continue
              </button>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Footer copyright section */}
      <footer className="w-full text-center py-4 text-xs text-gray-400 z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          © 2026 Grabito. Made for small towns of Karnataka. {` • `} 
          <span className="font-semibold text-[#FF6B00]">ಕರ್ನಾಟಕದಲ್ಲಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ</span>
        </motion.p>
      </footer>
    </motion.div>
  );
}
