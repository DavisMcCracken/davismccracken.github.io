// Projects.jsx — spreadsheet-inspired projects table with expandable rows
const { useState, useEffect, useRef } = React;

const PROJECTS = [
  {
    id: 'sales-revamp',
    title: 'Sales-for revamp',
    summary: 'End-to-end automation of a manual sales-tracking process — from intake through reporting.',
    kind: 'excel',
    kindLabel: 'excel · vba',
    year: '2024',
    detail: "A full audit and rebuild of a sales process that lived across a tangle of workbooks. Replaced manual copy-paste with a single source of truth, parameterized inputs, and reporting that updates on save. The team got their afternoons back.",
    impact: [
      ['runtime', 'manual half-day → 90s'],
      ['inputs', '7 workbooks → 1 model'],
      ['errors', 'eliminated ~12 reconciliation breaks / month'],
    ],
    stack: ['Excel', 'Power Query', 'VBA', 'Pivot models'],
  },
  {
    id: 'is-pipeline',
    title: 'Donations data pipeline',
    summary: 'Standardized cleaning, loading, processing, and reporting for the full donations intake.',
    kind: 'code',
    kindLabel: 'python · sql',
    year: '2024',
    detail: "Audited every touchpoint where donation data entered the org and rebuilt the path. Standardized schemas, idempotent loads, automated dedup, and downstream reports that stopped disagreeing with each other. The work that pays for the algorithm work below.",
    impact: [
      ['intake sources', 'unified 5 disparate feeds'],
      ['load', 'nightly, idempotent, observable'],
      ['quality', 'duplicate rate < 0.1%'],
    ],
    stack: ['Python', 'pandas', 'SQL', 'Airflow-ish'],
  },
  {
    id: 'churn-model',
    title: 'Churn & high-value prediction',
    summary: 'Statistical models to flag donors at risk of lapsing and identify high-potential prospects.',
    kind: 'algo',
    kindLabel: 'stats · regression',
    year: '2025',
    detail: "Logistic regression for churn probability, a separate model for high-value prospect scoring. Engineered features from giving cadence, channel, and engagement history. Output feeds directly into the development team's outreach queue — not a deck that gets forgotten.",
    impact: [
      ['churn AUC', '0.84 on holdout'],
      ['prospect lift', 'top decile gives 6× baseline'],
      ['shipped', 'in production, refreshed monthly'],
    ],
    stack: ['Python', 'scikit-learn', 'statsmodels', 'matplotlib'],
  },
];

const KIND_LABEL = { excel: 'EXCEL', code: 'CODE', algo: 'ALGO' };

