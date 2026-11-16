'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, Lock, Unlock, HelpCircle, Heart } from 'lucide-react';
import { playKeySound, playSuccessChime, playErrorSound, playClickSound } from '@/lib/soundEffects';
import { fireHeartConfetti } from '@/lib/confetti';

interface Step2PasscodeProps {
  onNext: () => void;
}

const CORRECT_CODE = '0327';

export default function Step2Passcode({ onNext }: Step2PasscodeProps) {
  const [pin, setPin] = useState<string>('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const checkCode = useCallback(
    (enteredPin: string) => {
      if (enteredPin === CORRECT_CODE) {
        setIsUnlocked(true);
        setErrorMessage(null);
        playSuccessChime();
        fireHeartConfetti();
        setTimeout(() => {
          onNext();
        }, 900);
      } else {
        setIsShaking(true);
        playErrorSound();
        setErrorMessage('Oops! That is not our date 💔');
        setTimeout(() => {
          setIsShaking(false);
          setPin('');
        }, 800);
      }
    },
    [onNext]
  );

  const handleKeyPress = useCallback(
    (digit: string) => {
      if (pin.length >= 4 || isUnlocked) return;
      playKeySound(1 + pin.length * 0.1);
      const nextPin = pin + digit;
      setPin(nextPin);
      setErrorMessage(null);

      if (nextPin.length === 4) {
        setTimeout(() => checkCode(nextPin), 150);
      }
    },
    [pin, isUnlocked, checkCode]
  );

  const handleBackspace = useCallback(() => {
    if (isUnlocked || pin.length === 0) return;
    playClickSound();
    setPin((prev) => prev.slice(0, -1));
    setErrorMessage(null);
  }, [isUnlocked, pin.length]);

  const handleClear = useCallback(() => {
    if (isUnlocked) return;
    playClickSound();
    setPin('');
    setErrorMessage(null);
  }, [isUnlocked]);

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress, handleBackspace, handleClear]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-sm mx-auto flex flex-col items-center text-center px-4 py-4"
    >
      {/* Lock Icon Indicator */}
      <motion.div
        animate={isUnlocked ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
        className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-md transition-colors duration-300 ${
          isUnlocked
            ? 'bg-emerald-100 text-emerald-600 shadow-emerald-200'
            : 'bg-white/80 text-[#d32f2f] border border-pink-200/80 shadow-pink-200/50'
        }`}
      >
        {isUnlocked ? <Unlock className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
      </motion.div>

      {/* Main Heading */}
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800 mb-1 flex items-center gap-2">
        <span>🔒 When is our anniversary?</span>
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-6 font-medium">
        Enter the 4-digit date that changed everything (MMDD)
      </p>

      {/* 4-Digit Display Indicator */}
      <motion.div
        animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center gap-3 mb-6"
      >
        {[0, 1, 2, 3].map((index) => {
          const char = pin[index];
          const hasChar = char !== undefined;

          return (
            <motion.div
              key={index}
              animate={hasChar ? { scale: [1, 1.15, 1] } : {}}
              className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl flex items-center justify-center text-2xl font-bold font-mono transition-all duration-200 shadow-sm ${
                isUnlocked
                  ? 'bg-emerald-50 border-2 border-emerald-400 text-emerald-600'
                  : hasChar
                  ? 'bg-white border-2 border-[#d32f2f] text-[#d32f2f] shadow-pink-200/60'
                  : 'bg-white/60 border-2 border-pink-200/70 text-slate-300'
              }`}
            >
              {hasChar ? (
                <span className="animate-in fade-in zoom-in duration-150">{char}</span>
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-pink-200" />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Feedback message */}
      <div className="h-6 mb-3">
        <AnimatePresence>
          {errorMessage && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs font-semibold text-rose-600"
            >
              {errorMessage}
            </motion.p>
          )}
          {isUnlocked && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold text-emerald-600 flex items-center justify-center gap-1"
            >
              <Heart className="w-3.5 h-3.5 fill-emerald-500" /> Unlocked! March 27 is forever ours.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Keypad Grid (3x3 + 0 + Backspace) */}
      <div className="w-full max-w-[280px] grid grid-cols-3 gap-2.5 mb-4">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
          <motion.button
            key={num}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleKeyPress(num)}
            disabled={isUnlocked}
            className="h-14 rounded-2xl bg-white/90 hover:bg-white text-slate-800 text-xl font-bold font-sans shadow-sm border border-pink-100/80 active:bg-pink-50 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            {num}
          </motion.button>
        ))}

        {/* Clear Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleClear}
          disabled={isUnlocked || pin.length === 0}
          className="h-14 rounded-2xl bg-white/70 hover:bg-white text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-wider shadow-sm border border-pink-100/80 transition-all flex items-center justify-center cursor-pointer disabled:opacity-40"
        >
          Clear
        </motion.button>

        {/* 0 Key */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => handleKeyPress('0')}
          disabled={isUnlocked}
          className="h-14 rounded-2xl bg-white/90 hover:bg-white text-slate-800 text-xl font-bold font-sans shadow-sm border border-pink-100/80 active:bg-pink-50 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
        >
          0
        </motion.button>

        {/* Backspace Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleBackspace}
          disabled={isUnlocked || pin.length === 0}
          className="h-14 rounded-2xl bg-white/70 hover:bg-white text-slate-600 hover:text-[#d32f2f] shadow-sm border border-pink-100/80 transition-all flex items-center justify-center cursor-pointer disabled:opacity-40"
          title="Backspace"
          aria-label="Backspace"
        >
          <Delete className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Hint Accordion */}
      <div className="mt-1">
        <button
          onClick={() => setShowHint(!showHint)}
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors py-1"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showHint ? 'Hide hint' : 'Need a hint?'}</span>
        </button>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-xs text-[#d32f2f] bg-pink-50/80 rounded-lg p-2 mt-1 border border-pink-200/60"
          >
            🌸 March 27 (Format: <strong>0327</strong>)
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
