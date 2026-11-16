'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HeartParticle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

export default function FloatingHearts() {
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  useEffect(() => {
    const colors = ['#f48fb1', '#f06292', '#ff80ab', '#f8bbd0', '#ff4081'];
    const generated: HeartParticle[] = [];
    for (let i = 0; i < 18; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 16 + 12,
        duration: Math.random() * 8 + 9,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.45 + 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setParticles(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-[-40px]"
          style={{
            left: `${p.x}%`,
            color: p.color,
            fontSize: `${p.size}px`,
          }}
          initial={{ y: 0, opacity: 0, rotate: -15 }}
          animate={{
            y: '-110vh',
            opacity: [0, p.opacity, p.opacity, 0],
            rotate: [p.x % 2 === 0 ? -25 : 25, p.x % 2 === 0 ? 25 : -25],
            x: [0, (p.id % 2 === 0 ? 30 : -30), 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
