// AsciiRain.jsx — sparse ASCII characters drifting in the background
const { useEffect: useEffectRain, useRef: useRefRain } = React;

function AsciiRain({ enabled }) {
  const canvasRef = useRefRain();

  useEffectRain(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let drops = [];

    const chars = '01·▸→§░▒.,;:|/\\><{}[]()=+-*#@'.split('');
    const fontSize = 13;
    const cols = () => Math.ceil(window.innerWidth / fontSize);

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      drops = Array.from({ length: cols() }, () => ({
        y: Math.random() * window.innerHeight,
        speed: 0.15 + Math.random() * 0.4,
        char: chars[Math.floor(Math.random() * chars.length)],
        op: 0.08 + Math.random() * 0.18,
        next: Math.random() * 60,
      }));
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      drops.forEach((d, i) => {
        const x = i * fontSize;
        ctx.fillStyle = `rgba(196,167,231,${d.op})`;
        ctx.fillText(d.char, x, d.y);
        d.y += d.speed;
        d.next -= 1;
        if (d.next <= 0) {
          d.char = chars[Math.floor(Math.random() * chars.length)];
          d.next = 30 + Math.random() * 60;
        }
        if (d.y > window.innerHeight + fontSize) {
          d.y = -fontSize;
          d.op = 0.08 + Math.random() * 0.18;
        }
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <canvas ref={canvasRef} className="ascii-rain" aria-hidden="true" />;
}

window.AsciiRain = AsciiRain;
