interface LegalPageProps {
  kind: 'privacy' | 'terms' | 'disclaimer' | 'cookies'
}

const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'November 25, 2026',
    sections: [
      {
        heading: '1. Local-First Data Philosophy',
        body: 'Vellum & Bloom operates primarily inside your browser. Personalized drafts, favorite templates, and theme preferences are stored locally in your device’s LocalStorage and are not transmitted to an external database.',
      },
      {
        heading: '2. Shareable Card Links',
        body: 'When you generate a shareable link, your card styling, names, and message are encoded directly inside the URL query string. Anyone you share that URL with can view the greeting card you composed.',
      },
      {
        heading: '3. Browser Exports',
        body: 'Downloading a card as a PNG image renders locally via the HTML5 Canvas API on your device.',
      },
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    updated: 'November 25, 2026',
    sections: [
      {
        heading: '1. Personal & Non-Commercial Greeting Use',
        body: 'Vellum & Bloom provides digital stationery templates and personalization tools for heartfelt personal greetings, celebrations, and non-commercial keepsakes.',
      },
      {
        heading: '2. User-Authored Messages',
        body: 'You retain responsibility for the messages and names you compose and share through generated card links or downloaded images.',
      },
      {
        heading: '3. Intellectual Property',
        body: 'Original decorative artwork, brand emblems, typography pairings, and layout designs remain the creative property of Vellum & Bloom.',
      },
    ],
  },
  disclaimer: {
    title: 'Disclaimer',
    updated: 'November 25, 2026',
    sections: [
      {
        heading: '1. Frontend-Only Studio Release (Part 1)',
        body: 'The current release focuses on digital greeting personalization, shareable link generation, and PNG exports. Optional gift notes included on cards serve as personal promises from the sender unless paired with a future monetary voucher integration.',
      },
      {
        heading: '2. Availability',
        body: 'Because drafts are saved in your browser’s LocalStorage, clearing browser site data will remove locally saved drafts.',
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    updated: 'November 25, 2026',
    sections: [
      {
        heading: '1. Essential Local Storage Only',
        body: 'Vellum & Bloom does not use advertising or cross-site tracking cookies. We use browser LocalStorage solely to remember your light/dark theme preference, favorited card templates, and saved card drafts.',
      },
      {
        heading: '2. Managing Preferences',
        body: 'You can clear your saved drafts or theme override at any time through your browser settings or the studio draft manager.',
      },
    ],
  },
}

export function LegalPage({ kind }: LegalPageProps) {
  const doc = LEGAL_CONTENT[kind]

  return (
    <div className="paper-grain py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="border-b pb-6 space-y-2" style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
            Policies &amp; Transparency
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            {doc.title}
          </h1>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Last updated: {doc.updated}
          </p>
        </header>

        <div className="space-y-6">
          {doc.sections.map((s) => (
            <section key={s.heading} className="space-y-2">
              <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {s.heading}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {s.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
