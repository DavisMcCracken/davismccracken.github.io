// App.jsx — wires components together with Tweaks
const { useState, useEffect } = React;

function App() {
  const tweakDefaults = /*EDITMODE-BEGIN*/{
    "accent": "mauve",
    "tone": "terminal",
    "heroTreatment": "boot",
    "projectsLayout": "timeline",
    "sectionOrder": "work-first",
    "density": "comfortable",
    "asciiRain": true,
    "scrollRail": true,
    "grain": true
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = useTweaks(tweakDefaults);

  // Apply accent color globally
  useEffect(() => {
    const accentMap = {
      mauve: '#c4a7e7',
      peach: '#f5c2a4',
      sage:  '#a6c4a3',
      sky:   '#a4c2e3',
      rose:  '#e8a5a5',
    };
    const accentRgb = {
      mauve: '196,167,231',
      peach: '245,194,164',
      sage:  '166,196,163',
      sky:   '164,194,227',
      rose:  '232,165,165',
    };
    const c = accentMap[tweaks.accent] || accentMap.mauve;
    const rgb = accentRgb[tweaks.accent] || accentRgb.mauve;
    document.documentElement.style.setProperty('--accent-mauve', c);
    document.documentElement.style.setProperty('--accent-current', c);
    document.documentElement.style.setProperty('--accent-current-rgb', rgb);
    document.documentElement.style.setProperty('--color-link', c);
    document.documentElement.style.setProperty('--glow-focus', `0 0 0 3px rgba(${rgb},0.25)`);
  }, [tweaks.accent]);

  // Toggle grain
  useEffect(() => {
    document.body.classList.toggle('no-grain', !tweaks.grain);
  }, [tweaks.grain]);

  // Re-render Lucide icons whenever DOM changes
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  const pageClass = [
    'page',
    `density-${tweaks.density}`,
    `layout-${tweaks.projectsLayout}`,
    `tone-${tweaks.tone}`,
    `hero-${tweaks.heroTreatment}`,
    `order-${tweaks.sectionOrder}`,
  ].join(' ');

  // Section render map — ordering switched via tweak
  const sections = {
    projects: <ProjectsSheet key="projects" density={tweaks.density} />,
    photos:   <Photos key="photos" />,
    about:    <About key="about" />,
    now:      <NowStrip key="now" />,
    links:    <LinksRail key="links" />,
    divider:  <AsciiDivider key="divider" tone={tweaks.tone} />,
    contact:  <ContactForm key="contact" />,
  };

  const orderings = {
    'work-first':   ['projects', 'photos', 'about', 'now', 'links', 'divider', 'contact'],
    'person-first': ['about', 'now', 'projects', 'photos', 'links', 'divider', 'contact'],
    'minimal':      ['projects', 'about', 'links', 'divider', 'contact'],
  };

  const order = orderings[tweaks.sectionOrder] || orderings['work-first'];

  return (
    <>
      <AsciiRain enabled={!!tweaks.asciiRain} />
      {tweaks.scrollRail && <ScrollRail order={tweaks.sectionOrder} />}
      <Header />
      <main className={pageClass}>
        <Hero treatment={tweaks.heroTreatment} tone={tweaks.tone} />
        {order.map(k => sections[k])}
        <SiteFooter />
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Tone" subtitle="The overall voice of the page — how terminal-y vs. editorial it reads.">
          <TweakRadio
            value={tweaks.tone}
            onChange={(v) => setTweak('tone', v)}
            options={[
              { value: 'terminal',  label: 'terminal'  },
              { value: 'editorial', label: 'editorial' },
              { value: 'magazine',  label: 'magazine'  },
            ]}
          />
        </TweakSection>

        <TweakSection title="Hero" subtitle="The opening moment.">
          <TweakRadio
            value={tweaks.heroTreatment}
            onChange={(v) => setTweak('heroTreatment', v)}
            options={[
              { value: 'boot',    label: 'boot seq.' },
              { value: 'quiet',   label: 'quiet'     },
              { value: 'big',     label: 'big type'  },
            ]}
          />
        </TweakSection>

        <TweakSection title="Projects" subtitle="How to display the work.">
          <TweakRadio
            value={tweaks.projectsLayout}
            onChange={(v) => setTweak('projectsLayout', v)}
            options={[
              { value: 'sheet',    label: 'sheet'    },
              { value: 'cards',    label: 'cards'    },
              { value: 'list',     label: 'list'     },
              { value: 'timeline', label: 'timeline' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Section order" subtitle="What story does the page tell, top-to-bottom.">
          <TweakRadio
            value={tweaks.sectionOrder}
            onChange={(v) => setTweak('sectionOrder', v)}
            options={[
              { value: 'work-first',   label: 'work first'   },
              { value: 'person-first', label: 'person first' },
              { value: 'minimal',      label: 'minimal'      },
            ]}
          />
        </TweakSection>

        <TweakSection title="Accent" subtitle="One color, used sparingly across links, focus, and small flourishes.">
          <TweakRadio
            value={tweaks.accent}
            onChange={(v) => setTweak('accent', v)}
            options={[
              { value: 'mauve', label: 'mauve' },
              { value: 'peach', label: 'peach' },
              { value: 'sage',  label: 'sage'  },
              { value: 'sky',   label: 'sky'   },
              { value: 'rose',  label: 'rose'  },
            ]}
          />
        </TweakSection>

        <TweakSection title="Density" subtitle="Comfortable for editorial reading; compact for at-a-glance.">
          <TweakRadio
            value={tweaks.density}
            onChange={(v) => setTweak('density', v)}
            options={[
              { value: 'comfortable', label: 'comfortable' },
              { value: 'compact',     label: 'compact'     },
            ]}
          />
        </TweakSection>

        <TweakSection title="Atmosphere" subtitle="Background effects. Subtle by default.">
          <TweakToggle
            label="ASCII rain"
            value={!!tweaks.asciiRain}
            onChange={(v) => setTweak('asciiRain', v)}
          />
          <TweakToggle
            label="Scroll rail"
            value={!!tweaks.scrollRail}
            onChange={(v) => setTweak('scrollRail', v)}
          />
          <TweakToggle
            label="Background grain"
            value={!!tweaks.grain}
            onChange={(v) => setTweak('grain', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
