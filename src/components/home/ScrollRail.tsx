import { useEffect, useState } from 'react';

const sections = [
  ['top', 'index'],
  ['work', 'work'],
  ['about', 'about'],
  ['now', 'currently'],
  ['links', 'links'],
  ['contact', 'contact'],
] as const;

export default function ScrollRail() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const landmarks = sections.map(([id]) => document.getElementById(id));
    const root = document.documentElement;

    const update = () => {
      if (!motion.matches) return;
      const distance = root.scrollHeight - root.clientHeight;
      const scrollTop = window.scrollY;
      setProgress(distance > 0 ? Math.round(Math.min(1, Math.max(0, scrollTop / distance)) * 100) : 0);

      // The final section may not reach the reading line before the page ends.
      if (distance > 0 && scrollTop >= distance - 1) {
        setActive(sections.length - 1);
        return;
      }
      const threshold = root.clientHeight * 0.35;
      let current = 0;
      for (let i = 1; i < landmarks.length; i++) {
        const landmark = landmarks[i];
        if (landmark && landmark.getBoundingClientRect().top <= threshold) current = i;
      }
      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    motion.addEventListener('change', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  if (progress === null) return null;

  return (
    <nav aria-label="On this page" className="fixed top-1/2 left-8 z-10 hidden -translate-y-1/2 font-mono text-xs motion-safe:xl:block">
      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-4 left-[1.875rem] w-px bg-line-strong/60">
          <div className="h-full origin-top bg-accent/45" style={{ transform: `scaleY(${progress / 100})` }}></div>
        </div>
        <ol className="relative">
          {sections.map(([id, label], index) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={index === active ? 'location' : undefined}
                className="group grid grid-cols-[1.25rem_0.75rem_auto] items-center gap-1 rounded-sm py-2 text-fg-dim/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span aria-hidden="true" className="text-right tabular-nums group-aria-[current=location]:text-accent">0{index + 1}</span>
                <span aria-hidden="true" className="size-1.5 justify-self-center rounded-full border border-line-strong bg-bg group-hover:border-accent group-focus-visible:border-accent group-aria-[current=location]:border-accent group-aria-[current=location]:bg-accent"></span>
                <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-aria-[current=location]:opacity-100">{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
      <span aria-hidden="true" className="mt-3 block pl-6 text-fg-dim/80 tabular-nums">{progress}%</span>
    </nav>
  );
}
