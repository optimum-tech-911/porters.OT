# The Porters — post-upgrade content audit

Date: 27 June 2026

## Nine-point report coverage

| # | Requirement | Current implementation |
|---|---|---|
| 01 | IT consultant targeting | Implemented in the Enterprise-first homepage hero, navigation and four dedicated expertise routes: Cybersecurity, Data & AI, DevOps & Cloud, Agility & Coaching. |
| 02 | Pay within five working days and treasury advance | Implemented in the hero trust strip, pricing page, homepage benefits and FAQ. Contractual conditions remain clearly stated. |
| 03 | Transparent pricing with real rate | Implemented. The site and simulator display a 10% management fee, included services and a EUR 500 monthly real-expense baseline. |
| 04 | Five-agency national presence | Implemented for Paris, Lyon, Marseille, Montpellier and Toulouse, with full service content and local FAQs. Unconfirmed street addresses are not invented. |
| 05 | RSE commitment | Implemented through a dedicated RSE page covering digital sobriety, inclusion, proximity, transparency and a measurable roadmap. No unverified certification is claimed. |
| 06 | Revenue simulator with lead details | Frontend implemented with project assumptions, named IT profiles, contact fields and mandatory GDPR consent. Production persistence, PDF/email delivery and CRM notification still require a backend destination. |
| 07 | Online appointment booking | The complete qualification and availability-request journey is implemented. A live slot picker still requires the client's official Calendly, Cal.com or Microsoft Bookings link. |
| 08 | Credible testimonials / verified reviews | Named testimonials from the migrated site are displayed with role and location context. No rating, photograph or Google/Trustpilot verification is invented. An official review widget requires the client's account/link and publication consent. |
| 09 | Honest mission-search FAQ | Implemented. The answer clearly separates positioning, network, prospecting advice and mission framing from any guarantee of a mission. |

## Client email and spreadsheet coverage

- Enterprise and Consultant journeys are separated in both the hero and navigation; Enterprise is the default landing state.
- The homepage surfaces +150 current missions, 10+ years of support, five cities, national/international response and one stable contact.
- Four status paths are visible: portage salarial, CDI, CDD and freelance.
- Enterprise advantages cover fast sourcing, zero HR administration, international response, contractual flexibility and stable follow-up.
- Consultant advantages cover proximity, tailored support, transparent fees, treasury advance and beginning-of-month pay.
- Client and ESN logo rows use the supplied logo assets and requested organization names.
- About, team, agencies, recruitment, resources, FAQ, pricing and RSE destinations are linked from the main navigation or footer.
- The desktop header centers a larger wordmark, places audience navigation on the left, actions on the right, and adds account access, appointment and simulator controls.
- The header hides on downward scroll, reappears on upward scroll or top-edge hover, and the mobile menu opens as a full-viewport right-side drawer.

## Inputs still required for production completion

1. Authentication provider and account model for a true secure consultant/company area.
2. Official live-booking URL or account credentials.
3. Official Google Reviews or Trustpilot profile, approved testimonial photos and publication consent.
4. Confirmed physical addresses and direct local contacts where the client has not supplied them.
5. Lead-processing destination for the simulator and contact forms (CRM, email service or server endpoint).

## Implementation addendum — 29 June 2026

The final refinement pass added the remaining items that could be implemented from reliable content:

- Reintroduced a compact rotating testimonial bar in the homepage hero, with reduced-motion support.
- Removed the hero pause control and corrected the desktop/mobile journey-rail sizing.
- Rebuilt the two floating promises and the audience stat as one transparent navy glass-card family using dedicated 3D visual assets.
- Added link, keyboard and hover states to every hero proof/journey card, manual controls to the testimonial and mobile rails, and a four-second automatic cadence.
- Reorganized the mobile audience/journey area into rounded segmented controls plus one compact active step, and replaced the flat mobile navigation list with an accordion drawer.
- Added a visible Google Reviews entry without publishing an unverified score or review count.
- Linked recruitment directly to the current The Porters HelloWork company page while preserving spontaneous applications.
- Separated the simulator into two explicit tools: portage from monthly turnover, and freelance from TJM × invoiced days. TJM is not displayed in the portage tool.
- Added Aix-en-Provence and aligned the primary agency presentation to Paris, Lyon, Aix-en-Provence and Montpellier.
- Added an enterprise choice block explaining when portage salarial or an ESN-style sourcing route is the better fit.
- Added public activity/solidity markers to the enterprise page and a commercial-responsiveness benefit for consultants.

### Deliberately left pending

1. Team biographies, roles and portraits: the client has not supplied validated team information or reusable photos.
2. Team, brand and testimonial videos: no approved source files, embeds or publication consent are available.
3. Numeric Google rating and review count: the badge links to reviews, but the site will not invent or freeze a score until the client supplies a verified current value.
4. Simulator/contact persistence and PDF/email delivery: the frontend is complete, but a CRM, email service or server endpoint is still required.
5. Live booking slots: the qualification journey exists, but a client-owned Calendly, Cal.com or Microsoft Bookings destination is still required.
