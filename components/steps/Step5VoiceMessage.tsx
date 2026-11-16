'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Heart, ArrowRight, Mic, Volume2 } from 'lucide-react';
import { playClickSound, getMuted } from '@/lib/soundEffects';

interface Step5VoiceMessageProps {
  onNext: () => void;
}

const TOTAL_DURATION = 15; // 15 seconds

export default function Step5VoiceMessage({ onNext }: Step5VoiceMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const synthNodesRef = useRef<Array<OscillatorNode | GainNode>>([]);

  // Synthesize gentle warm acoustic chords for voice message simulation
  const startRomanticMelody = () => {
    if (getMuted()) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current && AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      // Create gentle soothing melodic chords
      const chordFrequencies = [261.63, 329.63, 392.00, 523.25]; // C major gentle warm chord
      chordFrequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Low volume ambient bed
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04 / (i + 1), ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        synthNodesRef.current.push(osc, gain);
      });
    } catch {
      // Audio fallback
    }
  };

  const stopRomanticMelody = () => {
    synthNodesRef.current.forEach((node) => {
      try {
        if ('stop' in node) (node as OscillatorNode).stop();
        node.disconnect();
      } catch {
        // cleanup
      }
    });
    synthNodesRef.current = [];
  };

  // Timer loop for playback progress
  useEffect(() => {
    if (isPlaying) {
      startRomanticMelody();
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION) {
            setIsPlaying(false);
            setHasCompleted(true);
            stopRomanticMelody();
            return TOTAL_DURATION;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      stopRomanticMelody();
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      stopRomanticMelody();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    playClickSound();
    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    playClickSound();
    stopRomanticMelody();
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProceed = () => {
    playClickSound();
    stopRomanticMelody();
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
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800 mb-1 flex items-center justify-center gap-2">
        <span>Voice message</span>
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-5 font-medium">
        Press play to listen to a sweet note from me to you
      </p>

      {/* Retro Cassette Tape Graphic */}
      <div className="w-full max-w-[340px] sm:max-w-[360px] bg-gradient-to-b from-[#2b2528] to-[#1c181a] p-3.5 rounded-2xl shadow-xl shadow-pink-900/15 border-2 border-[#3d3439] relative select-none">
        {/* Cassette Screws in Corners */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-stone-500 border border-stone-600 flex items-center justify-center text-[7px] text-stone-700 font-mono">+</div>
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-stone-500 border border-stone-600 flex items-center justify-center text-[7px] text-stone-700 font-mono">+</div>
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-stone-500 border border-stone-600 flex items-center justify-center text-[7px] text-stone-700 font-mono">+</div>
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-stone-500 border border-stone-600 flex items-center justify-center text-[7px] text-stone-700 font-mono">+</div>

        {/* Vintage Paper Label */}
        <div className="bg-[#fff9f0] rounded-xl p-3 border border-pink-200/50 shadow-inner text-left relative overflow-hidden">
          {/* Label Header */}
          <div className="flex items-center justify-between border-b border-pink-200/80 pb-1.5 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#d32f2f] text-white text-[9px] font-bold flex items-center justify-center">A</span>
              <span className="font-serif font-bold text-xs text-slate-800 tracking-wide">FOR MY LOVELY</span>
            </div>
            <span className="text-[10px] font-mono font-semibold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
              SIDE A • 60MIN
            </span>
          </div>

          {/* Central Tape Window with Animated Spinning Reels */}
          <div className="bg-[#2a2427] rounded-lg p-2 flex items-center justify-around border border-stone-700/80 shadow-inner relative">
            {/* Left Reel */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              {/* Tape Spool Outer */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-600 transition-all duration-300"
                style={{
                  transform: `scale(${1 - (currentTime / TOTAL_DURATION) * 0.25})`,
                }}
              />
              {/* Rotating Gear Wheel */}
              <motion.div
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-8 h-8 rounded-full border-2 border-dashed border-white/80 bg-stone-200 flex items-center justify-center shadow-sm z-10"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-[#1c181a] border border-stone-400" />
              </motion.div>
            </div>

            {/* Center Transparent Tape Window with Ruler markings */}
            <div className="flex flex-col items-center justify-center px-2">
              <div className="w-16 h-4 bg-black/40 rounded flex items-center justify-center border border-stone-700/60 mb-1">
                {/* Simulated Audio Bars */}
                <div className="flex items-center gap-0.5 h-3">
                  {[40, 70, 95, 60, 85, 50, 90, 65, 45].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={
                        isPlaying
                          ? { height: [`${h * 0.2}%`, `${h}%`, `${h * 0.3}%`] }
                          : { height: '20%' }
                      }
                      transition={{
                        repeat: Infinity,
                        duration: 0.5 + (i % 3) * 0.15,
                        ease: 'easeInOut',
                      }}
                      className="w-1 bg-rose-400 rounded-full"
                    />
                  ))}
                </div>
              </div>
              <span className="text-[8px] font-mono text-stone-400">TAPE COUNTER</span>
            </div>

            {/* Right Reel */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              {/* Tape Spool Outer (Grows as tape plays) */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-600 transition-all duration-300"
                style={{
                  transform: `scale(${0.75 + (currentTime / TOTAL_DURATION) * 0.25})`,
                }}
              />
              {/* Rotating Gear Wheel */}
              <motion.div
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-8 h-8 rounded-full border-2 border-dashed border-white/80 bg-stone-200 flex items-center justify-center shadow-sm z-10"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-[#1c181a] border border-stone-400" />
              </motion.div>
            </div>
          </div>

          {/* Cassette Label Footer */}
          <div className="mt-2 text-center">
            <p className="text-[11px] font-handwriting text-slate-700 font-bold tracking-wider">
              &quot;All my love recorded just for you ❤️&quot;
            </p>
          </div>
        </div>

        {/* Cassette Bottom Trapezoid cut */}
        <div className="w-24 h-3 mx-auto mt-2 bg-stone-800 rounded-t-sm border-t border-stone-600" />
      </div>

      {/* Audio Progress Bar & Time */}
      <div className="w-full max-w-[340px] mt-4 px-2">
        <div className="relative w-full h-2.5 bg-pink-200/70 rounded-full overflow-hidden mb-1.5 cursor-pointer">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-400 to-[#d32f2f] rounded-full"
            style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-xs font-mono font-semibold text-slate-600">
          <span>{formatTime(currentTime)}</span>
          <span className="text-[#d32f2f] flex items-center gap-1">
            {isPlaying && <Mic className="w-3 h-3 animate-pulse text-[#d32f2f]" />}
            {currentTime === 0 ? 'Ready' : isPlaying ? 'Playing' : 'Paused'}
          </span>
          <span>{formatTime(TOTAL_DURATION)}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-4 mt-4">
        {/* Restart Button */}
        <button
          onClick={handleRestart}
          className="p-3 rounded-full bg-white text-slate-600 hover:text-[#d32f2f] shadow-sm border border-pink-200 active:scale-95 transition-all"
          title="Restart audio"
          aria-label="Restart audio"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Big Play / Pause Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-[#d32f2f] text-white shadow-lg shadow-red-500/30 flex items-center justify-center transition-all cursor-pointer"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
        </motion.button>

        {/* Transcript Toggle */}
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="p-3 rounded-full bg-white text-slate-600 hover:text-[#d32f2f] shadow-sm border border-pink-200 active:scale-95 transition-all text-xs font-semibold"
          title="Show message transcript"
          aria-label="Toggle transcript"
        >
          Text
        </button>
      </div>

      {/* Message Transcript Card */}
      {showTranscript && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[340px] mt-4 p-3.5 rounded-2xl bg-white/95 border border-pink-200 shadow-md text-left text-xs leading-relaxed text-slate-700"
        >
          <p className="font-bold text-[#d32f2f] mb-1 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5" /> Recording Transcript:
          </p>
          <p className="italic text-slate-600 font-serif">
            &quot;Hey lovely... Just a little voice note to remind you how much you mean to me. Every moment with you feels like home. I hope this surprise brings a smile to your face! Proceed ahead, my love.&quot;
          </p>
        </motion.div>
      )}

      {/* Proceed Button */}
      <div className="mt-6 w-full max-w-[340px]">
        <motion.button
          onClick={handleProceed}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full py-3.5 px-6 rounded-full font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
            hasCompleted || currentTime > 5
              ? 'bg-[#d32f2f] text-white shadow-red-500/20 hover:bg-[#b71c1c]'
              : 'bg-white text-[#d32f2f] border-2 border-[#d32f2f] hover:bg-pink-50'
          }`}
        >
          <span>Continue to letter</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
