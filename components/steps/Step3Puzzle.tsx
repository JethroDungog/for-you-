'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shuffle, Eye, Wand2, CheckCircle, Heart } from 'lucide-react';
import { playClickSound, playSuccessChime } from '@/lib/soundEffects';
import { fireHeartConfetti } from '@/lib/confetti';

interface Step3PuzzleProps {
  onNext: () => void;
}

// 3x3 Grid definitions
const GRID_SIZE = 3;
const TOTAL_TILES = 9;
const EMPTY_INDEX = 8; // The 9th slot is empty

// Romantic couple artwork SVG data URI
const COUPLE_IMAGE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450" width="450" height="450">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff9a9e" />
      <stop offset="50%" stop-color="#fecfef" />
      <stop offset="100%" stop-color="#a1c4fd" />
    </linearGradient>
    <radialGradient id="sunGlow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#fff8e7" stop-opacity="0.9" />
      <stop offset="60%" stop-color="#ffb199" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#ff9a9e" stop-opacity="0" />
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#880e4f" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Sky & Sunset Background -->
  <rect width="450" height="450" fill="url(#skyGrad)"/>
  <circle cx="225" cy="200" r="140" fill="url(#sunGlow)"/>

  <!-- Romantic Fairy Lights Garland -->
  <path d="M 0 50 Q 110 90 225 60 T 450 70" fill="none" stroke="#fff9e6" stroke-width="2" opacity="0.7"/>
  <circle cx="60" cy="68" r="5" fill="#fff" filter="drop-shadow(0 0 6px #fff)"/>
  <circle cx="120" cy="80" r="6" fill="#ffe082" filter="drop-shadow(0 0 6px #ffd54f)"/>
  <circle cx="190" cy="68" r="5" fill="#fff" filter="drop-shadow(0 0 6px #fff)"/>
  <circle cx="270" cy="62" r="6" fill="#ffe082" filter="drop-shadow(0 0 6px #ffd54f)"/>
  <circle cx="350" cy="65" r="5" fill="#fff" filter="drop-shadow(0 0 6px #fff)"/>
  <circle cx="410" cy="72" r="6" fill="#ffe082" filter="drop-shadow(0 0 6px #ffd54f)"/>

  <!-- Distant Mountains / Twilight Cityscape -->
  <path d="M 0 320 Q 90 290 180 325 T 360 305 Q 410 325 450 315 L 450 450 L 0 450 Z" fill="#e88ba5" opacity="0.6"/>
  <path d="M 0 350 Q 120 330 240 360 T 450 340 L 450 450 L 0 450 Z" fill="#d86f8a" opacity="0.7"/>

  <!-- Romantic Couple Silhouette Illustration -->
  <g filter="url(#shadow)">
    <!-- Couple Bodies hugging -->
    <path d="M 175 450 C 170 370 190 320 205 280 C 190 280 180 260 180 240 C 180 215 195 200 210 200 C 220 200 228 206 232 215 C 236 206 245 200 255 200 C 270 200 285 215 285 240 C 285 260 275 280 260 280 C 275 320 295 370 290 450 Z" fill="#5c1d2e"/>

    <!-- Male Silhouette Details -->
    <circle cx="208" cy="225" r="26" fill="#4a1523"/>
    <path d="M 188 220 C 188 200 205 190 225 195 C 225 210 205 215 188 220 Z" fill="#3a101b"/>

    <!-- Female Silhouette Details with long hair -->
    <circle cx="254" cy="230" r="24" fill="#4a1523"/>
    <path d="M 250 205 C 265 205 285 215 285 245 C 285 280 270 310 268 335 C 255 310 252 265 250 205 Z" fill="#3a101b"/>

    <!-- Gentle Embrace Arm -->
    <path d="M 205 280 Q 240 290 260 275" fill="none" stroke="#4a1523" stroke-width="16" stroke-linecap="round"/>
  </g>

  <!-- Floating Hearts around couple -->
  <path d="M 225 160 C 225 150 215 140 205 145 C 195 150 195 165 225 185 C 255 165 255 150 245 145 C 235 140 225 150 225 160 Z" fill="#ff4081" opacity="0.9"/>
  <path d="M 285 140 C 285 133 278 126 270 130 C 263 133 263 144 285 158 C 307 144 307 133 300 130 C 292 126 285 133 285 140 Z" fill="#ff79b0" opacity="0.8"/>
  <path d="M 165 145 C 165 139 159 133 152 136 C 146 139 146 148 165 161 C 184 148 184 139 178 136 C 171 133 165 139 165 145 Z" fill="#ff79b0" opacity="0.8"/>

  <!-- Sparkling Stars -->
  <circle cx="90" cy="180" r="2.5" fill="#fff" opacity="0.8"/>
  <circle cx="360" cy="190" r="3" fill="#fff" opacity="0.9"/>
  <circle cx="330" cy="110" r="2" fill="#fff" opacity="0.7"/>
  <circle cx="130" cy="100" r="2.5" fill="#fff" opacity="0.8"/>

  <!-- Romantic Typography Overlaid -->
  <text x="225" y="415" font-family="'Playfair Display', Georgia, serif" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="1">
    YOU &amp; ME
  </text>
  <text x="225" y="435" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#ffebee" text-anchor="middle" letter-spacing="3" opacity="0.9">
    OUR FAVORITE CHAPTER
  </text>
