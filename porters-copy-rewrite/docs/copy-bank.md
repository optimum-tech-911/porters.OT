# THE PORTERS — COPY BANK (FR)

**Version** 1.0 · Companion to `docs/copy-plan.md` and `docs/fact-base.md`

Every block below is production-ready French. The agent places them; it does not rewrite them. Where a block offers **Sobre / Affirmé**, the client picks one register and that choice applies to the whole site — not block by block.

**Why this file exists:** the supplemental pack shipped ten ready-made French blocks. They are safe and they are wrong. Each one describes The Porters as an intermediary — *met en relation*, *rapproche*, *aide à identifier* — which is precisely the perception this project exists to change (copy-plan §2.1). The rewrites below add **no new claim**. Every one is traceable to a `PUBLISHABLE` fact ID. What changes is that they describe work being done rather than introductions being made.

---

## CB-01 · Expertises — introduction générale

> ❌ **Pack version:** « Des enjeux de cybersécurité aux projets data, cloud, DevOps et agiles, PORTERS aide les entreprises à identifier les compétences nécessaires à leurs transformations numériques. Notre rôle est de rapprocher un besoin précis, un contexte de mission et des talents capables d'y répondre avec justesse. »
> *Problems: « aide à identifier » + « rapprocher » = broker posture · « transformations numériques » = §5.2 · « avec justesse » = empty qualifier.*

**Sobre**
> Cybersécurité, data, intelligence artificielle, cloud, DevOps, agilité. Nos consultants interviennent sur ces métiers en mission longue comme sur des périmètres courts. Décrivez le contexte technique, le périmètre et le niveau d'autonomie attendu : nous vous proposons des profils qualifiés sur ces critères.

**Affirmé**
> Cybersécurité, data, IA, cloud, DevOps, agilité. Ce ne sont pas des mots-clés : ce sont les métiers que nous plaçons toute l'année. Donnez-nous le contexte technique et le périmètre — nous répondons avec des profils.

*Facts: F-D02, F-D04 · Pages: `/expertises`*

---

## CB-02 · Approche humaine

> ❌ **Pack version:** « La réussite d'une mission dépend autant des compétences techniques que de la qualité de la relation. PORTERS maintient un accompagnement attentif avant, pendant et après le démarrage… »
> *Problem: « accompagnement attentif » is the exact filler §5.2 bans. It also asserts a value without evidencing it.*

**Sobre**
> Un interlocuteur unique suit votre dossier, de la première conversation à la fin de mission. Il connaît votre contrat, votre client et votre situation. Vous ne réexpliquez pas votre dossier à chaque appel.

**Affirmé**
> Un seul interlocuteur, du premier échange à la fin de mission. Il connaît votre contrat, votre client et votre situation. Vous n'aurez jamais à réexpliquer votre dossier.

*The differentiator is not "we care". It is "you don't repeat yourself" — concrete, checkable, and directly sourced.*
*Facts: F-B14 (interlocuteur unique, `LB2024` « PAS DE FRAIS CACHÉS » item 3) · Pages: `/`, `/consultants`, `/tarifs`*

---

## CB-03 · Qualification du besoin

> ❌ **Pack version:** « Chaque besoin possède ses propres contraintes : environnement technique, organisation, calendrier, niveau d'autonomie ou enjeux métier. Nous commençons par les comprendre avant de rechercher le profil le plus cohérent. »
> *Closest to usable of the ten. Still hedged — « le plus cohérent » promises nothing.*

**Sobre**
> Environnement technique, organisation en place, calendrier, niveau d'autonomie attendu, contraintes de sécurité. Nous cadrons ces cinq points avant de proposer un seul CV.

*Facts: F-D02 · Pages: `/entreprises`*

---

## CB-04 · Cybersécurité — ⚠️ conditionné à Q11

