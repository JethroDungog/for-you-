'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import { playClickSound } from '@/lib/soundEffects';

interface Step7CelebrationProps {
  onRestart?: () => void;
}

export default function Step7Celebration({ onRestart }: Step7CelebrationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm mx-auto flex flex-col items-center text-center px-4 py-8"
    >
      {/* Celebration Icon */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-400 to-[#d32f2f] text-white flex items-center justify-center mb-4 shadow-xl shadow-rose-500/30 border-4 border-white"
      >
        <span className="text-3xl select-none">💋</span>
      </motion.div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl font-serif font-black text-rose-700 mb-2">
        You Won: unli sex hehe 😉❤️
      </h1>

      <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xs mb-6">
        No expiration date, valid anytime, anywhere, forever with you!
      </p>

      {/* Voucher / Golden Ticket Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="w-full bg-gradient-to-br from-white via-rose-50 to-pink-100 rounded-3xl p-6 border-2 border-dashed border-rose-300 shadow-xl shadow-rose-200/50 relative overflow-hidden mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest">
            VIP COUPON #0930
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-[#d32f2f]">
            <Sparkles className="w-4 h-4 fill-[#d32f2f]" /> PRIZE CONFIRMED
          </span>
        </div>

        <div className="py-4 border-y border-rose-200/60 my-2">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#d32f2f] font-serif tracking-tight">
            UNLI SEX HEHE
          </div>
          <p className="text-xs text-rose-600 font-semibold mt-1">
            Redeemable directly with your boyfriend 💕
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500 font-medium">
          <span>Holder: My Beautiful GF</span>
          <span>Terms: Unlimited Kisses &amp; Cuddles Included</span>
        </div>
      </motion.div>

      {/* Restart Journey Button */}
      {onRestart && (
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            playClickSound();
            onRestart();
          }}
          className="px-6 py-3 rounded-full bg-white/90 hover:bg-white text-slate-700 font-bold text-sm shadow-md border border-pink-200 flex items-center gap-2 cursor-pointer transition-all"
        >
          <RotateCcw className="w-4 h-4 text-[#d32f2f]" />
          <span>Play from beginning</span>
        </motion.button>
      )}
    </motion.div>
  );
}
