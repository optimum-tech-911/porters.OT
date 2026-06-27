import React, { useState, useEffect, useRef } from 'react';

// --- DATA ---
const MAIN_CARDS = [
  {
    id: 'simuler',
    title: 'Simuler mes revenus',
    shortTitle: 'Simuler',
    subtitle: 'Estimer mon salaire',
    description: 'Estimez votre rémunération en portage salarial selon votre TJM, vos jours facturés et vos frais professionnels.',
    benefits: ['Estimation rapide', 'Frais intégrés', 'Sans engagement'],
    ctaLabel: 'Commencer la simulation',
    href: '/simulateur',
    icon: (
      <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    )
  },
  {
    id: 'rdv',
    title: 'Prendre rendez-vous',
    shortTitle: 'RDV',
    subtitle: 'Échanger 30 min',
    description: 'Échangez avec un conseiller pour comprendre le portage salarial et structurer votre prochaine mission IT.',
    benefits: ['Échange personnalisé', 'Réponses à vos questions', 'Accompagnement'],
    ctaLabel: 'Réserver un créneau',
    href: '/rendez-vous',
    icon: (
      <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    )
  },
  {
    id: 'comprendre',
    title: 'Comprendre le portage',
    shortTitle: 'Portage',
    subtitle: 'Cadre & sécurité',
    description: 'Découvrez comment combiner l’autonomie du freelance avec la sécurité du salariat.',
    benefits: ['Statut salarié', 'Gestion déléguée', 'Couverture sociale'],
    ctaLabel: 'Tout savoir en 2 min',
    href: '/portage-salarial',
    icon: (
      <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  },
  {
    id: 'profils',
    title: 'Profils IT',
    shortTitle: 'Profils',
    subtitle: 'Cyber, Data, DevOps',
    description: 'Cybersécurité, Data & IA, DevOps, Cloud, Product Ownership, Scrum Master et chefferie de projet.',
    benefits: ['Réseau d\'experts', 'Missions adaptées', 'Écosystème tech'],
    ctaLabel: 'Voir les profils',
    href: '/consultants',
    icon: (
      <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  }
];

const CHIPS = [
  { label: 'Frais transparents', shortLabel: 'Frais', href: '/portage-salarial' },
  { label: 'Nos agences', shortLabel: 'Agences', href: '/agences' },
  { label: 'Conseiller dédié', shortLabel: 'Conseiller', href: '/portage-salarial' },
  { label: 'Paie en début de mois', shortLabel: 'Paie', href: '/faq' },
];

export default function HeroNodeNetwork({ variant = 'all' }: { variant?: 'all' | 'desktop' | 'mobile' } = {}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCard = MAIN_CARDS.find(c => c.id === activeId);

  const handleClose = () => {
    if (!activeId || isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setActiveId(null);
      setIsClosing(false);
    }, 180);
  };

  const handleSelect = (id: string) => {
    if (activeId === id) {
      handleClose();
    } else {
      setActiveId(id);
      setIsClosing(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') handleClose();
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeId, isClosing]);

  return (
    <div className={`w-full relative z-20 ${variant === 'mobile' ? '' : 'mt-8 lg:mt-10'}`} ref={containerRef}>

      {/* =========================================
          DESKTOP LAYOUT (Clean Grid + Popover)
          ========================================= */}
      {(variant === 'all' || variant === 'desktop') && (
        <div className={`${variant === 'all' ? 'hidden lg:block' : ''} relative w-full`}>
          <div className="grid grid-cols-2 gap-4 max-w-[480px] relative z-10">
            {MAIN_CARDS.map((card, idx) => {
              const isActive = activeId === card.id;
              const staggerDelay = `${(idx + 1) * 80}ms`;
              const floatDelay = `${idx * 0.4}s`;
              const floatDuration = `${5 + (idx % 2) * 1.5}s`;

              return (
                <div
                  key={card.id}
                  className="animate-card-entrance"
                  style={{ '--delay': staggerDelay } as React.CSSProperties}
                >
                  <button
                    onClick={() => handleSelect(card.id)}
                    style={{ '--float-delay': floatDelay, '--float-duration': floatDuration } as React.CSSProperties}
                    className={`hero-card group relative text-left p-5 rounded-[22px] flex flex-col items-start justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B45A] animate-idle-float w-full max-w-[260px] h-auto min-h-[104px] transition-all duration-300 hover:-translate-y-[6px] hover:scale-[1.015] ${isActive
                      ? 'bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(250,248,243,0.84))] border border-[#D6B45A] outline outline-1 outline-transparent shadow-[0_32px_64px_rgba(11,16,32,0.14),0_12px_24px_rgba(214,180,90,0.20)] z-10'
                      : 'bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(250,248,243,0.84))] border border-[rgba(255,255,255,0.7)] outline outline-1 outline-[rgba(25,43,99,0.06)] shadow-[0_20px_50px_rgba(11,16,32,0.08),0_4px_16px_rgba(11,16,32,0.04)] hover:border-[rgba(214,180,90,0.65)] hover:outline-transparent hover:shadow-[0_32px_64px_rgba(11,16,32,0.14),0_12px_24px_rgba(214,180,90,0.12)]'
                      }`}
                    aria-expanded={isActive}
                  >
                    {/* Subtle inner glow for active card */}
                    {isActive && <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[#D6B45A]/5 to-transparent opacity-100 pointer-events-none" />}

                    <div className="flex items-center w-full gap-[14px] relative z-10">
                      <div className={`w-[48px] h-[48px] shrink-0 rounded-[14px] flex items-center justify-center transition-all duration-300 bg-[linear-gradient(145deg,#ffffff,#f1eee6)] ${isActive ? 'text-[#D6B45A] shadow-[inset_0_2px_2px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(11,16,32,0.02),0_14px_28px_rgba(214,180,90,0.30),0_4px_12px_rgba(214,180,90,0.15)] ring-1 ring-[#D6B45A]/20' : 'text-[#192B63] group-hover:text-[#D6B45A] shadow-[inset_0_2px_2px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(11,16,32,0.03),0_14px_28px_rgba(11,16,32,0.14),0_4px_12px_rgba(11,16,32,0.05)]'
                        }`}>
                        {card.icon}
                      </div>
                      <div className="flex flex-col flex-1 text-left">
                        <span className={`text-[16px] font-bold leading-[1.2] transition-colors duration-200 ${isActive ? 'text-[#192B63]' : 'text-[#0B1020]'
                          }`}>
                          {card.title}
                        </span>
                        <span className="text-[13.5px] text-[#0B1020]/60 mt-1 leading-[1.3]">
                          {card.subtitle}
                        </span>
                      </div>
                      <div className={`shrink-0 transition-all duration-300 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 ${isActive ? 'text-[#D6B45A] opacity-100 translate-x-1' : 'text-[#192B63] group-hover:text-[#D6B45A]'
                        }`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    {isActive && (
                      <>
                        <div className="absolute top-1/2 -right-[5px] w-[10px] h-[10px] rounded-full bg-white border-2 border-[#D6B45A] -translate-y-1/2 z-10 shadow-sm" />
                        <svg className="absolute top-1/2 left-[100%] w-[2rem] h-2 -translate-y-1/2 pointer-events-none z-0" preserveAspectRatio="none">
                          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(214, 180, 90, 0.45)" strokeWidth="1.5" className="animate-line-draw" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2 mt-5 max-w-[480px] animate-card-entrance" style={{ '--delay': '400ms' } as React.CSSProperties}>
            {CHIPS.map((chip, idx) => {
              const floatDelay = `${idx * 0.2 + 0.5}s`;
              return (
                <a
                  key={idx}
                  href={chip.href}
                  style={{ '--float-delay': floatDelay, '--float-duration': '4s' } as React.CSSProperties}
                  className="hero-chip animate-idle-float group px-3.5 py-2 rounded-full border border-[rgba(255,255,255,0.8)] outline outline-1 outline-[rgba(25,43,99,0.06)] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(250,248,243,0.95))] shadow-[0_8px_20px_rgba(11,16,32,0.06),0_2px_8px_rgba(11,16,32,0.03)] text-[0.88rem] text-[#0B1020]/75 font-medium hover:bg-white hover:text-[#192B63] hover:shadow-[0_12px_24px_rgba(11,16,32,0.08)] transition-all duration-220 inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-porters-gold"
                >
                  {chip.label}
                  <svg className="w-3.5 h-3.5 text-[#0B1020]/40 transition-transform duration-220 group-hover:translate-x-0.5 group-hover:text-[#192B63]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              );
            })}
          </div>

          {activeCard && (
            <div className={`absolute top-0 left-[500px] w-[340px] max-w-[calc(100vw-520px)] transform transition-all duration-300 pointer-events-none z-20`}>
              <div className={`bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(250,248,243,0.95))] rounded-[28px] p-7 shadow-[0_30px_60px_rgba(11,16,32,0.15)] border border-white outline outline-1 outline-[#192B63]/10 relative pointer-events-auto ${isClosing ? 'animate-panel-close' : 'animate-panel-open'}`}>

                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#192B63]/10 text-[#192B63]/40 hover:text-[#192B63]/70 transition-colors"
                  aria-label="Fermer"
                >
                  <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h3 className="text-[28px] font-bold text-[#192B63] leading-[1.1] mb-3 pr-6">
                  {activeCard.title}
                </h3>

                <p className="text-[16px] text-[#0B1020]/75 mb-6 leading-relaxed">
                  {activeCard.description}
                </p>

                <ul className="mb-8 space-y-3">
                  {activeCard.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-[#192B63]/85">
                      <svg className="w-[18px] h-[18px] text-[#D6B45A] shrink-0 mt-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={activeCard.href}
                  className="btn group w-full flex items-center justify-center gap-2.5 bg-[#192B63] text-white hover:bg-[#192B63]/90 h-[56px] rounded-[14px] font-medium text-[16px] transition-all duration-220 hover:-translate-y-0.5 active:scale-95 shadow-[0_8px_20px_rgba(25,43,99,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B45A]"
                >
                  {activeCard.ctaLabel}
                  <svg className="w-[20px] h-[20px] transition-transform duration-220 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================
          MOBILE LAYOUT (Compact 2x2 Grid + Accordion)
          ========================================= */}
      {(variant === 'all' || variant === 'mobile') && (
        <div className={`${variant === 'all' ? 'lg:hidden' : ''} w-full`}>
          {/* Compact 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {MAIN_CARDS.map((card) => {
              const isActive = activeId === card.id;
              return (
                <button
                  key={`mobile-${card.id}`}
                  onClick={() => handleSelect(card.id)}
                  className={`w-full h-[105px] rounded-[20px] transition-all duration-300 border flex flex-col items-center justify-center gap-[8px] focus:outline-none ${isActive
                    ? 'bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(250,248,243,0.84))] border-[#D6B45A] shadow-[0_24px_50px_rgba(11,16,32,0.14),0_8px_20px_rgba(214,180,90,0.20)] ring-1 ring-[#D6B45A]/30'
                    : 'bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(250,248,243,0.84))] border-[rgba(255,255,255,0.8)] outline outline-1 outline-[rgba(25,43,99,0.06)] shadow-[0_20px_45px_rgba(11,16,32,0.10),0_4px_12px_rgba(11,16,32,0.05)] hover:border-[#D6B45A]/50 hover:shadow-[0_24px_50px_rgba(11,16,32,0.14)]'
                    }`}
                  aria-expanded={isActive}
                >
                  <div className={`w-[48px] h-[48px] shrink-0 rounded-[14px] flex items-center justify-center transition-colors duration-300 bg-[linear-gradient(145deg,#ffffff,#f1eee6)] ${isActive ? 'text-[#D6B45A] shadow-[inset_0_2px_2px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(11,16,32,0.02),0_12px_24px_rgba(214,180,90,0.30),0_4px_10px_rgba(214,180,90,0.15)]' : 'text-[#192B63] shadow-[inset_0_2px_2px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(11,16,32,0.03),0_12px_24px_rgba(11,16,32,0.14),0_4px_10px_rgba(11,16,32,0.05)]'
                    }`}>
                    {card.icon}
                  </div>
                  <span className={`text-[15px] font-bold leading-tight ${isActive ? 'text-[#192B63]' : 'text-[#0B1020]'
                    }`}>
                    {card.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Secondary Chips (Mobile) */}
          <div className="flex flex-wrap gap-2 mb-6 animate-fade-up" style={{ animationDelay: '300ms' }}>
            {CHIPS.map((chip, idx) => (
              <a
                key={`mobile-chip-${idx}`}
                href={chip.href}
                className="h-[38px] px-3.5 flex items-center gap-1.5 rounded-full bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(250,248,243,0.95))] border border-[rgba(255,255,255,0.8)] outline outline-1 outline-[rgba(25,43,99,0.06)] shadow-[0_8px_20px_rgba(11,16,32,0.06),0_2px_8px_rgba(11,16,32,0.03)] text-[13.5px] text-[#0B1020]/80 font-medium hover:text-[#192B63] hover:bg-white transition-all duration-200 active:scale-95"
              >
                {chip.label}
                <svg className="w-3.5 h-3.5 text-[#0B1020]/40 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>

          {/* Active Detail Panel Accordion (Mobile) */}
          <div className={`overflow-hidden transition-all duration-220 ease-in-out ${activeCard && !isClosing ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-2'}`}>
            {activeCard && (
              <div className="bg-white rounded-[16px] p-5 shadow-lg border border-porters-gold/30 relative mb-4 mx-auto w-full">
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 p-1 rounded-md text-porters-navy/40"
                  aria-label="Fermer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h3 className="text-[1.1rem] font-bold text-porters-navy mb-1 pr-6">
                  {activeCard.title}
                </h3>
                <p className="text-[0.95rem] text-porters-black/70 mb-3 leading-snug">
                  {activeCard.subtitle}
                </p>

                <ul className="mb-4 space-y-1.5">
                  {activeCard.benefits.slice(0, 2).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-[0.9rem] text-[#192B63]/80">
                      <svg className="w-3.5 h-3.5 text-[#D6B45A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={activeCard.href}
                  className="btn w-full flex items-center justify-center gap-2 bg-[#192B63] text-white h-[42px] rounded-[10px] font-semibold text-[15px] transition-transform active:scale-95"
                >
                  {activeCard.ctaLabel}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