**Sobre**
> Gouvernance, audit, risques et conformité, sécurité opérationnelle, sensibilisation des équipes : un projet cyber mobilise rarement une seule compétence. Nous identifions les profils adaptés au niveau de maturité réel de votre organisation — pas au niveau visé.

*The second sentence is the whole value proposition and it costs nothing legally. Everyone sells the target state; almost nobody acknowledges the starting point.*
*Facts: `PACK` §3.1 (R3) · Pages: `/expertises` hub cyber*
⛔ Ne pas ajouter : pentest, SOC, CERT, ISO 27001, certification RGPD (copy-plan §10.7).

---

## CB-05 · Data & intelligence artificielle

**Sobre**
> Un projet data ou IA échoue rarement sur le modèle. Il échoue sur la qualité des données, l'architecture ou l'industrialisation. Nous mobilisons des profils capables d'intervenir sur ces trois étapes : cadrage, ingénierie, mise en production.

*Facts: F-P01, F-P03, R4 · Pages: `/expertises` hub data & IA*

---

## CB-06 · Cloud & DevOps

**Sobre**
> Architecture, migration, CI/CD, Infrastructure as Code, conteneurisation, observabilité, sécurité des environnements. Nos consultants interviennent sur des socles récents comme sur des environnements historiques encore critiques pour la production.

*The second sentence is the differentiator, and it is fully sourced. Most ESNs only sell greenfield; legacy is where the actual pain is.*
*Facts: F-D08, F-P01, F-P02, F-R12 · Pages: `/expertises` hub cloud & DevOps*
⚠️ Si des outils sont nommés (Terraform, Kubernetes, Grafana…) : « nos consultants interviennent sur », jamais « nous maîtrisons » (F-R12, Q16).

---

## CB-07 · Agilité & transformation

**Sobre**
> Product Owner, Scrum Master, Agile Coach, Business Analyst, Release Train Engineer, architecte. L'agilité n'est pas un objectif en soi : c'est une manière de coordonner. Nos consultants s'alignent sur vos processus existants plutôt que d'imposer un cadre.

*The third sentence is a real, sourced, differentiating claim — and the single most reassuring thing you can say to a DSI who has already survived one transformation programme.*
*Facts: F-D05, F-D04, R2 · Pages: `/expertises` hub agilité*

---

## CB-08 · Consultant — prise de contact

> ❌ **Pack version:** « Nous cherchons à comprendre votre expérience, vos compétences, vos attentes et le type d'environnement dans lequel vous souhaitez évoluer. L'objectif est de construire une relation lisible… »

**Sobre**
> Parlez-nous de votre parcours, de vos technologies et du type de mission que vous cherchez. Nous vous disons ce que nous avons, ce que nous n'avons pas, et dans quel délai nous pouvons vous répondre.

*« ce que nous n'avons pas » is the line that builds trust. It is also a commitment to inform, not a promise to deliver — legally safe.*
*Pages: `/consultants`, `/rendez-vous`*

---

## CB-09 · CTA entreprise

**Sobre**
> Un besoin précis à couvrir ou une équipe projet à structurer ? Décrivez le contexte : nous revenons vers vous avec des profils, pas avec une plaquette.

*Pages: `/entreprises`, `/contact`*

---

## CB-10 · CTA consultant

**Sobre**
> Vous voulez savoir ce que votre TJM donne en net ? Le simulateur répond en quelques minutes.

<!-- TODO-CLIENT: le simulateur exige-t-il la création d'un compte ? Si non, ajouter « sans créer de compte » — c'est un argument de conversion fort. -->
*Pages: `/`, `/simulateur`*

---

## CB-11 · Comment nous travaillons — 4 étapes

> ❌ **Pack version:** *Comprendre le besoin · Identifier les compétences adaptées · Sécuriser le démarrage · Maintenir un suivi humain et opérationnel.* The pack flags this itself as an inference, not a documented process.
> ✅ **Below is the real process**, taken from the tender document where it is described in detail. It is more specific, more credible, and it is already what the company does.

