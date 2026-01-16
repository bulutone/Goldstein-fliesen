import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import Impressum from './Impressum';
import Datenschutz from './Datenschutz';
import AGB from './AGB';
import { Phone, MessageCircle, ChevronRight, Calendar, User, ShieldCheck } from 'lucide-react';

const GALLERY_GROUPS = {
  after: [
    "badsanierung-luxus-badewanne.jpeg", "fliesenleger-kueche-modern.jpeg",
    "bodenebene-dusche-fliesen.jpeg", "fliesenleger-mainz-umbau.jpeg",
    "luxus-bad-frankfurt.jpeg", "waschtisch-fliesen-optik.jpeg",
    "badezimmer-design-mainz.jpeg",
    "fliesenverlegung-grossformat.jpeg", "bad-sanierung-design.jpeg",
    "xxl-fliesen-bad.jpeg", "modernes-wc-fliesen.jpeg",
    "offene-dusche-mosaik.jpeg", "fliesenleger-meisterbetrieb.jpeg",
    "luxury-tiles-frankfurt.jpeg", "waschtisch-sanierung.jpeg",
    "fliesen-wohnzimmer-xxl.jpeg", "bad-inspiration-mainz.jpeg",
    "fliesenleger-wiesbaden.jpeg", "bad-planung-3d.jpeg",
    "luxus-fliesen-bad.jpeg",
    "fliesenverlegung-terrasse.jpeg"
  ],
  details: [
    "fliesen-kantentechnik.jpeg", "praezisions-fugen.jpeg",
    "xxl-fliesen-zuschnitt.jpeg", "fliesenleger-handwerk.jpeg",
    "bodenebene-dusche-ablauf.jpeg", "fliesen-verlegeplan.jpeg",
    "fliesenleger-werkzeug.jpeg"
  ],
  beforeAfter: [
    { before: "komplettsanierung-vorher.png", after: "komplettsanierung-nachher.png", title: "Komplettsanierung (2000er → Modern)" },
    { before: "waschtisch-vorher.jpeg", after: "waschtisch-nachher-v2.png", title: "Waschtisch-Modernisierung" },
    { before: "wc-vorher.jpeg", after: "wc-nachher-v2.png", title: "WC-Bereich" }
  ]
};

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        setIsScrolled(window.scrollY > 50);
      } else {
        setIsScrolled(true);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle scroll to anchor and top
  useEffect(() => {
    if (location.hash) {
      const elem = document.getElementById(location.hash.substring(1));
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
    // Close menu on route change
    setIsMenuOpen(false);
  }, [location]);

  // Always solid on non-home pages
  const headerClass = location.pathname === '/'
    ? (isScrolled ? 'header-scrolled' : '')
    : 'header-scrolled';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="app">
      {/* Header */}
      <header className={`header ${headerClass}`}>
        <div className="container header-content">
          <div className="logo">
            <span className="logo-main">GOLDSTEIN</span>
            <span className="logo-sub">FLIESEN & DESIGN</span>
          </div>

          {/* Desktop Nav */}
          <nav className="nav desktop-nav">
            <Link to="/#home">Home</Link>
            <Link to="/#services">Leistungen</Link>
            <Link to="/#financing">Finanzierung</Link>
            <Link to="/#blog">Blog</Link>
            <a href="tel:+491601849355" className="btn-cta">
              <Phone size={16} /> <span>Anrufen</span>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <div style={{ color: 'white' }}>✕</div> : <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></span>
              <span style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></span>
              <span style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></span>
            </div>}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/#home" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/#services" onClick={() => setIsMenuOpen(false)}>Leistungen</Link>
          <Link to="/#financing" onClick={() => setIsMenuOpen(false)}>Finanzierung</Link>
          <Link to="/#blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          <a href="tel:+491601849355" className="btn-cta" style={{ justifyContent: 'center', marginTop: '1rem' }}>
            <Phone size={16} /> <span>Anrufen</span>
          </a>
        </div>
      </header>

      {/* Floating WhatsApp Button (Mobile Only by CSS) */}
      <a href="https://wa.me/491601849355" className="floating-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Nachricht senden">
        <img src="/assets/whatsapp-icon.svg" alt="WhatsApp" width="32" height="32" />
      </a>

      <Outlet />

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-info">
            <div className="logo logo-light">
              <span className="logo-main">GOLDSTEIN</span>
              <span className="logo-sub">FLIESEN & DESIGN</span>
            </div>
            <p>Ihr zertifizierter Partner für exklusive Fliesenlegung und moderne Raumgestaltung in Frankfurt, Wiesbaden, Mainz, Mannheim und Umgebung.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/impressum">Impressum</Link>
            <Link to="/datenschutz">Datenschutz</Link>
            <Link to="/agb">AGB</Link>
          </div>
          <div className="footer-contact">
            <h4>Kontakt</h4>
            <p><a href="https://www.google.com/maps/search/?api=1&query=Moritz+Straße+59,+55130+Mainz" target="_blank" rel="noopener noreferrer">Moritz Straße 59, 55130 Mainz</a></p>
            <p>Tel: <a href="tel:+491601849355">0160 1849355</a></p>
            <p>Email: <a href="mailto:info@goldstein-fliesen.de">info@goldstein-fliesen.de</a></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Goldstein Fliesen & Design. Alle Rechte vorbehalten. | <a href="/sitemap.xml" style={{ color: '#666' }}>Sitemap</a></p>
          <p style={{ marginTop: '0.5rem' }}>
            Mit Liebe codiert von <a href="https://digihandel.de" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Digihandel.de</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

function LandingPage() {
  const [projectValue, setProjectValue] = useState(15000);
  const [hasDeposit, setHasDeposit] = useState(true);

  // Dynamic values
  const depositAmount = projectValue * 0.20;
  const discountAmount = projectValue * 0.10;
  const finalAmount = hasDeposit ? (projectValue - depositAmount - discountAmount) : projectValue;
  const monthlyRate = (finalAmount / 36).toFixed(2);

  // WhatsApp Message
  const whatsappMessage = `Hallo Goldstein Team, ich interessiere mich für die 0% Finanzierung. Mein geschätzter Projektwert liegt bei ${projectValue.toLocaleString('de-DE')}€. Bitte um Beratung.`;
  const whatsappLink = `https://wa.me/491601849355?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      {/* Structured Data for SEP (LocalBusiness + Service Area + Services + FAQ) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              "@id": "https://goldstein-fliesen.de/#organization",
              "name": "Goldstein Fliesen & Design",
              "image": "https://goldstein-fliesen.de/assets/hero.png",
              "telephone": "0160 1849355",
              "email": "info@goldstein-fliesen.de",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Moritz Straße 59",
                "addressLocality": "Mainz",
                "postalCode": "55130",
                "addressCountry": "DE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 50.009384,
                "longitude": 8.247656
              },
              "areaServed": [
                { "@type": "City", "name": "Frankfurt am Main" },
                { "@type": "City", "name": "Wiesbaden" },
                { "@type": "City", "name": "Mainz" },
                { "@type": "City", "name": "Mannheim" },
                { "@type": "City", "name": "Offenbach" },
                { "@type": "City", "name": "Bad Homburg" },
                { "@type": "AdministrativeArea", "name": "Rhein-Main-Gebiet" }
              ],
              "description": "Goldstein Fliesen & Design ist Ihr Experte für exklusive Badsanierung und XXL-Fliesenverlegung in Frankfurt und dem gesamten Rhein-Main-Gebiet.",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.instagram.com/goldstein_fliesen",
                "https://www.facebook.com/goldstein_fliesen"
              ]
            },
            {
              "@type": "Service",
              "serviceType": "Badsanierung",
              "provider": { "@id": "https://goldstein-fliesen.de/#organization" },
              "areaServed": { "@type": "AdministrativeArea", "name": "Rhein-Main-Gebiet" },
              "description": "Komplettsanierung von Bädern inkl. 3D-Planung und hochwertiger Verlegung von Großformatfliesen."
            },
            {
              "@type": "Service",
              "serviceType": "Fliesenverlegung",
              "provider": { "@id": "https://goldstein-fliesen.de/#organization" },
              "areaServed": { "@type": "AdministrativeArea", "name": "Rhein-Main-Gebiet" },
              "description": "Fachgerechte Verlegung von Wand- und Bodenfliesen, XXL-Fliesen und Naturstein."
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://goldstein-fliesen.de/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Leistungen",
                  "item": "https://goldstein-fliesen.de/#services"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Finanzierung",
                  "item": "https://goldstein-fliesen.de/#financing"
                }
              ]
            }
          ]
        })}
      </script>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Exklusive Fliesenkonzepte <br /><span className="text-accent">in Rhein-Main</span></h1>
          <p>Verwandel dein Zuhause in ein Kunstwerk. Wir sind Ihr Partner für hochwertige Badsanierung und XXL-Fliesen in Frankfurt, Wiesbaden, Mainz, Mannheim und Umgebung.</p>
          <div className="hero-financing-banner">
            <div className="financing-item">
              <span className="financing-value">0%</span>
              <span className="financing-label">Zinsen</span>
            </div>
            <div className="financing-divider"></div>
            <div className="financing-item">
              <span className="financing-value">36</span>
              <span className="financing-label">Raten</span>
            </div>
            <div className="financing-divider"></div>
            <div className="financing-item highlight">
              <span className="financing-value">-10%</span>
              <span className="financing-label">Extra Rabatt</span>
            </div>
          </div>
          <div className="hero-btns">
            <a href="#financing" className="btn-primary">Finanzierung prüfen</a>
            <a href="#contact" className="btn-outline">Kostenlose Beratung</a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section bg-off-white">
        <div className="container">
          <h2 className="section-title text-center">Unsere <span className="text-accent">Leistungen</span></h2>
          <div className="packages-grid">
            <div className="package-card">
              <div className="package-img-wrapper">
                <img src="/assets/bathroom.png" alt="Exklusive Badsanierung und Fliesenverlegung in Frankfurt und Mainz" className="package-img" loading="lazy" width="400" height="250" />
              </div>
              <div className="package-content">
                <h3>Bad-Komplettsanierung</h3>
                <p>Alles aus einer Hand. Von der Planung bis zur letzten Fuge für Ihr Traumbad.</p>
                <ul className="package-list">
                  <li>3D-Planung inklusive</li>
                  <li>Hochwertige Markenfliesen</li>
                </ul>
                <a href="#contact" className="btn-primary-small">Anfragen</a>
              </div>
            </div>
            <div className="package-card featured">
              <div className="package-img-wrapper">
                <img src="/assets/kitchen.png" alt="Moderne Großformatfliesen für Küche und Wohnbereich in Wiesbaden" className="package-img" loading="lazy" width="400" height="250" />
              </div>
              <div className="package-content">
                <h3>Küche & Wohnbereich</h3>
                <p>Moderne Großformate für ein offenes und luxuriöres Wohngefühl.</p>
                <ul className="package-list">
                  <li>Großformatfliesen</li>
                  <li>Individuelle Kantentechnik</li>
                  <li>Wand & Boden</li>
                </ul>
                <a href="#contact" className="btn-primary-small">Anfragen</a>
              </div>
            </div>
            <div className="package-card">
              <div className="package-img-wrapper">
                <img src="/assets/terrace.png" alt="Frostsichere Terrassenplatten und Außenfliesen Rhein-Main" className="package-img" loading="lazy" width="400" height="250" />
              </div>
              <div className="package-content">
                <h3>Terrassen-Upgrade</h3>
                <p>Frostsichere und langlebige Außenbeläge für höchste Ansprüche.</p>
                <ul className="package-list">
                  <li>Frostschutz-Garantie</li>
                  <li>Rutschfestigkeitsklasse R11</li>
                  <li>Moderne Entwässerung</li>
                </ul>
                <a href="#contact" className="btn-primary-small">Anfragen</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section id="gallery" className="section bg-white">
        <div className="container">
          <h2 className="section-title text-center">Unsere <span className="text-accent">Referenzen</span></h2>
          <p className="text-center" style={{ maxWidth: '600px', margin: '0 auto 2rem', color: '#666' }}>
            Lassen Sie sich inspirieren. Eine Auswahl unserer exklusivsten Projekte aus dem Rhein-Main-Gebiet.
          </p>

          <GalleryFilter />
        </div>
      </section>

      {/* Before & After Gallery */}
      <section className="section bg-off-white">
        <div className="container">
          <h2 className="section-title text-center">Echte <span className="text-accent">Veränderungen</span></h2>
          <p className="text-center" style={{ maxWidth: '600px', margin: '1rem auto 3rem', color: '#666' }}>
            Sehen Sie den direkten Unterschied. Ein komplettes Badezimmer-Projekt von Vedat Altuntas – von Alt zu Neu.
          </p>

          <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {GALLERY_GROUPS.beforeAfter.map((item, index) => (
              <div key={index} className="gallery-item">
                <div className="comparison-container" style={{ position: 'relative', height: '300px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', zIndex: 2 }}>Vorher</span>
                  <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--accent)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', zIndex: 2 }}>Nachher</span>
                  <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flex: 1, backgroundImage: `url(/assets/gallery/${item.before})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRight: '2px solid white' }} aria-label="Badezimmer vor der Sanierung"></div>
                    <div style={{ flex: 1, backgroundImage: `url(/assets/gallery/${item.after})`, backgroundSize: 'cover', backgroundPosition: 'center' }} aria-label="Badezimmer nach der Sanierung"></div>
                  </div>
                </div>
                <h3 style={{ marginTop: '1rem', fontSize: '1.2rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Detaillierter Umbau mit hochwertigen Materialien und präziser Verlegung.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (SEO Boost) */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="section-title text-center">Häufig <span className="text-accent">gestellte Fragen</span> (FAQ)</h2>
          <div className="faq-grid" style={{ marginTop: '3rem' }}>
            <div className="faq-item" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ChevronRight size={20} className="text-accent" /> Wie funktioniert die 0% Finanzierung?</h3>
              <p style={{ paddingLeft: '1.7rem', color: '#666' }}>Wir bieten eine flexible Ratenzahlung direkt über uns an – unbürokratisch und persönlich. Die genauen Details besprechen wir gerne am Telefon oder vor Ort.</p>
            </div>
            <div className="faq-item" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ChevronRight size={20} className="text-accent" /> In welchen Städten sind Sie tätig?</h3>
              <p style={{ paddingLeft: '1.7rem', color: '#666' }}>Unser Kerngebiet ist das gesamte Rhein-Main-Gebiet, insbesondere Frankfurt am Main, Wiesbaden, Mainz, Mannheim, Bad Homburg, Offenbach und Darmstadt.</p>
            </div>
            <div className="faq-item" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ChevronRight size={20} className="text-accent" /> Verlegen Sie auch Großformatfliesen (XXL)?</h3>
              <p style={{ paddingLeft: '1.7rem', color: '#666' }}>Ja, wir sind spezialisiert auf XXL-Fliesen und Großformate (z.B. 120x60cm, 240x120cm).</p>
            </div>
          </div>
          {/* Structured Data for FAQ */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [{
                "@type": "Question",
                "name": "Wie funktioniert die 0% Finanzierung?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Wir bieten eine flexible Ratenzahlung direkt über uns an – unbürokratisch und persönlich. Die genauen Details besprechen wir gerne am Telefon oder vor Ort."
                }
              }, {
                "@type": "Question",
                "name": "In welchen Städten sind Sie tätig?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Unser Kerngebiet ist das gesamte Rhein-Main-Gebiet, insbesondere Frankfurt am Main, Wiesbaden, Mainz, Mannheim, Bad Homburg, Offenbach und Darmstadt."
                }
              }, {
                "@type": "Question",
                "name": "Verlegen Sie auch Großformatfliesen (XXL)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, wir sind spezialisiert auf XXL-Fliesen und Großformate (z.B. 120x60cm, 240x120cm)."
                }
              }]
            })}
          </script>
        </div>
      </section>

      {/* Corporate Profile (AI Context) */}
      <section className="section bg-dark text-white">
        <div className="container">
          <h2 className="section-title text-center text-white">Über <span className="text-accent">Goldstein Fliesen</span></h2>
          <div className="profile-content" style={{ maxWidth: '800px', margin: '3rem auto 0', lineHeight: '1.8', color: '#ccc' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Goldstein Fliesen & Design</strong>, geführt von <strong>Vedat Altuntas</strong>, ist der führende Fachbetrieb für exklusive Fliesenverlegung und Badsanierung im Rhein-Main-Gebiet. Mit Sitz in Mainz (55130, Moritz Straße 59) bedienen wir anspruchsvolle Kunden in Frankfurt, Wiesbaden, Mainz und Bad Homburg.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Unsere Spezialisierung liegt auf <strong>XXL-Großformatfliesen</strong> und modernen Bad-Konzepten, die höchste Präzision erfordern. Wir unterscheiden uns durch unsere einzigartige <strong>0% Finanzierung</strong>, die es Hausbesitzern ermöglicht, ihre Renovierungsträume sofort und ohne Zinsbelastung über 36 Monate zu realisieren.
            </p>
            <p>
              Wir stehen für Qualität, Transparenz und absolute Termintreue. Jedes Projekt wird individuell geplant und meisterhaft ausgeführt, um nicht nur Wohnräume, sondern echte Lebensqualität zu schaffen.
            </p>
          </div>
        </div>
      </section>

      {/* Financing Info Section */}
      <section id="financing" className="section">
        <div className="container">
          <div className="financing-grid">
            <div className="financing-text">
              <h2 className="section-title">Traumprojekt <span className="text-accent">jetzt realisieren</span></h2>
              <div className="promo-badge">Sonderaktion: 10% Rabatt bei 20% Anzahlung!</div>
              <ul className="financing-features">
                <li>
                  <div className="icon">✓</div>
                  <div>
                    <strong>0% Finanzierung</strong>
                    <p>Keine versteckten Gebühren oder Zinsen über die gesamte Laufzeit.</p>
                  </div>
                </li>
                <li>
                  <div className="icon">✓</div>
                  <div>
                    <strong>36 Monate Laufzeit</strong>
                    <p>Maximale Flexibilität mit bequemen Monatsraten für Ihr Budget.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="financing-card">
              <div className="card-header">Rechenbeispiel</div>
              <div className="card-body">
                <div className="calc-row">
                  <span>Projektwert:</span>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      className="calc-input"
                      value={projectValue}
                      onChange={(e) => setProjectValue(Number(e.target.value))}
                      step="500"
                    />
                    <span>€</span>
                  </div>
                </div>
                <div className="calc-row">
                  <label className="toggle-label">
                    <input type="checkbox" checked={hasDeposit} onChange={() => setHasDeposit(!hasDeposit)} />
                    Anzahlung (20%)
                  </label>
                  <span>{hasDeposit ? depositAmount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €' : '0,00 €'}</span>
                </div>
                {hasDeposit && (
                  <div className="calc-row discount-row">
                    <span>Rabatt (10%):</span>
                    <span>-{discountAmount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                  </div>
                )}
                <div className="calc-divider"></div>
                <div className="calc-row result">
                  <span>Monatliche Rate:</span>
                  <span className="text-accent underline">{monthlyRate.toLocaleString('de-DE')} €</span>
                </div>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary w-full" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                  <MessageCircle size={20} /> Angebot anfordern
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section bg-off-white">
        <div className="container">
          <h2 className="section-title text-center">Ratgeber & <span className="text-accent">Inspiration</span></h2>
          <div className="blog-mini-grid" style={{ marginTop: '3rem' }}>
            <article className="blog-card-inline">
              <div className="blog-card-img" style={{ backgroundImage: 'url(/assets/kitchen.png)' }}></div>
              <div className="blog-card-content">
                <div className="blog-meta">
                  <span><Calendar size={14} /> 11. Januar 2026</span>
                  <span><User size={14} /> Vedat Altuntas</span>
                </div>
                <h3>Trends 2026: Großformatfliesen in Marmor-Optik</h3>
                <p>Erfahren Sie, warum großformatige Fliesen den Markt revolutionieren und wie sie kleine Räume optisch vergrößern...</p>
                <Link to="/blog/trends-2026" className="read-more">Weiterlesen <ChevronRight size={16} /></Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="contact" className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ihr Projekt im <span className="text-accent">Rhein-Main-Gebiet starten?</span></h2>
            <p>Kontaktieren Sie uns noch heute für ein unverbindliches Beratungsgespräch bei Ihnen vor Ort in Frankfurt, Wiesbaden, Mainz und Umgebung.</p>
            <div className="cta-buttons">
              <a href="tel:+491601849355" className="btn-primary">Jetzt Anrufen</a>
              <a href="https://wa.me/491601849355" className="btn-whatsapp">
                <MessageCircle size={20} /> WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Simple Blog Post Component
const BlogPost = () => (
  <div className="section" style={{ paddingTop: '10rem' }}>
    <div className="container" style={{ maxWidth: '800px' }}>
      <nav style={{ marginBottom: '2rem' }}>
        <Link to="/" style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} /> Zurück zur Startseite
        </Link>
      </nav>
      <div className="blog-meta" style={{ marginBottom: '1rem' }}>
        <span><Calendar size={14} /> 11. Januar 2026</span>
        <span><User size={14} /> Vedat Altuntas</span>
      </div>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Trends 2026: Warum Großformatfliesen in Marmor-Optik Ihr Zuhause verwandeln</h1>
      <div className="blog-full-img" style={{ height: '400px', backgroundImage: 'url(/assets/kitchen.png)', backgroundSize: 'cover', borderRadius: '8px', marginBottom: '2rem' }}></div>
      <div className="blog-text-content" style={{ fontSize: '1.2rem', color: '#444' }}>
        <p>Die Welt der Innenarchitektur entwickelt sich ständig weiter, aber ein Trend bleibt im Jahr 2026 unangefochten an der Spitze: <strong>Grossformatige Fliesen in Marmor-Optik</strong>. Wer sein Badezimmer oder seinen Wohnbereich renoviert, setzt heute auf maximale Eleganz und minimale Fugen.</p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Die Vorteile von XXL-Fliesen</h2>
        <p>Einer der grössten Vorteile ist die optische Weite. Da weniger Fugen den Blick unterbrechen, wirken selbst kleine Räume deutlich grösser und harmonischer. Besonders in der Marmor-Optik entsteht so ein fliessendes Muster, das an luxuriöse Paläste erinnert.</p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Hygiene und Pflege</h2>
        <p>Weniger Fugen bedeuten auch weniger Reinigungsaufwand. Fugen sind oft die Schwachstellen in Nassbereichen, wo sich Kalk und Schmutz absetzen. Bei grossformatigen Platten reduziert sich dieser Bereich auf ein Minimum.</p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Professionelle Verlegung ist entscheidend</h2>
        <p>So schön diese Fliesen auch sind, sie erfordern ein hohes Mass an handwerklichem Geschick. Bei Goldstein Fliesen & Design haben wir uns auf die Verlegung dieser anspruchsvollen Formate spezialisiert. Von der perfekten Untergrundvorbereitung bis zum präzisen Zuschnitt.</p>

        <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--off-white)', borderLeft: '4px solid var(--accent)' }}>
          <h3>Interesse an einer Modernisierung?</h3>
          <p>Nutzen Sie unsere 0% Finanzierung und verwirklichen Sie Ihren Fliesentraum noch heute.</p>
          <Link to="/#contact" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Jetzt beraten lassen</Link>
        </div>
      </div>
    </div>
  </div>
);

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (type) => {
    localStorage.setItem('cookie-consent', type);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="container cookie-content">
        <div className="cookie-text">
          <ShieldCheck className="text-accent" size={24} />
          <p>Wir nutzen Cookies, um Ihr Erlebnis zu verbessern. <Link to="/datenschutz">Mehr erfahren</Link></p>
        </div>
        <div className="cookie-btns">
          <button onClick={() => handleConsent('rejected')} className="btn-cookie-reject">Ablehnen</button>
          <button onClick={() => handleConsent('accepted')} className="btn-cookie-accept">Akzeptieren</button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <CookieBanner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<AGB />} />
          <Route path="/blog/trends-2026" element={<BlogPost />} />
        </Route>
      </Routes>
    </Router>
  );
}



const GalleryFilter = () => {
  const [filter, setFilter] = useState('after');
  const images = GALLERY_GROUPS[filter] || [];

  return (
    <>
      <div className="gallery-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button className={`btn-tab ${filter === 'after' ? 'active' : ''}`} onClick={() => setFilter('after')}>Luxus-Bäder</button>
        <button className={`btn-tab ${filter === 'details' ? 'active' : ''}`} onClick={() => setFilter('details')}>Details & Technik</button>
      </div>
      <div className="gallery-grid-simple">
        {images.map((img, index) => (
          <img key={`${filter}-${index}`} src={`/assets/gallery/${img}`} alt={`Goldstein Referenz ${filter} ${index + 1}`} loading="lazy" />
        ))}
      </div>
    </>
  );
};

export default App;
