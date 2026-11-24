import { useEffect, useRef } from 'react';

const glyphs = '01·▸→§░.,;:/\\<>{}[]=+-';

export default function AsciiRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const draw = () => {
      if (reducedMotion.matches) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const { color, fontFamily } = getComputedStyle(canvas);
      canvas.width = width;
      canvas.height = height;
      context.fillStyle = color;
      context.font = `12px ${fontFamily}`;

      for (let x = 12; x < width; x += 48) {
        const glyph = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
        context.fillText(glyph, x, Math.random() * height);
      }
    };

    draw();
    // Drift once, then leave a still backdrop instead of redrawing indefinitely.
    const drift = reducedMotion.matches ? undefined : canvas.animate(
      [{ transform: 'translateY(-3rem)' }, { transform: 'translateY(0)' }],
      { duration: 4000 },
    );
    const updateMotion = () => {
      if (reducedMotion.matches) drift?.cancel();
      else draw();
    };

    reducedMotion.addEventListener('change', updateMotion);
    window.addEventListener('resize', draw);
    return () => {
      drift?.cancel();
      reducedMotion.removeEventListener('change', updateMotion);
      window.removeEventListener('resize', draw);
    };
  }, []);

  return (
    <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 hidden h-full w-full font-mono text-accent opacity-[0.08] motion-safe:block" />
  );
}
