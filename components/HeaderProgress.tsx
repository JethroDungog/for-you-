'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { playClickSound, setMuted } from '@/lib/soundEffects';

interface HeaderProgressProps {
  currentStep: number;
  totalSteps: number;
  onSelectStep?: (step: number) => void;
}

const STEP_LABELS = [
  'Welcome',
  'Anniversary',
  'Photo Puzzle',
  'First Date',
  'Voice Note',
  'Love Letter',
  'Lucky Spin',
  'Your Gift',
];

export default function HeaderProgress({
  currentStep,
  totalSteps,
  onSelectStep,
}: HeaderProgressProps) {
  const [muted, setLocalMuted] = useState(false);

  const toggleSound = () => {
    const nextState = !muted;
    setLocalMuted(nextState);
    setMuted(nextState);
    if (!nextState) playClickSound();
  };

  const progressPercent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <header className="relative z-20 w-full max-w-lg mx-auto pt-4 px-4 pb-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#d32f2f]/80">
          <Heart className="w-3.5 h-3.5 fill-[#d32f2f] text-[#d32f2f] animate-pulse" />
          <span>Chapter {currentStep} of {totalSteps}: {STEP_LABELS[currentStep - 1]}</span>
        </div>

        <button
          onClick={toggleSound}
          className="p-1.5 rounded-full bg-white/70 hover:bg-white text-slate-700 hover:text-[#d32f2f] transition-all shadow-sm border border-pink-200/60 active:scale-95"
          title={muted ? 'Unmute audio' : 'Mute audio'}
          aria-label="Toggle Sound"
        >
          {muted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#d32f2f]" />}
        </button>
      </div>

      {/* Progress track */}
      <div className="relative w-full h-2 bg-pink-200/50 rounded-full overflow-hidden p-0.5">
        <div
          className="h-full bg-gradient-to-r from-[#f48fb1] to-[#d32f2f] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Micro Step Dots */}
      <div className="flex justify-between items-center mt-2 px-1">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => {
          const isDone = s < currentStep;
          const isCurrent = s === currentStep;

          return (
            <button
              key={s}
              onClick={() => {
                if (onSelectStep) {
                  playClickSound();
                  onSelectStep(s);
                }
              }}
              title={`Jump to step ${s}: ${STEP_LABELS[s - 1]}`}
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-300 ${
                isCurrent
                  ? 'bg-[#d32f2f] text-white ring-2 ring-pink-300 scale-125 shadow-sm'
                  : isDone
                  ? 'bg-[#f48fb1] text-white hover:scale-110'
                  : 'bg-white/80 text-pink-300 border border-pink-200 hover:border-pink-400'
              }`}
            >
              {isDone ? '✓' : s}
            </button>
          );
        })}
      </div>
    </header>
  );
}
