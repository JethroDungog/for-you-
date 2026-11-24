'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Wand2, Eye } from 'lucide-react';
import { playClickSound, playSuccessChime } from '@/lib/soundEffects';
import { fireHeartConfetti } from '@/lib/confetti';

interface Step3PuzzleProps {
  onNext: () => void;
}

// 4-piece jigsaw (2x2) drag and drop onto target slots
interface Piece {
  id: number;
  label: string;
  correctSlot: number;
  bgPos: string;
}

const PIECES: Piece[] = [
  { id: 0, label: 'Piece 1 (Top Left)', correctSlot: 0, bgPos: '0% 0%' },
  { id: 1, label: 'Piece 2 (Top Right)', correctSlot: 1, bgPos: '100% 0%' },
  { id: 2, label: 'Piece 3 (Bottom Left)', correctSlot: 2, bgPos: '0% 100%' },
  { id: 3, label: 'Piece 4 (Bottom Right)', correctSlot: 3, bgPos: '100% 100%' },
];

export default function Step3Puzzle({ onNext }: Step3PuzzleProps) {
  // slots[i] holds the pieceId placed in slot i (null if empty)
  const [slots, setSlots] = useState<(number | null)[]>([null, null, null, null]);
  // Tray contains pieces not yet placed in a slot
  const [trayPieces, setTrayPieces] = useState<number[]>([2, 0, 3, 1]); // Scrambled initial tray
  const [isSolved, setIsSolved] = useState(false);
  const [draggedPieceId, setDraggedPieceId] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Check victory condition
  const checkVictory = (currentSlots: (number | null)[]) => {
    const allFilled = currentSlots.every((pId, idx) => pId === idx);
    if (allFilled) {
      setIsSolved(true);
      playSuccessChime();
      fireHeartConfetti();
      setTimeout(() => {
        onNext();
      }, 1500);
    }
  };

  const handleDragStart = (pieceId: number) => {
    setDraggedPieceId(pieceId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnSlot = (slotIdx: number) => {
    if (draggedPieceId === null) return;
    playClickSound();

    const previousPieceInSlot = slots[slotIdx];

    // Remove dragged piece from tray and previous slot if any
    const newTray = trayPieces.filter((id) => id !== draggedPieceId);
    if (previousPieceInSlot !== null && previousPieceInSlot !== draggedPieceId) {
      newTray.push(previousPieceInSlot);
    }

    const newSlots = [...slots];
    // If it was already in another slot, clear that slot
    const prevSlotIdx = newSlots.indexOf(draggedPieceId);
    if (prevSlotIdx !== -1) {
      newSlots[prevSlotIdx] = null;
    }

    newSlots[slotIdx] = draggedPieceId;

    setSlots(newSlots);
    setTrayPieces(newTray);
    setDraggedPieceId(null);

    checkVictory(newSlots);
  };

  const handleReturnToTray = (pieceId: number) => {
    playClickSound();
    const newSlots = slots.map((p) => (p === pieceId ? null : p));
    setSlots(newSlots);
    if (!trayPieces.includes(pieceId)) {
      setTrayPieces([...trayPieces, pieceId]);
    }
  };

  // Instant solve helper button
  const handleAutoSolve = () => {
    playClickSound();
    const solvedSlots = [0, 1, 2, 3];
    setSlots(solvedSlots);
    setTrayPieces([]);
    checkVictory(solvedSlots);
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
        🔓 Photo Puzzle
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-4 font-medium">
        Drag the picture pieces into the matching slots!
      </p>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-2 mb-4 w-full">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 text-xs font-semibold shadow-sm border border-pink-200 transition-all cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
        </button>
      </div>

      {/* Preview Box Modal Overlay */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-2 bg-white rounded-2xl shadow-lg border border-pink-200 flex flex-col items-center"
        >
          <div
            className="w-44 h-44 rounded-xl bg-cover bg-center border border-pink-100"
            style={{ backgroundImage: 'url(/puzzle-photo.jpg)' }}
          />
          <span className="text-[11px] font-semibold text-slate-400 mt-1">Full Picture Preview</span>
        </motion.div>
      )}

      {/* TARGET BOARD (2x2 Grid) */}
      <div className="relative p-3 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-4 border-pink-200/90 mb-5">
        <div className="grid grid-cols-2 gap-2 w-64 h-64 sm:w-72 sm:h-72">
          {[0, 1, 2, 3].map((slotIdx) => {
            const pieceId = slots[slotIdx];
            const piece = pieceId !== null ? PIECES.find((p) => p.id === pieceId) : null;
            const isCorrect = pieceId === slotIdx;

            return (
              <div
                key={slotIdx}
                onDragOver={handleDragOver}
                onDrop={() => handleDropOnSlot(slotIdx)}
                onClick={() => {
                  if (draggedPieceId !== null) handleDropOnSlot(slotIdx);
                }}
                className={`relative rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-200 select-none ${
                  piece
                    ? isCorrect
                      ? 'border-emerald-400 shadow-md ring-2 ring-emerald-200'
                      : 'border-rose-300 ring-2 ring-rose-200'
                    : 'border-pink-300/80 bg-pink-50/50 hover:bg-pink-100/60 hover:border-pink-400'
                }`}
              >
                {piece ? (
                  <div
                    draggable
                    onDragStart={() => handleDragStart(piece.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReturnToTray(piece.id);
                    }}
                    title="Drag to change slot, or click to send back to tray"
                    className="w-full h-full cursor-grab active:cursor-grabbing bg-cover bg-no-repeat relative group"
                    style={{
                      backgroundImage: 'url(/puzzle-photo.jpg)',
                      backgroundSize: '200% 200%',
                      backgroundPosition: piece.bgPos,
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-pink-300">
                    <span className="text-xs font-bold">Slot {slotIdx + 1}</span>
                    <span className="text-[10px] text-pink-300/70">Drop here</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Solved celebration overlay */}
        <AnimatePresence>
          {isSolved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center z-20"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 shadow">
                <Heart className="w-8 h-8 fill-emerald-500 text-emerald-500 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-800">You did it! ❤️</h3>
              <p className="text-xs font-medium text-emerald-600">Unlocking next step...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PIECE TRAY (Draggable Pieces not yet slotted) */}
      <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl p-3 border border-pink-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#d32f2f]" />
            <span>Puzzle Pieces (Drag into slots)</span>
          </span>
          <span className="text-[11px] font-semibold text-rose-500">
            {trayPieces.length} remaining
          </span>
        </div>

        {trayPieces.length === 0 && !isSolved ? (
          <p className="text-xs text-slate-400 py-3">All pieces are placed in the slots!</p>
        ) : (
          <div className="flex items-center justify-center gap-2.5 min-h-[70px]">
            {trayPieces.map((pId) => {
              const piece = PIECES[pId];
              return (
                <div
                  key={pId}
                  draggable
                  onDragStart={() => handleDragStart(piece.id)}
                  onClick={() => {
                    // Quick-slot on click into first empty slot
                    const firstEmpty = slots.indexOf(null);
                    if (firstEmpty !== -1) {
                      setDraggedPieceId(piece.id);
                      handleDropOnSlot(firstEmpty);
                    }
                  }}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl border-2 border-pink-300 shadow-md cursor-grab active:cursor-grabbing hover:scale-105 active:scale-95 transition-transform bg-cover bg-no-repeat overflow-hidden relative"
                  style={{
                    backgroundImage: 'url(/puzzle-photo.jpg)',
                    backgroundSize: '200% 200%',
                    backgroundPosition: piece.bgPos,
                  }}
                  title="Drag onto a slot or click to place"
                />
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
