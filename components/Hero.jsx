// Hero.jsx — three treatments: boot sequence, quiet editorial, big typographic
const { useState: useHeroState, useEffect: useHeroEffect } = React;

const HERO_COPY = {
  eyebrow: '~/davis-mccracken',
  status: 'database coordinator · ronald mcdonald house louisville',
  // body copy varies a touch per treatment but the gist is the same
  lede: "I work where the donor database meets the spreadsheet meets the script — building pipelines, automating reporting, and turning manual processes into something a Monday morning can survive.",
  ledeShort: "Database coordinator at Ronald McDonald House Louisville. I rebuild manual processes into pipelines that survive Monday mornings.",
};

// ── Boot sequence (terminal) ───────────────────────────────────────────────
const BOOT_LINES = [
  { p: '$', t: 'whoami', out: false, delay: 200 },
  { p: '›', t: 'davis mccracken', out: true,  delay: 350 },
  { p: '$', t: 'where', out: false, delay: 200 },
  { p: '›', t: 'louisville, ky · ronald mcdonald house', out: true,  delay: 350 },
  { p: '$', t: 'cat ./now.txt', out: false, delay: 200 },
  { p: '›', t: 'building a churn model · cleaning a 2009 export · drinking coffee', out: true, delay: 400 },
];

function BootSequence({ onDone }) {
  const [shown, setShown] = useHeroState(0);
  const [done, setDone] = useHeroState(false);

  useHeroEffect(() => {
    if (shown >= BOOT_LINES.length) {
      setDone(true);
      const t = setTimeout(() => onDone && onDone(), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown(s => s + 1), BOOT_LINES[shown].delay);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div className="boot" aria-hidden="true">
      {BOOT_LINES.slice(0, shown).map((l, i) => (
        <div key={i} className={`boot-line ${l.out ? 'out' : ''}`}>
          <span className="boot-prompt">{l.p}</span>
          <span>{l.t}</span>
        </div>
      ))}
      {!done && shown < BOOT_LINES.length && (
        <div className="boot-line">
          <span className="boot-prompt">{BOOT_LINES[shown] ? (BOOT_LINES[shown].out ? '›' : '$') : '$'}</span>
          <span className="boot-caret" />
        </div>
      )}
    </div>
  );
}

// ── Treatment: boot ────────────────────────────────────────────────────────
function HeroBoot() {
  const [bodyIn, setBodyIn] = useHeroState(false);
  return (
    <section className="hero hero-variant-boot" id="top">
      <div className="hero-eyebrow reveal reveal-1">
        <span>{HERO_COPY.eyebrow}</span>
        <span style={{ color: 'var(--fg-muted)' }}>·</span>
        <span>portfolio<span className="blink" /></span>
      </div>
      <BootSequence onDone={() => setBodyIn(true)} />
      {bodyIn && (
        <div className="hero-body in">
          <h1>
            Spreadsheets, <span className="hl">scripts,</span><br />
            and the <span className="accent">occasional</span> regression.
          </h1>
          <p className="lede">{HERO_COPY.lede}</p>
          <div className="hero-status">
            <span className="dot" />
            <span>{HERO_COPY.status}</span>
          </div>
        </div>
      )}
    </section>
  );
}

// ── Treatment: quiet editorial ─────────────────────────────────────────────
function HeroQuiet() {
  return (
    <section className="hero hero-variant-quiet" id="top">
      <div className="hero-eyebrow reveal reveal-1">
        <span>Davis McCracken</span>
        <span style={{ color: 'var(--fg-muted)' }}>·</span>
        <span>portfolio, 2026</span>
      </div>
      <h1 className="quiet-h1 reveal reveal-2">
        Database coordinator. <span className="quiet-em">Sometimes a scripter.</span>
      </h1>
      <p className="lede reveal reveal-3" style={{ maxWidth: '60ch' }}>
        I work at <em>Ronald McDonald House Louisville</em> — keeping the donor database
        honest, building reports that don't lie to each other, and quietly replacing
        manual processes with code that doesn't need a babysitter.
      </p>
      <div className="hero-status reveal reveal-4">
        <span className="dot" />
        <span>currently · building a churn model · open to interesting problems</span>
      </div>
    </section>
  );
}

// ── Treatment: big typographic ─────────────────────────────────────────────
function HeroBig() {
  return (
    <section className="hero hero-variant-big" id="top">
      <div className="hero-eyebrow reveal reveal-1">
        <span>{HERO_COPY.eyebrow}</span>
        <span style={{ color: 'var(--fg-muted)' }}>·</span>
        <span>portfolio<span className="blink" /></span>
      </div>
      <h1 className="big-h1 reveal reveal-2">
        <span className="big-line">Davis</span>
        <span className="big-line">McCracken<span className="big-period">.</span></span>
      </h1>
      <div className="big-meta reveal reveal-3">
        <span className="big-meta-k">role</span>
        <span className="big-meta-v">Database Coordinator</span>
        <span className="big-meta-k">at</span>
        <span className="big-meta-v">Ronald McDonald House Louisville</span>
        <span className="big-meta-k">stack</span>
        <span className="big-meta-v">Excel · Python · SQL · the occasional regression</span>
      </div>
      <p className="lede reveal reveal-4">{HERO_COPY.ledeShort}</p>
    </section>
  );
}

function Hero({ treatment }) {
  if (treatment === 'quiet') return <HeroQuiet />;
  if (treatment === 'big')   return <HeroBig />;
  return <HeroBoot />;
}

window.Hero = Hero;
