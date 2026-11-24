// About.jsx — long-form about + now/currently strip + ASCII divider
function About() {
  return (
    <section className="section" id="about">
      <div className="section-head">
        <h2>about</h2>
        <span className="meta">~ a few paragraphs</span>
      </div>
      <div className="about-grid">
        <p>
          I'm the <em>Database Coordinator</em> at <em>Ronald McDonald House Louisville</em>
          — the person who keeps the donor database honest, the reports consistent, and
          the spreadsheets from quietly drifting apart from each other. A surprising amount
          of the job is detective work; a smaller, more satisfying amount is replacing the
          duct tape with something that holds up to a Monday morning.
        </p>
        <p className="about-pull">
          The honest answer to "is this an Excel problem or a code problem?" is usually:
          both, in that order, until the model earns its way into Python.
        </p>
        <p>
          On a given week I might be auditing a dataset to figure out why two reports
          disagree, rebuilding a workbook so it no longer takes a half-day to refresh,
          or training a small statistical model to flag donors who look like they're
          drifting away. I like the parts of this work that compound — the kind of
          fix that quietly removes a meeting from someone's calendar.
        </p>
        <p>
          Off-hours: long walks, slow cooking, the occasional regression on something
          that doesn't matter. I'm picky about keyboards and embarrassed about how
          much I think about pivot tables.
        </p>
      </div>
    </section>
  );
}

function NowStrip() {
  return (
    <section className="section" id="now">
      <div className="section-head">
        <h2>currently</h2>
        <span className="meta">updated · this week</span>
      </div>
      <div className="now">
        <div className="now-card">
          <div className="label">working on</div>
          <div className="body">
            Refining the churn model — adding channel features and a recency decay.
            <span className="sub">v2 expected end of month</span>
          </div>
        </div>
        <div className="now-card">
          <div className="label">reading</div>
          <div className="body">
            Tufte, again. <em>Visual Display of Quantitative Information</em>.
            <span className="sub">slow re-read · year 2</span>
          </div>
        </div>
        <div className="now-card">
          <div className="label">learning</div>
          <div className="body">
            Polars. Pandas works fine; Polars feels nicer.
            <span className="sub">10% in · enjoying it</span>
          </div>
        </div>
        <div className="now-card">
          <div className="label">listening</div>
          <div className="body">
            Long-form ambient and one country album on repeat.
            <span className="sub">last updated · today</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function AsciiDivider({ tone }) {
  // Editorial / magazine tones get a quieter typographic divider instead of ASCII art.
  if (tone === 'editorial' || tone === 'magazine') {
    return (
      <div className="quiet-divider" aria-hidden="true">
        <span>§</span>
      </div>
    );
  }
  const art = `· · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
   ┌─────────────────────────────────────────────────────────┐
   │   say hi  →  davisnmccracken@gmail.com                  │
   └─────────────────────────────────────────────────────────┘
· · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·`;
  return <div className="ascii-divider" aria-hidden="true">{art}</div>;
}

window.About = About;
window.NowStrip = NowStrip;
window.AsciiDivider = AsciiDivider;
