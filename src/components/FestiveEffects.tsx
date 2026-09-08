import React, { useEffect, useRef } from 'react';

export const FestiveEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Floating marigold flowers / sparkles
    const items = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: Math.sin(Math.random() * Math.PI) * 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.6 + 0.3,
      color: Math.random() > 0.4 ? '#F59E0B' : '#EF4444' // Saffron & Red
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      items.forEach((item) => {
        item.y += item.speedY;
        item.x += Math.sin(item.y * 0.01) * 0.5;
        item.rotation += item.rotationSpeed;

        if (item.y > height + 20) {
          item.y = -20;
          item.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate((item.rotation * Math.PI) / 180);
        ctx.globalAlpha = item.opacity;

        // Draw 5-petal flower shape
        ctx.fillStyle = item.color;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI) / 5;
          const px = Math.cos(angle) * item.size;
          const py = Math.sin(angle) * item.size;
          ctx.arc(px, py, item.size * 0.6, 0, Math.PI * 2);
        }
        ctx.fill();

        // Center dot (yellow)
        ctx.fillStyle = '#FDE047';
        ctx.beginPath();
        ctx.arc(0, 0, item.size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-70"
    />
  );
};