// A small animated number that ticks up when first seen.
function CountUp({ value, suffix = '', duration = 800 }) {
  const [n, setN] = useState(0);
  const ref = useRef();
  useEffect(() => {
    let raf, start;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const tick = (ts) => {
          if (!start) start = ts;
          const t = Math.min(1, (ts - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(value * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => { obs.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [value]);
  const display = Number.isInteger(value) ? Math.round(n) : n.toFixed(2);
  return <span ref={ref} className="countup">{display}{suffix}</span>;
}

function ProjectsSheet({ density }) {
  const [open, setOpen] = useState(null);
  const [hover, setHover] = useState(null);
  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <section className="section" id="projects">
      <div className="section-head">
        <h2>projects</h2>
        <span className="meta">{PROJECTS.length} rows · click to expand</span>
      </div>
      <p className="section-intro">
        Things I've built at work and on weekends. Every row is something that
        actually shipped, not a sketch.
      </p>

      {/* Stat strip — animated counters */}
      <div className="stat-strip">
        <div className="stat">
          <span className="stat-num"><CountUp value={3} /></span>
          <span className="stat-lab">shipped projects</span>
        </div>
        <div className="stat">
          <span className="stat-num"><CountUp value={0.84} /></span>
          <span className="stat-lab">best model AUC</span>
        </div>
        <div className="stat">
          <span className="stat-num"><CountUp value={6} suffix="×" /></span>
          <span className="stat-lab">top-decile lift</span>
        </div>
        <div className="stat">
          <span className="stat-num"><CountUp value={12} /></span>
          <span className="stat-lab">monthly errors removed</span>
        </div>
      </div>

      {/* Spreadsheet-style table (default) */}
      <div className="sheet" role="table" aria-label="Projects">
        <div className="sheet-row head" role="row">
          <div className="cell idx">#</div>
          <div className="cell title">project</div>
          <div className="cell kind">kind</div>
          <div className="cell year">year</div>
        </div>
        {PROJECTS.map((p, i) => (
          <React.Fragment key={p.id}>
            <div
              className={`sheet-row proj${open === p.id ? ' expanded' : ''}${hover === p.id ? ' hov' : ''}`}
              role="row"
              onClick={() => toggle(p.id)}
              onMouseEnter={() => setHover(p.id)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="cell idx">{String(i + 1).padStart(2, '0')}</div>
              <div className="cell title">
                <span className="title-line">
                  <span className="bracket left">[</span>
                  {p.title}
                  <span className="bracket right">]</span>
                </span>
                <span className="summary">{p.summary}</span>
              </div>
              <div className="cell kind">
                <span className={`pill ${p.kind}`}><span className="dotty"></span>{KIND_LABEL[p.kind]}</span>
              </div>
              <div className="cell year">{p.year}</div>
            </div>
            {open === p.id && (
              <div className="sheet-detail">
                {p.detail}
                <div className="impact">
                  {p.impact.map(([k, v]) => (
                    <React.Fragment key={k}>
                      <span className="k">▸ {k}</span>
                      <span>{v}</span>
                    </React.Fragment>
                  ))}
                </div>
                <div className="stack">
                  {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Cards layout (alternative — toggled via Tweaks) */}
      <div className="cards">
        {PROJECTS.map(p => (
          <div key={p.id} className="card" onClick={() => toggle(p.id)}>
            <div className="top">
              <span className={`pill ${p.kind}`}><span className="dotty"></span>{KIND_LABEL[p.kind]}</span>
              <span className="yr">{p.year}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
            <div className="stack">
              {p.stack.slice(0, 3).map(s => <span key={s} className="tag">{s}</span>)}
            </div>
            {open === p.id && (
              <div className="card-detail">
                {p.detail}
                <div className="impact">
                  {p.impact.map(([k, v]) => (
                    <React.Fragment key={k}>
                      <span className="k">▸ {k}</span>
                      <span>{v}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* List layout — sparse, editorial */}
      <ol className="proj-list">
        {PROJECTS.map((p, i) => (
          <li key={p.id} className={`proj-list-row ${open === p.id ? 'expanded' : ''}`} onClick={() => toggle(p.id)}>
            <span className="proj-list-idx">{String(i + 1).padStart(2, '0')}</span>
            <div className="proj-list-body">
              <div className="proj-list-head">
                <h3 className="proj-list-title">{p.title}</h3>
                <span className="proj-list-meta">
                  <span className="proj-list-kind">{p.kindLabel}</span>
                  <span className="proj-list-dot">·</span>
                  <span className="proj-list-year">{p.year}</span>
                </span>
              </div>
              <p className="proj-list-summary">{p.summary}</p>
              {open === p.id && (
                <div className="proj-list-detail">
                  <p>{p.detail}</p>
                  <div className="impact">
                    {p.impact.map(([k, v]) => (
                      <React.Fragment key={k}>
                        <span className="k">▸ {k}</span>
                        <span>{v}</span>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="stack">
                    {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
                  </div>
                </div>
              )}
            </div>
            <span className="proj-list-chev" aria-hidden="true">{open === p.id ? '−' : '+'}</span>
          </li>
        ))}
      </ol>

      {/* Timeline layout — vertical chronology */}
      <div className="timeline">
        {(() => {
          // group by year, latest first
          const byYear = {};
          PROJECTS.forEach(p => { (byYear[p.year] = byYear[p.year] || []).push(p); });
          const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));
          return years.map(yr => (
            <div key={yr} className="tl-year">
              <div className="tl-year-label">{yr}</div>
              <div className="tl-year-rows">
                {byYear[yr].map(p => (
                  <div
                    key={p.id}
                    className={`tl-row ${open === p.id ? 'expanded' : ''}`}
                    onClick={() => toggle(p.id)}
                  >
                    <span className={`tl-dot ${p.kind}`} aria-hidden="true" />
                    <div className="tl-body">
                      <div className="tl-head">
                        <h3 className="tl-title">{p.title}</h3>
                        <span className={`pill ${p.kind}`}>
                          <span className="dotty" />{KIND_LABEL[p.kind]}
                        </span>
                      </div>
                      <p className="tl-summary">{p.summary}</p>
                      {open === p.id && (
                        <div className="tl-detail">
                          <p>{p.detail}</p>
                          <div className="impact">
                            {p.impact.map(([k, v]) => (
                              <React.Fragment key={k}>
                                <span className="k">▸ {k}</span>
                                <span>{v}</span>
                              </React.Fragment>
                            ))}
                          </div>
                          <div className="stack">
                            {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ));
        })()}
      </div>
    </section>
  );
}

window.ProjectsSheet = ProjectsSheet;