</svg>
`)}`;

export default function Step3Puzzle({ onNext }: Step3PuzzleProps) {
  // Board stores tile values 0..8 at positions 0..8
  const [board, setBoard] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [isSolved, setIsSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  // Check if position is adjacent to empty tile
  const isAdjacent = (indexA: number, indexB: number) => {
    const rowA = Math.floor(indexA / GRID_SIZE);
    const colA = indexA % GRID_SIZE;
    const rowB = Math.floor(indexB / GRID_SIZE);
    const colB = indexB % GRID_SIZE;
    return Math.abs(rowA - rowB) + Math.abs(colA - colB) === 1;
  };

  // Perform a solvable shuffle (5-8 valid neighbor moves from solved state)
  const shuffleBoard = useCallback(() => {
    let currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let emptyPos = 8;
    let lastPos = -1;

    // 7 valid moves ensures quick, delightfully solvable puzzle
    for (let step = 0; step < 7; step++) {
      const neighbors: number[] = [];
      const row = Math.floor(emptyPos / GRID_SIZE);
      const col = emptyPos % GRID_SIZE;

      if (row > 0) neighbors.push(emptyPos - 3);
      if (row < 2) neighbors.push(emptyPos + 3);
      if (col > 0) neighbors.push(emptyPos - 1);
      if (col < 2) neighbors.push(emptyPos + 1);

      // Avoid immediately undoing previous move
      const validMoves = neighbors.filter((n) => n !== lastPos);
      const chosen = validMoves.length > 0
        ? validMoves[Math.floor(Math.random() * validMoves.length)]
        : neighbors[0];

      // Swap
      currentBoard[emptyPos] = currentBoard[chosen];
      currentBoard[chosen] = 8;
      lastPos = emptyPos;
      emptyPos = chosen;
    }

    setBoard(currentBoard);
    setIsSolved(false);
    setMoves(0);
  }, []);

  // Initial shuffle on mount
  useEffect(() => {
    shuffleBoard();
  }, [shuffleBoard]);

  // Handle tile tap
  const handleTileClick = (positionIndex: number) => {
    if (isSolved) return;

    const emptyPos = board.indexOf(EMPTY_INDEX);
    if (!isAdjacent(positionIndex, emptyPos)) return;

    playClickSound();

    const newBoard = [...board];
    newBoard[emptyPos] = board[positionIndex];
    newBoard[positionIndex] = EMPTY_INDEX;

    setBoard(newBoard);
    setMoves((m) => m + 1);

    // Check if solved
    const allCorrect = newBoard.every((val, idx) => val === idx);
    if (allCorrect) {
      handleComplete();
    }
  };

  // Auto-solve helper
  const handleAutoSolve = () => {
    playClickSound();
    setBoard([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    handleComplete();
  };

  const handleComplete = () => {
    setIsSolved(true);
    playSuccessChime();
    fireHeartConfetti();
    setTimeout(() => {
      onNext();
    }, 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-sm mx-auto flex flex-col items-center text-center px-4 py-3"
    >
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800 mb-1 flex items-center justify-center gap-2">
        <span>🔓 Photo puzzle</span>
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-4 font-medium">
        Slide or tap adjacent tiles to piece together our memory!
      </p>

      {/* Main Puzzle Container */}
      <div className="relative p-2.5 rounded-3xl romantic-card shadow-xl shadow-pink-200/50 mb-4 border border-pink-200/80">
        <div className="grid grid-cols-3 gap-1.5 w-[270px] h-[270px] sm:w-[290px] sm:h-[290px] rounded-2xl overflow-hidden bg-pink-100/60 p-1">
          {board.map((tileNumber, positionIndex) => {
            const isEmpty = tileNumber === EMPTY_INDEX && !isSolved;
            const originalRow = Math.floor(tileNumber / GRID_SIZE);
            const originalCol = tileNumber % GRID_SIZE;

            // Background positioning in percent: 0%, 50%, 100%
            const bgX = (originalCol / (GRID_SIZE - 1)) * 100;
            const bgY = (originalRow / (GRID_SIZE - 1)) * 100;

            if (isEmpty) {
              return (
                <div
                  key={`empty-${positionIndex}`}
                  className="rounded-xl border-2 border-dashed border-pink-300/70 bg-pink-50/50 flex items-center justify-center text-pink-300"
                >
                  <Heart className="w-5 h-5 opacity-40 animate-pulse" />
                </div>
              );
            }

            return (
              <motion.button
                key={tileNumber}
                layout
                whileTap={{ scale: 0.94 }}
                onClick={() => handleTileClick(positionIndex)}
                className={`relative rounded-xl overflow-hidden cursor-pointer shadow-sm transition-shadow focus:outline-none ${
                  isSolved ? 'ring-1 ring-emerald-400' : 'hover:shadow-md'
                }`}
                style={{
                  backgroundImage: `url("${COUPLE_IMAGE_SVG}")`,
                  backgroundSize: '300% 300%',
                  backgroundPosition: `${bgX}% ${bgY}%`,
                }}
              >
                {/* Subtle tile number indicator */}
                {!isSolved && (
                  <span className="absolute top-1 left-1.5 text-[10px] font-bold bg-white/75 text-slate-700 px-1 rounded shadow-xs">
                    {tileNumber + 1}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Solved Overlay Banner */}
        <AnimatePresence>
          {isSolved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-3xl bg-white/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 z-10"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 shadow-sm">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-800">Puzzle Solved! ❤️</h3>
              <p className="text-xs text-slate-500 mt-1">Unlocking next memory...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats and Helpers Bar */}
      <div className="flex items-center justify-between w-full max-w-[290px] text-xs text-slate-500 mb-3 px-1">
        <span className="font-semibold text-slate-600">Moves: {moves}</span>

        <div className="flex items-center gap-2">
          {/* Preview Image Toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-600 hover:text-[#d32f2f] border border-pink-200 shadow-xs transition-colors"
            title="Preview original image"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showPreview ? 'Hide' : 'Preview'}</span>
          </button>

          {/* Shuffle Button */}
          <button
            onClick={() => {
              playClickSound();
              shuffleBoard();
            }}
            disabled={isSolved}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-600 hover:text-[#d32f2f] border border-pink-200 shadow-xs transition-colors disabled:opacity-40"
            title="Shuffle puzzle"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle</span>
          </button>

          {/* Auto-Solve Helper */}
          <button
            onClick={handleAutoSolve}
            disabled={isSolved}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-100 text-[#d32f2f] hover:bg-pink-200 border border-pink-300 shadow-xs transition-colors font-medium disabled:opacity-40"
            title="Solve instantly"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Solve</span>
          </button>
        </div>
      </div>

      {/* Image Preview Modal/Drawer */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full max-w-[270px] bg-white p-2 rounded-2xl border border-pink-200 shadow-md mb-2 overflow-hidden"
          >
            <p className="text-[11px] font-semibold text-slate-500 mb-1">Target Picture:</p>
            <img
              src={COUPLE_IMAGE_SVG}
              alt="Solved Puzzle Preview"
              className="w-full h-auto rounded-lg shadow-xs"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
