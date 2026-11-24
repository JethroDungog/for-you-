'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, RotateCcw, Volume2, Film } from 'lucide-react';
import { playClickSound } from '@/lib/soundEffects';

interface Step5VideoMessageProps {
  onNext: () => void;
}

export default function Step5VideoMessage({ onNext }: Step5VideoMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    playClickSound();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleRestart = () => {
    playClickSound();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
    setHasEnded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto flex flex-col items-center text-center px-4 py-4"
    >
      {/* Icon Badge */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="w-14 h-14 rounded-full bg-white/90 text-[#d32f2f] flex items-center justify-center mb-2 shadow-md border border-pink-200/80"
      >
        <Film className="w-7 h-7" />
      </motion.div>

      {/* Main Heading */}
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800 mb-1">
        A Special Video For You
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-4 font-medium">
        Watch this moment from my heart to yours ❤️
      </p>

      {/* Video Container Box (Landscape 16/9 with contain to view entire video) */}
      <div className="w-full relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black/95 aspect-video flex items-center justify-center group">
        <video
          ref={videoRef}
          src="/gf-video.mp4"
          playsInline
          className="w-full h-full object-contain"
          onEnded={() => {
            setIsPlaying(false);
            setHasEnded(true);
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Floating Heart Sticker */}
        <div className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/70 backdrop-blur-sm shadow">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
        </div>

        {/* Play/Pause Overlay Overlay Button */}
        <button
          onClick={togglePlay}
          className={`absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-opacity ${
            isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
          }`}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <div className="w-16 h-16 rounded-full bg-[#d32f2f]/90 hover:bg-[#d32f2f] text-white flex items-center justify-center shadow-xl transform transition-transform hover:scale-110 active:scale-95">
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-white" />
            ) : (
              <Play className="w-8 h-8 fill-white translate-x-0.5" />
            )}
          </div>
        </button>
      </div>

      {/* Video Controls / Status Bar */}
      <div className="flex items-center justify-between w-full mt-3 px-2">
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#d32f2f] transition-colors py-1 px-2.5 rounded-full bg-white/80 border border-pink-200 shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay</span>
        </button>

        <div className="flex items-center gap-1 text-xs text-rose-600 font-medium">
          <Volume2 className="w-3.5 h-3.5 animate-bounce" />
          <span>Sound on</span>
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-4 w-full">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            playClickSound();
            if (videoRef.current) videoRef.current.pause();
            onNext();
          }}
          className="w-full py-3.5 px-6 rounded-full bg-[#d32f2f] text-white font-bold text-base shadow-md shadow-red-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>Continue</span>
          <Heart className="w-4 h-4 fill-white" />
        </motion.button>
      </div>
    </motion.div>
  );
}
