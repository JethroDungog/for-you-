'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeaderProgress from './HeaderProgress';
import FloatingHearts from './FloatingHearts';
import Step1Welcome from './steps/Step1Welcome';
import Step2Passcode from './steps/Step2Passcode';
import Step3Puzzle from './steps/Step3Puzzle';
import Step4Trivia from './steps/Step4Trivia';
import Step5VideoMessage from './steps/Step5VideoMessage';
import Step6LoveLetter from './steps/Step6LoveLetter';
import Step7SlotMachine from './steps/Step7SlotMachine';
import Step7Celebration from './steps/Step7Celebration';

export default function SurpriseApp() {
  const [step, setStep] = useState<number>(1);
  const [isGrandPrizeRevealed, setIsGrandPrizeRevealed] = useState<boolean>(false);
  const totalSteps = 7;

  const goToNextStep = () => {
    setStep((prev) => Math.min(totalSteps, prev + 1));
  };

  const handleSelectStep = (selectedStep: number) => {
    setStep(selectedStep);
  };

  const handleRestart = () => {
    setIsGrandPrizeRevealed(false);
    setStep(1);
  };

  return (
    <main className="relative min-h-screen bg-[#fce4ec] flex flex-col justify-between overflow-x-hidden">
      {/* Background Floating Hearts */}
      <FloatingHearts />

      {/* Top Header Progress Tracker */}
      <HeaderProgress
        currentStep={step}
        totalSteps={totalSteps}
        onSelectStep={handleSelectStep}
      />

      {/* Main Interactive Stage */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-2 py-4">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <Step1Welcome onNext={goToNextStep} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <Step2Passcode onNext={goToNextStep} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <Step3Puzzle onNext={goToNextStep} />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <Step4Trivia onNext={goToNextStep} />
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <Step5VideoMessage onNext={goToNextStep} />
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <Step6LoveLetter onNext={goToNextStep} />
            </motion.div>
          )}

          {step === 7 && !isGrandPrizeRevealed && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <Step7SlotMachine onNext={() => setIsGrandPrizeRevealed(true)} />
            </motion.div>
          )}

          {step === 7 && isGrandPrizeRevealed && (
            <motion.div
              key="step-7-celebration"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full"
            >
              <Step7Celebration onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
