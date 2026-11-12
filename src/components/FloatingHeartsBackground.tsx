import React, { useMemo } from 'react';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const FloatingHeartsBackground: React.FC = () => {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2, // 2% to 98%
      size: Math.floor(Math.random() * 12) + 10, // 10px to 22px
      duration: Math.random() * 10 + 16, // 16s to 26s
      delay: Math.random() * 8, // 0s to 8s
      opacity: Math.random() * 0.18 + 0.08, // subtle, graceful
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 text-rose-400"
          style={{
            left: `${p.left}%`,
            opacity: p.opacity,
            animation: `floatUpward ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes floatUpward {
          0% {
            transform: translateY(20px) scale(0.8) rotate(0deg);
          }
          50% {
            transform: translateY(-50vh) scale(1) rotate(15deg);
          }
          100% {
            transform: translateY(-105vh) scale(0.9) rotate(-10deg);
          }
        }
      `}</style>
    </div>
  );
};
