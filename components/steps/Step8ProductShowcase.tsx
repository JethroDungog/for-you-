'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, Award, Check } from 'lucide-react';
import { playClickSound, playSuccessChime } from '@/lib/soundEffects';
import { fireGrandCelebration } from '@/lib/confetti';

interface Step8ProductShowcaseProps {
  onRestart?: () => void;
}

type MetalFinish = 'gold' | 'rose-gold' | 'silver';

export default function Step8ProductShowcase({ onRestart }: Step8ProductShowcaseProps) {
  const [selectedFinish, setSelectedFinish] = useState<MetalFinish>('gold');
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const handlePreviewComplete = () => {
    playSuccessChime();
    fireGrandCelebration();
    setShowCertificateModal(true);
  };

  const getFinishClass = () => {
    switch (selectedFinish) {
      case 'rose-gold':
        return 'rose-gold-metallic';
      case 'silver':
        return 'silver-metallic';
      case 'gold':
      default:
        return 'gold-metallic';
    }
  };

  const getFinishColorText = () => {
    switch (selectedFinish) {
      case 'rose-gold':
        return '18K Rose Gold Plated';
      case 'silver':
        return '925 Sterling Silver Plated';
      case 'gold':
      default:
        return '18K Yellow Gold Plated';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto flex flex-col items-center text-center px-4 pt-2 pb-12"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#d32f2f] text-xs font-semibold uppercase tracking-wider mb-2"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Your Customized Keepsake</span>
      </motion.div>

      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-1">
        This one is really yours.
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 mb-6 font-medium max-w-xs">
        Crafted with love to hold our sweetest memories right against your heart.
      </p>

      {/* Main Luxury Jewelry Card */}
      <div className="w-full bg-white rounded-3xl p-5 shadow-2xl shadow-pink-300/30 border border-pink-100 relative overflow-hidden text-left mb-6">
        {/* Decorative corner tag */}
        <div className="absolute top-4 right-4 bg-pink-50 border border-pink-200 text-[#d32f2f] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Heart className="w-3 h-3 fill-[#d32f2f]" /> Handcrafted for you
        </div>

        {/* Jewelry Display Window (Velvet Display) */}
        <div className="w-full h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-[#1e1e24] via-[#2d2833] to-[#1a171d] relative overflow-hidden flex flex-col items-center justify-center p-4 border border-stone-800 shadow-inner">
          {/* Subtle velvety spotlight sheen */}
          <div className="absolute inset-0 bg-radial-at-c from-white/10 via-transparent to-black/60 pointer-events-none" />

          {/* Draped delicate chain SVG */}
          <svg className="w-48 h-28 absolute top-4 pointer-events-none" viewBox="0 0 200 120">
            <path
              d="M 10 0 Q 100 120 190 0"
              fill="none"
              stroke={
                selectedFinish === 'gold'
                  ? '#ffd700'
                  : selectedFinish === 'rose-gold'
                  ? '#e0a99e'
                  : '#e2e8f0'
              }
              strokeWidth="2.5"
              strokeDasharray="4 2"
              opacity="0.9"
            />
            {/* Chain Bail Hook */}
            <circle
              cx="100"
              cy="62"
              r="4.5"
              fill="none"
              stroke={
                selectedFinish === 'gold'
                  ? '#ffd700'
                  : selectedFinish === 'rose-gold'
                  ? '#e0a99e'
                  : '#e2e8f0'
              }
              strokeWidth="2.5"
            />
          </svg>

          {/* The Monogram Necklace Pendant */}
          <motion.div
            key={selectedFinish}
            initial={{ scale: 0.9, rotateY: 90 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className={`relative w-36 h-36 rounded-full flex items-center justify-center mt-6 cursor-pointer select-none transition-all duration-300 ${getFinishClass()}`}
          >
            {/* Outer embossed ring */}
            <div className="w-[130px] h-[130px] rounded-full border-2 border-black/10 flex items-center justify-center relative">
              {/* Delicate engraved laurel garland */}
              <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r="58" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 65 10 C 65 20 60 25 50 25" fill="none" stroke="#333" strokeWidth="1.2" />
                <path d="M 65 10 C 65 20 70 25 80 25" fill="none" stroke="#333" strokeWidth="1.2" />
              </svg>

              {/* Line-Art Couple Engraving & Monogram */}
              <div className="flex flex-col items-center justify-center text-center">
                {/* Line-art couple kiss/hug outline */}
                <svg className="w-10 h-10 mb-1 opacity-70" viewBox="0 0 60 60" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 22 18 C 22 13 26 10 30 10 C 34 10 38 13 38 18 C 38 22 34 25 30 25 C 26 25 22 22 22 18 Z" />
                  <path d="M 18 48 C 18 36 24 30 30 30 C 36 30 42 36 42 48" />
                  <path d="M 25 35 Q 30 38 35 35" />
                  <path d="M 45 15 C 47 12 51 14 50 17 C 49 19 45 22 45 22 C 45 22 41 19 40 17 C 39 14 43 12 45 15 Z" fill="#b71c1c" stroke="none" />
                </svg>

                {/* Monogram Initials "R & L" */}
                <span className="font-serif font-black text-2xl tracking-widest text-[#2c1d11] drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                  R &amp; L
                </span>

                <span className="text-[9px] font-mono font-bold tracking-widest text-[#442b19]/80 uppercase mt-0.5">
                  03 • 27 • FOREVER
                </span>
              </div>
            </div>

            {/* Sparkle glint on medallion edge */}
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-2 right-4 text-white pointer-events-none drop-shadow-md"
            >
              <Sparkles className="w-4 h-4 fill-white" />
            </motion.div>
          </motion.div>

          {/* Finish selector tabs over velvet */}
          <div className="absolute bottom-3 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <button
              onClick={() => {
                playClickSound();
                setSelectedFinish('gold');
              }}
              className={`w-6 h-6 rounded-full gold-metallic border-2 transition-transform ${
                selectedFinish === 'gold' ? 'border-white scale-110 shadow-md ring-2 ring-yellow-400' : 'border-transparent opacity-75'
              }`}
              title="18K Yellow Gold"
            />
            <button
              onClick={() => {
                playClickSound();
                setSelectedFinish('rose-gold');
              }}
              className={`w-6 h-6 rounded-full rose-gold-metallic border-2 transition-transform ${
                selectedFinish === 'rose-gold' ? 'border-white scale-110 shadow-md ring-2 ring-rose-300' : 'border-transparent opacity-75'
              }`}
              title="18K Rose Gold"
            />
            <button
              onClick={() => {
                playClickSound();
                setSelectedFinish('silver');
              }}
              className={`w-6 h-6 rounded-full silver-metallic border-2 transition-transform ${
                selectedFinish === 'silver' ? 'border-white scale-110 shadow-md ring-2 ring-slate-300' : 'border-transparent opacity-75'
              }`}
              title="Sterling Silver"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-4">
          <p className="text-xs font-semibold tracking-wider text-[#d32f2f] uppercase mb-0.5">
            Rarz &amp; Lovely
          </p>
          <div className="flex justify-between items-center">
            <h3 className="font-serif font-bold text-2xl text-slate-800">
              Monogram Necklace
            </h3>
            <span className="font-sans font-bold text-xs text-[#d32f2f] bg-pink-50 px-3 py-1 rounded-full border border-pink-200 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-[#d32f2f]" /> With All My Love
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-1 font-medium">
            Finish: <span className="font-semibold text-slate-700">{getFinishColorText()}</span>
          </p>

          {/* Key Features List */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Laser &quot;R &amp; L&quot; Engraving</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Non-Tarnish &amp; Waterproof</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Hypoallergenic 316L Core</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Luxury Keepsake Box</span>
            </div>
          </div>
        </div>

        {/* Preview Complete Button */}
        <div className="mt-5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePreviewComplete}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-red-500/20"
          >
            <Award className="w-4 h-4" />
            <span>Preview complete</span>
          </motion.button>
        </div>
      </div>

      {/* Restart / Relive Option */}
      {onRestart && (
        <button
          onClick={() => {
            playClickSound();
            onRestart();
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#d32f2f] transition-colors py-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Relive our surprise journey from the start</span>
        </button>
      )}

      {/* Footer Branding Watermark */}
      <footer className="mt-6 pt-4 border-t border-pink-200/60 w-full text-center">
        <p className="text-xs font-bold tracking-widest text-[#d32f2f]/80 uppercase inline-flex items-center gap-1">
          <span>Forever &amp; Always • Rarz &amp; Lovely</span>
          <Heart className="w-3.5 h-3.5 fill-[#d32f2f] text-[#d32f2f]" />
        </p>
        <p className="text-[11px] text-slate-400 mt-1 font-serif italic">
          &quot;Crafted with immense love for the most special girl in my world.&quot;
        </p>
      </footer>

      {/* Celebration Modal when "Preview Complete" is clicked */}
      <AnimatePresence>
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full text-center relative border border-pink-200 shadow-2xl"
            >
              <div className="w-14 h-14 rounded-full bg-pink-100 text-[#d32f2f] mx-auto flex items-center justify-center mb-3">
                <Heart className="w-8 h-8 fill-[#d32f2f]" />
              </div>

              <h3 className="font-serif font-bold text-2xl text-slate-900 mb-1">
                You Made It, Lovely! ❤️
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                You unlocked our anniversary, solved our puzzle, remembered where we met, heard my tape, and read my letter. This necklace is physically yours!
              </p>

              <div className="bg-pink-50 p-3.5 rounded-2xl border border-pink-200 mb-5 text-left text-xs">
                <p className="font-bold text-[#d32f2f] mb-1">Our Journey Summary:</p>
                <ul className="space-y-1 text-slate-700">
                  <li>🗓️ Anniversary: <strong>March 27 (0327)</strong></li>
                  <li>⛪ First Met: <strong>Simbahan / Church</strong></li>
                  <li>💌 Words: <em>&quot;I&apos;m in love with you and all your little things.&quot;</em></li>
                  <li>🎁 Keepsake: <strong>R &amp; L Monogram Necklace</strong></li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="w-full py-3.5 px-4 rounded-full bg-[#d32f2f] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:bg-[#b71c1c] active:scale-95"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>I love you forever, Lovely ❤️</span>
                </button>

                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="w-full py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
