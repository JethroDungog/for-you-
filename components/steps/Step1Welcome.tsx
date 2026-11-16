'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Gift } from 'lucide-react';
import { playClickSound } from '@/lib/soundEffects';

interface Step1WelcomeProps {
  onNext: () => void;
}

export default function Step1Welcome({ onNext }: Step1WelcomeProps) {
  const handleOpen = () => {
    playClickSound();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto flex flex-col items-center text-center px-4 py-8"
    >
      {/* Decorative Floating Icon */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [-1, 2, -1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'easeInOut',
        }}
        className="relative mb-6"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#f8bbd0] via-white to-[#f48fb1] p-1 shadow-lg shadow-pink-300/40 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden">
            <Gift className="w-11 h-11 text-[#d32f2f]" strokeWidth={1.8} />
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 text-pink-400"
            >
              <Sparkles className="w-5 h-5 fill-pink-300 text-pink-400" />
            </motion.div>
          </div>
        </div>

        {/* Small floating hearts */}
        <motion.div
          animate={{ scale: [0.8, 1.1, 0.8], y: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="absolute -bottom-1 -left-2 bg-pink-100 p-1.5 rounded-full shadow-sm"
        >
          <Heart className="w-4 h-4 fill-[#d32f2f] text-[#d32f2f]" />
        </motion.div>
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#d32f2f] text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>For someone truly special</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl sm:text-5xl font-serif font-bold text-slate-800 mb-3 tracking-tight"
      >
        Welcome, lovely!
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-base sm:text-lg text-slate-600 mb-9 max-w-xs font-medium leading-relaxed"
      >
        I have a special surprise for you!
      </motion.p>

      {/* Primary Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full flex justify-center"
      >
        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.04, boxShadow: '0 12px 25px -4px rgba(211, 47, 47, 0.4)' }}
          whileTap={{ scale: 0.96 }}
          className="group relative px-9 py-4 rounded-full bg-[#d32f2f] text-white font-semibold text-lg shadow-md shadow-red-500/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Open here</span>
          <Heart className="w-5 h-5 fill-white/90 group-hover:scale-125 transition-transform duration-300" />

          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#d32f2f] opacity-40 animate-ping -z-10" />
        </motion.button>
      </motion.div>

      {/* Bottom Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="mt-8 text-xs text-slate-500/80 font-medium"
      >
        Turn up your volume for the full experience 🎵
      </motion.p>
    </motion.div>
  );
}
