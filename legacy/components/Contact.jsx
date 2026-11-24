// Contact.jsx — links rail + contact form with validation
const { useState, useEffect } = React;

function LinksRail() {
  const links = [
    { who: 'github', handle: 'DavisMcCracken', href: 'https://github.com/DavisMcCracken', icon: 'code-2' },
    { who: 'linkedin', handle: 'davis-mccracken', href: 'https://www.linkedin.com/in/davis-mccracken/', icon: 'briefcase' },
    { who: 'email', handle: 'davisnmccracken@gmail.com', href: 'mailto:davisnmccracken@gmail.com', icon: 'mail' },
    { who: 'resume', handle: 'pdf — on request', href: '#contact', icon: 'file-text' },
  ];
  return (
    <section className="section" id="links">
      <div className="section-head">
        <h2>links</h2>
        <span className="meta">{links.length} · all the usual places</span>
      </div>
      <div className="links" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {links.map(l => (
          <a key={l.who} className="link-card" href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
            <span className="ic"><i data-lucide={l.icon}></i></span>
            <span className="lab">
              <span className="who">{l.who}</span>
              <span className="handle">{l.handle}</span>
            </span>
            <span className="ext">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'required';
    if (!form.email.trim()) e.email = 'required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'not a valid email';
    if (!form.message.trim()) e.message = 'say something';
    else if (form.message.trim().length < 8) e.message = 'a little more, please';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
  };

  if (sent) {
    return (
      <section className="section" id="contact">
        <div className="section-head">
          <h2>contact</h2>
          <span className="meta">sent · {new Date().toLocaleDateString()}</span>
        </div>
        <div className="contact-success">
          <i data-lucide="check-circle-2" style={{ width: 16, height: 16 }}></i>
          <span>got it. I'll write back from <span style={{ color: 'var(--fg-primary)' }}>davisnmccracken@gmail.com</span> within a couple days.</span>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="contact">
      <div className="section-head">
        <h2>contact</h2>
        <span className="meta">replies usually within 48h</span>
      </div>
      <form className="contact" onSubmit={submit} noValidate>
        <div>
          <h3 className="contact-head">Got a problem worth <em>solving</em>?</h3>
          <p className="contact-sub">Or just want to say hi. Either works.</p>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="f-name">name</label>
            <input id="f-name" type="text" placeholder="your name" value={form.name} onChange={set('name')} className={errors.name ? 'invalid' : ''} />
            <span className="err">{errors.name || ''}</span>
          </div>
          <div className="field">
            <label htmlFor="f-email">email</label>
            <input id="f-email" type="email" placeholder="you@somewhere.com" value={form.email} onChange={set('email')} className={errors.email ? 'invalid' : ''} />
            <span className="err">{errors.email || ''}</span>
          </div>
        </div>

        <div className="field">
          <label htmlFor="f-subject">subject <span style={{ color: 'var(--fg-muted)', textTransform: 'none', letterSpacing: 0 }}>· optional</span></label>
          <input id="f-subject" type="text" placeholder="excel rescue mission, regression help, just saying hi…" value={form.subject} onChange={set('subject')} />
          <span className="err"></span>
        </div>

        <div className="field">
          <label htmlFor="f-message">message</label>
          <textarea id="f-message" placeholder="a few sentences is plenty" value={form.message} onChange={set('message')} className={errors.message ? 'invalid' : ''}></textarea>
          <span className="err">{errors.message || ''}</span>
        </div>

        <div className="contact-footer">
          <span className="contact-direct">
            or directly: <a href="mailto:davisnmccracken@gmail.com">davisnmccracken@gmail.com</a>
          </span>
          <button type="submit" className="btn primary">
            send <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </section>
  );
}

function SiteFooter() {
  const [uptime, setUptime] = useState('00:00:00');
  useEffect(() => {
    const start = Date.now();
    const fmt = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const s = Math.floor((Date.now() - start) / 1000);
      setUptime(`${fmt(Math.floor(s / 3600))}:${fmt(Math.floor((s % 3600) / 60))}:${fmt(s % 60)}`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <footer className="footer">
      <span className="left">
        <span>© 2026 · davis mccracken</span>
        <span className="blink"></span>
      </span>
      <span className="right">
        <span style={{ color: 'var(--fg-muted)' }}>session uptime</span>
        <span style={{ color: 'var(--fg-secondary)', marginLeft: 8, fontVariantNumeric: 'tabular-nums' }}>{uptime}</span>
      </span>
    </footer>
  );
}

window.LinksRail = LinksRail;
window.ContactForm = ContactForm;
window.SiteFooter = SiteFooter;
