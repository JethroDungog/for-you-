'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, HelpCircle, Heart, GraduationCap } from 'lucide-react';
import { playClickSound, playSuccessChime, playErrorSound } from '@/lib/soundEffects';
import { fireHeartConfetti } from '@/lib/confetti';

interface Step4TriviaProps {
  onNext: () => void;
}

export default function Step4Trivia({ onNext }: Step4TriviaProps) {
  const [answer, setAnswer] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUnlocked) return;

    playClickSound();
    const cleanAnswer = answer.trim().toLowerCase();

    // Check if cleanAnswer includes 'school'
    if (cleanAnswer.includes('school')) {
      setIsUnlocked(true);
      setErrorMessage(null);
      playSuccessChime();
      fireHeartConfetti();
      setTimeout(() => {
        onNext();
      }, 1000);
    } else {
      setIsShaking(true);
      playErrorSound();
      setErrorMessage('Hmm, not quite! Think about where our classes were 🎒');
      setTimeout(() => {
        setIsShaking(false);
      }, 600);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-sm mx-auto flex flex-col items-center text-center px-4 py-6"
    >
      {/* Icon Badge */}
      <motion.div
        animate={isUnlocked ? { scale: [1, 1.25, 1], rotate: [0, -10, 10, 0] } : {}}
        className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-md transition-colors duration-300 ${
          isUnlocked
            ? 'bg-emerald-100 text-emerald-600 shadow-emerald-200'
            : 'bg-white/80 text-[#d32f2f] border border-pink-200/80 shadow-pink-200/50'
        }`}
      >
        {isUnlocked ? <Unlock className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
      </motion.div>

      {/* Main Heading */}
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800 mb-1">
        🔒 Where did we first meet?
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-6 font-medium">
        Type the location where our chapters first crossed paths
      </p>

      {/* Form with input and Unlock button */}
      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col items-center gap-4">
        <motion.div
          animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="w-full relative"
        >
          <input
            type="text"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setErrorMessage(null);
            }}
            placeholder=""
            disabled={isUnlocked}
            className={`w-full px-5 py-3.5 rounded-full text-center text-base sm:text-lg font-medium tracking-wide bg-white shadow-sm transition-all outline-none ${
              isUnlocked
                ? 'border-2 border-emerald-400 text-emerald-700 bg-emerald-50/50'
                : 'border-2 border-pink-200 focus:border-[#d32f2f] text-slate-800 placeholder:text-transparent focus:ring-4 focus:ring-red-100'
            }`}
          />
        </motion.div>

        {/* Feedback message */}
        <div className="h-5">
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
                <Heart className="w-3.5 h-3.5 fill-emerald-500" /> Correct! Back at school ❤️
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* White button with red border/text labeled "Unlock" */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          disabled={isUnlocked || !answer.trim()}
          className="w-full py-3.5 px-8 rounded-full bg-white border-2 border-[#d32f2f] text-[#d32f2f] hover:bg-[#d32f2f] hover:text-white font-semibold text-base shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Unlock</span>
          <Unlock className="w-4 h-4" />
        </motion.button>
      </form>

      {/* Hint toggle */}
      <div className="mt-6">
        <button
          type="button"
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
            className="text-xs text-[#d32f2f] bg-pink-50/80 rounded-lg p-2.5 mt-1 border border-pink-200/60 flex items-center gap-1.5"
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span>Hint: Where we held our books and backpacks (e.g. <strong>school</strong>)</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
