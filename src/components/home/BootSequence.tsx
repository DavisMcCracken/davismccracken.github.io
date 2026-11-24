import { useEffect, useRef } from 'react';

const lines = [
  ['$', 'whoami'],
  ['›', 'davis mccracken'],
  ['$', 'where'],
  ['›', 'louisville, ky · ronald mcdonald house'],
  ['$', 'cat ./now.txt'],
  ['›', 'building a churn model · cleaning a 2009 export · drinking coffee'],
];

export default function BootSequence() {
  const transcript = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches || !transcript.current) return;

    const animations = Array.from(transcript.current.children, (line, index) =>
      line.animate([{ opacity: 0 }, { opacity: 1 }], {
        delay: index * 140,
        duration: 160,
        easing: 'ease-out',
        fill: 'backwards',
      }),
    );
    const stop = () => animations.forEach((animation) => animation.cancel());
    reducedMotion.addEventListener('change', stop, { once: true });
    return () => {
      stop();
      reducedMotion.removeEventListener('change', stop);
    };
  }, []);

  return (
    <div ref={transcript} aria-hidden="true" className="my-7 space-y-0.5 border-l border-accent/30 pl-4 font-mono text-xs leading-relaxed text-fg-dim sm:text-[0.8125rem]">
      {lines.map(([prompt, text]) => (
        <div key={text} className="flex gap-2">
          <span className={`w-3 shrink-0 select-none ${prompt === '$' ? 'text-accent' : 'text-muted'}`}>{prompt}</span>
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}
