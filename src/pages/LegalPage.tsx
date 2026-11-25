import { Link } from 'react-router-dom'
import { ExternalLink, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { ADSENSE_CONFIG, SITE_CONFIG, buildCanonicalUrl } from '../config/siteConfig'
import { openPrivacySettings } from '../utils/consent'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { SeoHead } from '../components/SeoHead'

export type LegalKind = 'privacy' | 'terms' | 'disclaimer' | 'cookies' | 'copyright'

interface LegalPageProps {
  kind: LegalKind
}

interface LegalSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  links?: { label: string; href: string }[]
}

interface LegalDoc {
  title: string
  seoTitle: string
  metaDescription: string
  canonicalPath: string
  updated: string
  intro: string
  sections: LegalSection[]
}

function getLegalDocument(): Record<LegalKind, LegalDoc> {
  const contactText = `For questions, privacy requests, or legal notices, contact us at ${SITE_CONFIG.contactEmail} (${SITE_CONFIG.locationLabel}) or via our Contact Us page.`

  const adsStatusSentence = ADSENSE_CONFIG.enabled
    ? 'Google AdSense advertising is currently enabled on eligible editorial pages of this site, subject to your consent choices where required.'
    : 'Google AdSense advertising is currently disabled on this site. The disclosures below explain how advertising cookies operate if advertising is activated after domain deployment and approval.'

  return {
    privacy: {
      title: 'Privacy Policy',
      seoTitle: 'Privacy Policy — Storage & Ad Disclosures',
      metaDescription:
        'Learn how Cardelle handles local browser storage, URL-encoded greeting cards, optional Google AdSense cookies, and your privacy rights.',
      canonicalPath: '/privacy',
      updated: SITE_CONFIG.lastPolicyUpdate,
      intro:
        'Cardelle is built with a transparent, local-first architecture. This Privacy Policy explains accurately what happens inside your browser, how shared greeting links work, and how optional third-party advertising services behave if enabled.',
      sections: [
        {
          heading: '1. Information Processed & Local Browser Storage',
          paragraphs: [
            'Cardelle does not require account registration and does not maintain a central user database storing your private greeting cards, personal milestones, or unpublished drafts. When you customize a card or add dates in Our Little Forever, draft data, milestone dates, bookmarked template IDs, your light/dark theme preference, reduced-motion setting, and privacy consent choices are stored locally in your browser via LocalStorage.',
            'Because drafts and personal milestone dates live in your browser’s LocalStorage, clearing your browser cache or site data permanently removes them on that device.',
          ],
          bullets: [
            'LocalStorage only: Card drafts, personal milestone dates, saved template IDs, theme mode, accessibility motion setting, and privacy consent status.',
            'No hidden telemetry: We do not capture your keystrokes or upload unpublished card drafts or personal relationship dates to a backend server.',
            'Client-side exports: Downloading a 2-page PDF, PNG, or JPG renders completely on your own device in the browser.',
          ],
        },
        {
          heading: '2. Shareable Greeting Card Links',
          paragraphs: [
            'When you generate a shareable card URL, the recipient name, sender name, headline, message, and visual styling are encoded directly inside the URL query string (?d=...). Anyone who receives or accesses that complete URL can decode and read the card content you placed inside it.',
            'Private shared card routes (/card/*) are marked with a noindex directive to discourage search engines from indexing personal links, and advertisements are strictly prohibited inside shared greeting views.',
          ],
        },
        {
          heading: '3. Contact Form Submissions',
          paragraphs: [
            'Our Contact Us page validates your message locally in the browser and, when configured by the site owner, helps compose a direct email via your mail client. No silent third-party CRM tracking is attached to the form.',
          ],
        },
        {
          heading: '4. Third-Party Services, Analytics & External Links',
          paragraphs: [
            'To display editorial typography, this site loads web fonts from Google Fonts (which receives standard browser request headers such as your IP address when fetching font files). If you explicitly opt in to Analytics in our privacy banner or Privacy Settings, Cardelle loads Google Analytics 4 (G-GC7C4QMFCR) to measure aggregate page views across public routes; private card messages encoded in shared card links (?d=...) are stripped from analytics paths and analytics remains disabled unless consented.',
            'If you click “Share on WhatsApp”, your browser hands off the pre-filled greeting text directly to WhatsApp (https://wa.me/) under Meta/WhatsApp’s own privacy terms.',
          ],
        },
        {
          heading: '5. Google AdSense & Advertising Cookies (When Advertising Is Enabled)',
          paragraphs: [
            adsStatusSentence,
            'When Google AdSense is enabled, Google and third-party vendors may use cookies (including advertising cookies) to serve ads based on a user’s prior visits to this website or other websites on the Internet. Google’s use of advertising cookies enables it and its partners to serve advertisements tailored to users based on their visit to this site and/or other sites.',
            'You can opt out of personalized advertising by visiting Google Ads Settings or industry opt-out portals below, or adjust your consent choice at any time using Privacy Settings in our footer.',
          ],
          links: [
            { label: 'Google Ads Settings (Manage or Opt Out)', href: SITE_CONFIG.googleAdsSettingsUrl },
            { label: 'How Google Uses Data on Partner Sites', href: SITE_CONFIG.googlePartnerPrivacyUrl },
            { label: 'YourAdChoices / DAA Opt-Out (US)', href: SITE_CONFIG.aboutAdsOptOutUrl },
            { label: 'Your Online Choices (EU / EEA)', href: SITE_CONFIG.yourOnlineChoicesEuUrl },
          ],
        },
        {
          heading: '6. Data Retention & Your Privacy Rights',
          paragraphs: [
            'Locally stored preferences and drafts persist in your browser until you delete them via the Studio Drafts drawer or your browser’s site-data settings. Depending on your region (including the EEA, UK, Switzerland, or applicable US states), you may have rights to access, correct, delete, or restrict processing of personal data, or withdraw consent for personalized advertising at any time.',
          ],
        },
        {
          heading: '7. Children’s Privacy & Policy Updates',
          paragraphs: [
            'Cardelle is intended for a general audience and does not knowingly collect personal information from children under 13 (or applicable regional age thresholds). We may update this Privacy Policy as features evolve; any updates will reflect a revised “Last updated” date at the top of this page.',
          ],
        },
        {
          heading: '8. Contact Details & Professional Review Notice',
          paragraphs: [
            contactText,
            'Notice: This template policy accurately describes the technical architecture of Cardelle, but neither it nor any banner alone guarantees legal compliance in every jurisdiction. Have a qualified legal professional review your final contact, business, and regional disclosures prior to commercial launch.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms and Conditions',
      seoTitle: 'Terms & Conditions — Card Usage Rules',
      metaDescription:
        'Terms governing acceptable use, user-authored greeting messages, intellectual property, prohibited content, and non-monetary cards.',
      canonicalPath: '/terms',
      updated: SITE_CONFIG.lastPolicyUpdate,
      intro:
        'By accessing or using Cardelle, you agree to these Terms and Conditions. Please read them carefully before creating, downloading, or sharing digital greeting cards.',
      sections: [
        {
          heading: '1. Digital Greeting Cards Only (Not Monetary Gift Cards)',
          paragraphs: [
            'Cardelle provides bespoke digital greeting cards, celebratory stationery templates, and personal keepsake notes. Unless a verified, regulated payment-based voucher service is explicitly added and disclosed in the future, cards created on this platform carry zero monetary value, are not prepaid cash cards, and cannot be redeemed as financial gift vouchers.',
            'Optional “Gift Note” text entered by a sender represents solely an informal personal gesture between sender and recipient.',
          ],
        },
        {
          heading: '2. Acceptable Use & Permitted License',
          paragraphs: [
            'You are granted a limited, non-exclusive, revocable license to customize templates, export 2-page PDF, PNG, or JPG files, and share generated greeting links for personal, family, educational, and non-commercial celebratory communication.',
          ],
        },
        {
          heading: '3. User-Generated Content & Sender Responsibility',
          paragraphs: [
            'You are solely responsible for the names, headlines, messages, stickers, and notes you enter into any card or share with recipients. Because shareable card payloads are encoded directly in your link and rendered on the recipient’s device, Cardelle does not pre-screen or moderate private greeting text.',
          ],
        },
        {
          heading: '4. Prohibited Content & Abuse Prevention',
          paragraphs: [
            'You agree not to use Cardelle to compose, encode, download, or distribute:',
          ],
          bullets: [
            'Harassing, threatening, defamatory, hateful, obscene, or abusive messages.',
            'Phishing lures, deceptive financial claims, impersonation, spam campaigns, or malicious URLs.',
            'Content that infringes another party’s copyright, trademark, privacy, or publicity rights.',
            'Automated scraping, reverse engineering, or attempts to bypass input length or URL validation safeguards.',
          ],
        },
        {
          heading: '5. Intellectual Property Rights',
          paragraphs: [
            'All original botanical illustrations, SVG motifs, border patterns, layout compositions, editorial articles, and brand marks on Cardelle remain the intellectual property of the site owner and are protected under applicable copyright laws. You may not resell, redistribute, or package our templates as your own competing card platform or template marketplace product.',
          ],
        },
        {
          heading: '6. External Links & Third-Party Services',
          paragraphs: [
            'Links to third-party platforms (such as WhatsApp sharing handoffs or external privacy opt-out pages) are provided for convenience. Cardelle does not control and is not responsible for the content, availability, or privacy practices of third-party websites.',
          ],
        },
        {
          heading: '7. Service Availability & Limitation of Liability',
          paragraphs: [
            'Cardelle is provided on an “as is” and “as available” basis without warranties of uninterrupted availability or permanent draft retention. Because drafts rely on browser LocalStorage and links rely on intact URL parameters, we are not liable for lost drafts or truncated messaging-app URLs.',
            'To the maximum extent permitted by applicable law, Cardelle and its operators shall not be liable for any indirect, incidental, consequential, or special damages arising from your use of the site or user-generated card links.',
          ],
        },
        {
          heading: '8. Changes to Terms & Contact Information',
          paragraphs: [
            'We may revise these Terms and Conditions periodically. Continued use of the website after updates take effect constitutes acceptance of the revised terms.',
            contactText,
            'Legal review notice: These terms are written for clarity and transparency, and should be reviewed by a qualified legal professional with your live jurisdiction and business details before launch.',
          ],
        },
      ],
    },
    disclaimer: {
      title: 'Disclaimer',
      seoTitle: 'Disclaimer — Informational Card Notice',
      metaDescription:
        'Important disclaimers regarding non-monetary digital greeting cards, local browser storage, editorial writing inspiration, and external links.',
      canonicalPath: '/disclaimer',
      updated: SITE_CONFIG.lastPolicyUpdate,
      intro:
        'This Disclaimer clarifies the scope, technical limits, and editorial intent of Cardelle.',
      sections: [
        {
          heading: '1. No Monetary Value or Financial Guarantee',
          paragraphs: [
            'All cards designed on Cardelle are strictly non-monetary digital greeting cards. Even where a user enters an optional “Gift Note” (for example, promising dinner or coffee), Cardelle does not process payments, verify promises, hold funds, or issue redeemable financial gift cards.',
          ],
        },
        {
          heading: '2. Local-First Draft Persistence',
          paragraphs: [
            'Drafts and favorite templates are stored locally in your web browser. Clearing site data, switching browsers, or browsing in private/incognito sessions will prevent previous drafts from appearing.',
          ],
        },
        {
          heading: '3. Editorial Guides & Writing Inspiration',
          paragraphs: [
            'Articles, birthday wishes, and celebration ideas published in the Stationery Journal are provided solely for creative inspiration and general informational purposes.',
          ],
        },
        {
          heading: '4. External Links & Advertising Notice',
          paragraphs: [
            'Outbound links to external services or advertising settings are offered as helpful references. If Google AdSense is enabled by the site owner on eligible content pages, advertisements are served automatically by third-party ad networks and do not constitute an endorsement by Cardelle.',
            'Nothing on this website constitutes legal advice, and no guarantee of regulatory compliance or third-party program approval is implied.',
          ],
        },
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      seoTitle: 'Cookie Policy — Storage & Ad Disclosures',
      metaDescription:
        'Understand how Cardelle uses essential browser LocalStorage and optional Google AdSense advertising cookies when enabled.',
      canonicalPath: '/cookies',
      updated: SITE_CONFIG.lastPolicyUpdate,
      intro:
        'This Cookie Policy explains how Cardelle uses browser storage technologies and how advertising cookies apply if monetization is enabled.',
      sections: [
        {
          heading: '1. Essential & Preference LocalStorage Used Today',
          paragraphs: [
            'Unlike traditional websites that set invasive tracking cookies, Cardelle relies on browser LocalStorage for core interactive features. These entries remain on your device and are not sent to our servers:',
          ],
          bullets: [
            'cardelle_consent_v1 — Records your privacy banner choice and granular storage preferences.',
            'color-scheme — Remembers whether you selected light or dark mode.',
            'cardelle_reduced_motion_v1 — Stores your accessibility preference to minimize animations.',
            'cardelle_drafts_v1 & cardelle_favorites_v1 — Stores your card drafts and favorite templates locally.',
            'cardelle_personal_milestones_v1 — Stores personal milestone dates you add in Our Little Forever privately on your device.',
          ],
        },
        {
          heading: '2. Optional Analytics Cookies (Google Analytics 4)',
          paragraphs: [
            'With your explicit analytics consent, Cardelle loads Google Analytics 4 (Measurement ID G-GC7C4QMFCR) to understand aggregate route visits and improve card collections. Google Analytics scripts are not loaded and page_view events are not sent unless you grant analytics consent, and you can withdraw consent at any time via Privacy Settings.',
          ],
        },
        {
          heading: '3. Optional Advertising Cookies (Google AdSense)',
          paragraphs: [
            adsStatusSentence,
            'When Google AdSense is active, Google and its advertising partners may place and read cookies or use web beacons in your browser to deliver relevant ads, measure performance, and cap repetitive impressions. Users in regions such as the EEA, UK, and Switzerland are presented with explicit consent options before personalized advertising cookies are activated.',
          ],
          links: [
            { label: 'Google Ads Settings', href: SITE_CONFIG.googleAdsSettingsUrl },
            { label: 'Digital Advertising Alliance Opt-Out', href: SITE_CONFIG.aboutAdsOptOutUrl },
            { label: 'Your Online Choices (Europe)', href: SITE_CONFIG.yourOnlineChoicesEuUrl },
          ],
        },
        {
          heading: '4. Managing Your Preferences Anytime',
          paragraphs: [
            'You can update your consent preferences at any time using the button below or the “Privacy Settings” link in the site footer, or clear LocalStorage and cookies directly in your browser settings.',
            contactText,
          ],
        },
      ],
    },
    copyright: {
      title: 'Copyright Policy',
      seoTitle: 'Copyright Policy — Template & User Rights',
      metaDescription:
        'Intellectual property, original botanical artwork ownership, personal sharing rights, and copyright takedown procedures for Cardelle.',
      canonicalPath: '/copyright',
      updated: SITE_CONFIG.lastPolicyUpdate,
      intro:
        'Cardelle respects original creative craft—both our own bespoke stationery illustrations and the rights of creators everywhere.',
      sections: [
        {
          heading: '1. Original Templates, Artwork & Editorial Content',
          paragraphs: [
            'All card templates, vector botanical motifs, decorative frames, color palettes, site design, and written Stationery Journal articles published on Cardelle are original works owned by Cardelle and protected under copyright law.',
          ],
        },
        {
          heading: '2. Permitted Personal Use by Senders & Recipients',
          paragraphs: [
            'When you personalize a card on Cardelle, you are welcome to:',
          ],
          bullets: [
            'Share unique greeting links with friends, partners, and family via WhatsApp, email, or messaging apps.',
            'Download 2-page PDF, PNG, or JPG exports for personal digital sharing or personal non-commercial printing.',
            'Adapt our sample birthday, thank-you, and anniversary wishes for your own personal greetings.',
          ],
        },
        {
          heading: '3. Commercial & Redistribution Restrictions',
          paragraphs: [
            'You may not scrape, bulk-download, repackage, resell, sublicense, or redistribute Cardelle card designs, SVG illustrations, or written articles as standalone stock graphics, printable packs for sale, or competing greeting card templates without explicit written permission.',
          ],
        },
        {
          heading: '4. User-Entered Content & Takedown Inquiries',
          paragraphs: [
            'Users remain responsible for ensuring that custom text they compose and share does not infringe third-party copyrights or trademarks. Because shared card payloads reside inside user-distributed URLs rather than a public server gallery, Cardelle does not host a searchable repository of user cards.',
            `If you believe any site-authored asset or article on this domain raises an intellectual property concern, please send a detailed notice identifying the specific URL and ownership claim: ${contactText}`,
          ],
        },
      ],
    },
  }
}

export function LegalPage({ kind }: LegalPageProps) {
  const docs = getLegalDocument()
  const doc = docs[kind]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: buildCanonicalUrl('/') },
      { '@type': 'ListItem', position: 2, name: doc.title, item: buildCanonicalUrl(doc.canonicalPath) },
    ],
  }

  return (
    <div className="paper-grain py-10 sm:py-16">
      <SeoHead
        title={doc.seoTitle}
        description={doc.metaDescription}
        canonicalPath={doc.canonicalPath}
        jsonLd={breadcrumbSchema}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: doc.title }]} />

        <header className="border-b pb-6 space-y-3" style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
            Policies &amp; Transparency
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            {doc.title}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {doc.intro}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Last updated: {doc.updated}
          </p>
        </header>

        <div className="space-y-8">
          {doc.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {section.heading}
              </h2>
              {section.paragraphs.map((para, idx) => (
                <p key={idx} className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {para}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-2 pl-5 list-disc text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {section.links && (
                <ul className="space-y-2 pt-1">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium underline"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {kind === 'cookies' && (
          <div
            className="rounded-3xl border p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-[#D9B77E] shrink-0" aria-hidden="true" />
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                Review or update your local privacy &amp; cookie consent preferences
              </p>
            </div>
            <button
              type="button"
              onClick={openPrivacySettings}
              className="inline-flex items-center gap-2 rounded-full bg-[#472C42] px-4 py-2 text-xs font-semibold text-[#FFF9F3] cursor-pointer shrink-0"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
              <span>Privacy Settings</span>
            </button>
          </div>
        )}

        {/* Quick cross-links between legal documents */}
        <nav
          aria-label="Policy Documents"
          className="border-t pt-6 flex flex-wrap gap-3 text-xs font-semibold"
          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
        >
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <span>·</span>
          <Link to="/terms" className="hover:underline">Terms &amp; Conditions</Link>
          <span>·</span>
          <Link to="/disclaimer" className="hover:underline">Disclaimer</Link>
          <span>·</span>
          <Link to="/cookies" className="hover:underline">Cookie Policy</Link>
          <span>·</span>
          <Link to="/copyright" className="hover:underline">Copyright Policy</Link>
          <span>·</span>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </nav>
      </div>
    </div>
  )
}
