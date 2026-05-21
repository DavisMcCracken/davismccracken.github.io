// ScrollRail.jsx — left-side vertical timeline with section markers + active indicator + scroll progress
const { useEffect: useEffectSR, useState: useStateSR } = React;

const SECTIONS = [
  { id: 'top',      label: 'index'    },
  { id: 'projects', label: 'projects' },
  { id: 'photos',   label: 'photos'   },
  { id: 'about',    label: 'about'    },
  { id: 'now',      label: 'currently'},
  { id: 'links',    label: 'links'    },
  { id: 'contact',  label: 'contact'  },
];

function ScrollRail() {
  const [active, setActive] = useStateSR('top');
  const [progress, setProgress] = useStateSR(0);

  useEffectSR(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const sb = (doc.scrollTop) / Math.max(1, (doc.scrollHeight - doc.clientHeight));
      setProgress(Math.min(1, Math.max(0, sb)));

      // pick the section whose top is closest above viewport-mid
      const mid = window.scrollY + window.innerHeight * 0.35;
      let best = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= mid) best = s.id;
      }
      setActive(best);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <aside className="rail" aria-hidden="true">
      <div className="rail-track">
        <div className="rail-fill" style={{ height: `${progress * 100}%` }}></div>
      </div>
      <ul className="rail-list">
        {SECTIONS.map((s, i) => (
          <li key={s.id} className={`rail-item ${active === s.id ? 'on' : ''}`}>
            <a href={`#${s.id}`}>
              <span className="rail-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="rail-dot"></span>
              <span className="rail-lab">{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="rail-pct">
        <span>{Math.round(progress * 100)}%</span>
      </div>
    </aside>
  );
}

window.ScrollRail = ScrollRail;
