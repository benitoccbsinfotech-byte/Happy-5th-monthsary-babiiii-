/**
 * Floating heart particle burst and screen sparkles.
 * Zero-dependency pure DOM / Canvas effect for heart-shaped particles.
 */

export function triggerHeartBurst(originX?: number, originY?: number, count: number = 24) {
  const x = originX ?? window.innerWidth / 2;
  const y = originY ?? window.innerHeight / 2;

  const colors = ['#E11D48', '#F43F5E', '#FDA4AF', '#FB7185', '#E0A96D', '#BE123C'];

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    const size = Math.floor(Math.random() * 16) + 14;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    heart.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>`;

    heart.style.position = 'fixed';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.opacity = '1';
    heart.style.transform = `translate(-50%, -50%) scale(0.6)`;
    heart.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out';

    document.body.appendChild(heart);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 160 + 60;
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance - 40; // float slightly upwards
    const rotation = (Math.random() - 0.5) * 80;

    requestAnimationFrame(() => {
      heart.style.transform = `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) rotate(${rotation}deg) scale(1)`;
      heart.style.opacity = '0';
    });

    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 1300);
  }
}
