'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { playWaxSealSound, playClickSound } from '@/lib/soundEffects';
import { fireHeartConfetti } from '@/lib/confetti';

interface Step6LoveLetterProps {
  onNext: () => void;
}

export default function Step6LoveLetter({ onNext }: Step6LoveLetterProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenSeal = () => {
    if (isOpened) return;
    playWaxSealSound();
    fireHeartConfetti();
    setIsOpened(true);
  };

  const handleContinue = () => {
    playClickSound();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto flex flex-col items-center text-center px-4 py-4"
    >
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800 mb-1">
        A letter for you
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-6 font-medium">
        {isOpened ? 'Read what my heart wrote for you' : 'Tap to remove the seal.'}
      </p>

      {/* Envelope & Letter Stage */}
      <div className="relative w-full max-w-[340px] sm:max-w-[360px] h-[390px] flex items-center justify-center mb-6">
        {/* Sliding Letter (Paper) */}
        <motion.div
          initial={{ y: 20, scale: 0.88, opacity: 0 }}
          animate={
            isOpened
              ? { y: -85, scale: 1, opacity: 1 }
              : { y: 20, scale: 0.88, opacity: 0 }
          }
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          className={`absolute z-20 w-[290px] sm:w-[310px] parchment-paper p-5 rounded-xl border border-amber-200/80 shadow-2xl text-left select-none ${
            isOpened ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Subtle Decorative Stamp */}
          <div className="flex justify-between items-start border-b border-pink-200/50 pb-2 mb-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Air Mail • Special Delivery
            </span>
            <span className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center text-[10px] text-[#d32f2f]">
              ❤️
            </span>
          </div>

          <p className="text-xs font-serif text-slate-500 italic mb-2">My dearest,</p>

          {/* Letter Poem */}
          <div className="my-2 space-y-2 text-xs sm:text-sm font-serif text-slate-700 leading-relaxed">
            <p>
              Habang tumatagal<br />
              Na di tayo nagkikita,<br />
              Lalo kong napatutunayang<br />
              May kulang talaga.
            </p>
            <p>
              Di kumpleto ang saya,<br />
              Di ramdam ang ligaya.<br />
              May kulang talaga<br />
              Sa ara kung wala ka.
            </p>
            <p className="font-handwriting font-bold text-base text-[#d32f2f] pt-1">
              Happy monthsary my love! ❤️
            </p>
          </div>

          <div className="flex justify-between items-end pt-2 border-t border-pink-100">
            <span className="text-[10px] font-mono text-slate-400">Always &amp; Forever</span>
            <div className="text-right">
              <p className="text-[11px] text-slate-500 font-serif">Forever yours,</p>
              <p className="text-lg font-handwriting font-bold text-[#d32f2f]">Cholo</p>
            </div>
          </div>
        </motion.div>

        {/* Envelope Body */}
        <div className="absolute bottom-2 w-[310px] sm:w-[330px] h-[210px] bg-gradient-to-b from-[#f8bbd0] to-[#f48fb1] rounded-2xl shadow-xl shadow-pink-300/40 border border-white/60 overflow-hidden z-10 flex flex-col justify-end">
          {/* Envelope Inner Liners & Flaps */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#f06292]/30 to-transparent pointer-events-none" />

          {/* Side Folds (Triangles) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
              backgroundColor: '#f8bbd0',
              opacity: 0.95,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
              backgroundColor: '#f8bbd0',
              opacity: 0.95,
            }}
          />
          {/* Bottom Fold */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: 'polygon(0 100%, 50% 45%, 100% 100%)',
              backgroundColor: '#f48fb1',
              boxShadow: '0 -4px 10px rgba(0,0,0,0.05)',
            }}
          />

          {/* Top Flap (Opens Upwards) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpened ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              transformOrigin: 'top',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
            className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-b from-[#fce4ec] to-[#f8bbd0] shadow-md border-t border-white/60"
          />

          {/* Wax Seal Stamp "P" */}
          <AnimatePresence>
            {!isOpened && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0, filter: 'blur(4px)' }}
                whileHover={{ scale: 1.1, rotate: 3 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleOpenSeal}
                className="absolute top-[80px] left-1/2 -translate-x-1/2 z-40 w-16 h-16 rounded-full cursor-pointer flex items-center justify-center group focus:outline-none"
                title="Tap to remove seal"
                aria-label="Tap to remove seal"
              >
                {/* Wax seal background with irregular embossed ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#c62828] via-[#b71c1c] to-[#7f0000] shadow-lg shadow-red-900/40 border-2 border-[#ef5350]/60 ring-2 ring-[#b71c1c]/40" />

                {/* Wax Seal Stamp Initial "P" */}
                <div className="relative w-12 h-12 rounded-full border border-red-300/40 flex items-center justify-center text-white/95 font-serif font-bold text-2xl shadow-inner">
                  <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">P</span>
                </div>

                {/* Subtle Sparkle & Ping */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Instruction or Action Button */}
      {!isOpened ? (
        <motion.p
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={handleOpenSeal}
          className="text-xs font-semibold text-[#d32f2f] cursor-pointer hover:underline flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tap the wax seal &apos;P&apos; to unseal the envelope</span>
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-xs"
        >
          <motion.button
            onClick={handleContinue}
            whileHover={{ scale: 1.04, boxShadow: '0 10px 25px -4px rgba(211, 47, 47, 0.35)' }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-3.5 px-8 rounded-full bg-[#d32f2f] text-white font-semibold text-base shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