**1 · Cadrage**
> Nous qualifions le besoin : périmètre, environnement technique, contraintes de sécurité et de conformité, mode de fonctionnement attendu.

**2 · Sélection**
> Analyse du parcours réel, évaluation sur référentiels métiers (CIGREF, SYNTEC, ROME), entretiens structurés — RH et technique — puis tests ou mise en situation lorsque le périmètre l'exige.

**3 · Démarrage**
> Contractualisation, ouverture des accès, intégration aux outils et aux processus déjà en place. Les profils sont transmis sous forme anonymisée.

**4 · Suivi**
> Points d'avancement à une fréquence définie au cadrage, avec un relais identifié dans l'équipe pour qu'aucun suivi ne dépende d'une seule personne.

*Facts: F-D01, F-D02, F-D03, F-D07 · Pages: `/entreprises`, `/`*
⚠️ **Q15** : confirmer que ce processus s'applique hors marchés publics. Sinon ce bloc est à réécrire.

---

## CB-12 · Frais — `/tarifs`

The single highest-leverage block on the site. Structure, not final wording — the percentage decision (Q5, F-C15) determines the opening sentence.

**Ce que couvrent nos frais de gestion**
> 1 · **Avance de trésorerie** — vous êtes payé dès le premier mois, avant même que votre client nous règle sa première facture.
> 2 · **Apport d'affaires** — nous vous proposons des missions issues de nos partenaires ; vous restez libre de trouver les vôtres.
> 3 · **Interlocuteur unique** — une seule personne suit votre dossier.
> 4 · **Gestion administrative complète** — contrat, facturation, paie, déclarations sociales et fiscales.
> 5 · **Responsabilité civile professionnelle** — vous êtes couvert en cas de dommage causé chez un client.
> 6 · **Financement des formations** — CPF, OPCO, certifications.
> 7 · **Garantie financière** — dispositif obligatoire qui sécurise le versement de votre salaire.

**Ce qui n'est pas inclus**
<!-- TODO-CLIENT: à compléter. Une page qui ne liste que des inclusions n'est pas transparente — c'est la section qui fera la différence. -->

*Facts: F-B12, F-B13, F-B14, F-C15 · Page: `/tarifs`*
⚠️ Aucun chiffre dans ce bloc tant que F-C15 et F-C05/06/07 ne sont pas confirmés.

---

## CB-13 · Projets — formulations anonymisées publiables

Use verbatim. Confidential source, publishable output.

> **Migration d'un socle Big Data** — passage de Hortonworks à Cloudera Data Platform pour un organisme public national. Profils mobilisés : architecte système, expert Big Data, développeur senior.

> **Développements en environnement IBM i / AS400** — applications métier cœur du logement social : analyse des besoins, développements spécifiques, maintenance corrective et évolutive. Profils : analyste programmeur, chef de projet applicatif.

> **Reprise en main de modèles de données** — audit de l'existant, recommandations d'outils, mise en place d'applicatifs internes chez un industriel. Profils : architecte données, data scientist, développeur fullstack.

*Facts: F-P01, F-P02, F-P03 · Pages: `/expertises`, `/entreprises`*
⛔ Jamais de nom de client, de numéro de lot, de référence CCTP ni de GIE.

---

## Vocabulaire de remplacement — aide-mémoire

| Au lieu de | Écrire |
|---|---|
| nous accompagnons | nous facturons / déclarons / plaçons / cadrons / suivons |
| mise en relation | *(reformuler autour du travail réel)* |
| solution sur-mesure | *(dire laquelle)* |
| une rémunération sécurisée | payé le 5 du mois suivant |
| une expertise reconnue | 5 étapes de sélection, référentiels CIGREF/SYNTEC/ROME |
| nous sommes présents partout en France | *(dire ce qui est vrai localement — Q2)* |
| des profils qualifiés | qualifiés sur quoi, par qui, comment |
