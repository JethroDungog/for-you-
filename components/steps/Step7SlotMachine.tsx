'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, Trophy, ArrowRight } from 'lucide-react';
import { playClickSound, playReelTick, playJackpotSound } from '@/lib/soundEffects';
import { fireGrandCelebration } from '@/lib/confetti';

interface Step7SlotMachineProps {
  onNext: () => void;
}

const ICONS = ['💖', '🎁', '💎', '💍', '🌹', '👑'];
const WINNING_ICONS = ['🎁', '🎁', '🎁'];

export default function Step7SlotMachine({ onNext }: Step7SlotMachineProps) {
  const [reels, setReels] = useState<string[]>(['💖', '💍', '💎']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [leverPulled, setLeverPulled] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const spinReels = () => {
    if (isSpinning || hasWon) return;

    playClickSound();
    setLeverPulled(true);
    setIsSpinning(true);

    // Release lever after short pull
    setTimeout(() => {
      setLeverPulled(false);
    }, 400);

    // Ticking audio during spins
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      playReelTick();
      tickCount++;
      if (tickCount > 18) clearInterval(tickInterval);
    }, 110);

    // Random jitter reel animation
    let frames = 0;
    const interval = setInterval(() => {
      setReels([
        ICONS[Math.floor(Math.random() * ICONS.length)],
        ICONS[Math.floor(Math.random() * ICONS.length)],
        ICONS[Math.floor(Math.random() * ICONS.length)],
      ]);
      frames++;

      if (frames > 22) {
        clearInterval(interval);
        // Land on guaranteed jackpot
        setReels(WINNING_ICONS);
        setIsSpinning(false);
        setHasWon(true);
        playJackpotSound();
        fireGrandCelebration();

        // Auto transition after 2.6s so user can admire the win
        setTimeout(() => {
          onNext();
        }, 2600);
      }
    }, 85);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-sm mx-auto flex flex-col items-center text-center px-4 py-4"
    >
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800 mb-1">
        Lucky Prize Spin
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-5 font-medium">
        Pull the lever to unveil your surprise!
      </p>

      {/* Main Slot Machine Chassis with Lever on Right */}
      <div className="relative flex items-center justify-center w-full max-w-[340px] pl-6 pr-10 mb-5">
        {/* Slot Machine Main Housing */}
        <div className="w-full bg-gradient-to-b from-[#f06292] via-[#e91e63] to-[#c2185b] rounded-3xl p-3.5 shadow-2xl shadow-pink-900/30 border-4 border-yellow-300 relative">
          {/* Top Marquee Header */}
          <div className="bg-[#880e4f] rounded-2xl py-2 px-3 mb-3 border-2 border-yellow-200/80 flex items-center justify-between shadow-inner">
            <span className="flex items-center gap-1 text-[11px] font-bold text-yellow-300 tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" />
              <span>SPIN TO WIN</span>
            </span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 shadow-sm shadow-yellow-200 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
            </div>
          </div>

          {/* Reel Display Window Frame */}
          <div className="bg-gradient-to-b from-stone-900 to-stone-800 p-2.5 rounded-2xl border-4 border-yellow-400 shadow-inner">
            <div className="grid grid-cols-3 gap-2 bg-stone-950 p-2 rounded-xl overflow-hidden relative">
              {/* Central Payline Guide */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-red-500/50 pointer-events-none z-10" />

              {reels.map((symbol, idx) => (
                <div
                  key={idx}
                  className="h-24 sm:h-28 rounded-lg bg-gradient-to-b from-white via-pink-50 to-white flex items-center justify-center text-4xl sm:text-5xl shadow-md border border-stone-300 overflow-hidden relative"
                >
                  <motion.div
                    key={symbol + (isSpinning ? idx : '')}
                    initial={isSpinning ? { y: -30, filter: 'blur(3px)' } : { y: 0, filter: 'blur(0px)' }}
                    animate={{ y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.12 }}
                    className="select-none drop-shadow-sm"
                  >
                    {symbol}
                  </motion.div>

                  {/* Glass Reflection on Reel */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/10 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Machine Grille / Coin Tray */}
          <div className="mt-3 flex items-center justify-between px-2">
            <div className="w-8 h-2 rounded bg-pink-900/60" />
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
              <span className="text-[10px] font-mono font-bold text-yellow-200 uppercase">Jackpot 100%</span>
            </div>
            <div className="w-8 h-2 rounded bg-pink-900/60" />
          </div>
        </div>

        {/* Mechanical Lever Mounted on Right */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col items-center">
          {/* Lever Arm Pivot */}
          <div className="relative">
            {/* Lever Mount Base */}
            <div className="w-4 h-9 bg-gradient-to-r from-stone-400 to-stone-600 rounded-r-md border border-stone-700 shadow-md" />

            {/* Lever Rod & Knob */}
            <motion.div
              animate={
                leverPulled
                  ? { rotate: 50, y: 35 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              style={{ transformOrigin: 'left bottom' }}
              className="absolute left-2 -top-12 flex flex-col items-center cursor-pointer group"
              onClick={spinReels}
              title="Pull lever to spin"
            >
              {/* Red Ball Knob */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 via-[#d32f2f] to-[#7f0000] border-2 border-red-200 shadow-lg shadow-red-900/50 flex items-center justify-center relative"
              >
                <div className="w-3 h-3 rounded-full bg-white/60 -top-1 -left-1 absolute" />
              </motion.div>

              {/* Chrome Rod */}
              <div className="w-3 h-14 bg-gradient-to-r from-slate-200 via-white to-slate-400 rounded-b shadow-sm border-x border-slate-400" />

              {/* Lever Label Pill */}
              <div className="mt-1 whitespace-nowrap bg-yellow-400 text-stone-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md uppercase tracking-tight animate-bounce">
                SPIN ⬇
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Winning State Announcement */}
      <div className="h-14 flex items-center justify-center w-full">
        <AnimatePresence>
          {hasWon && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 via-pink-100 to-yellow-100 border-2 border-yellow-400 px-5 py-2.5 rounded-full shadow-lg"
            >
              <div className="w-7 h-7 rounded-full bg-[#d32f2f] text-white flex items-center justify-center">
                <Gift className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-sm sm:text-base text-slate-800 tracking-wide">
                CONGRATS. YOU WON.
              </span>
              <Trophy className="w-5 h-5 text-yellow-600 fill-yellow-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Button */}
      <div className="mt-3 w-full max-w-xs">
        {hasWon ? (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              playClickSound();
              onNext();
            }}
            className="w-full py-3.5 px-6 rounded-full bg-[#d32f2f] text-white font-bold text-base shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Claim your prize</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={spinReels}
            disabled={isSpinning}
            className="w-full py-3.5 px-6 rounded-full bg-[#d32f2f] text-white font-bold text-base shadow-md shadow-red-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isSpinning ? 'Spinning reels...' : 'Pull Lever or Tap to Spin'}</span>
            <Sparkles className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
