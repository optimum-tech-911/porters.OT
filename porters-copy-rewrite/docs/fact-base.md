# THE PORTERS — BINDING FACT BASE

**Version** 1.0 · Companion to `docs/copy-plan.md`
**Rule** No fact reaches a public page unless its row here reads `PUBLISHABLE`. No exceptions, no rounding, no "it's probably still true".

---

## How to use this file

**Agent:** you may **add** rows. You may **never change a status**. Only the client changes a status, and when they do they fill `approved_by` and `approved_on`. If you need a fact that has no row, create the row with status `VERIFY_BEFORE_USE`, leave `statement` as what the source says, and stop.

**Client:** your job is the `status` column. Work top-down through `VERIFY_BEFORE_USE` and `CLIENT_APPROVAL_REQUIRED`. Each one is either promoted to `PUBLISHABLE` (with a date and, where relevant, a corrected value) or demoted to `DO_NOT_PUBLISH`. There is no third option and no "leave it for now" — an undecided fact blocks a page.

### Status model

| Status | Meaning | Publishable |
|---|---|---|
| `PUBLISHABLE` | Verified, current, cleared | ✅ |
| `VERIFY_BEFORE_USE` | Real, but stale / undated / unsourced | ⚠️ after confirmation |
| `CLIENT_APPROVAL_REQUIRED` | Needs written authorisation (names, logos, volumes, testimonials) | ❌ until recorded |
| `DO_NOT_PUBLISH` | Confidential, personal data, placeholder, incompatible | ❌ never |

### Source labels

| Label | Document |
|---|---|
| `LB2024` | Livre Blanc The Porters, édition 2024 |
| `MT-LOT1` | Mémoire Technique — Accord-cadre CDC Habitat, Lot n°1 |
| `DECK-AGILITY` | L'agilité dans l'IT (deck legacy, 30 pp., 11/12/2024) |
| `DECK-EXPERTISE` | Deck legacy ESN — cyber, data, IA, cloud, DevOps (15 pp.) |
| `PACK` | `Claude_PORTERS_information.txt` — consolidation des deux decks |
| `DOC-DATA-IA` | `BIG_DATA___IA_.docx` — ⚠️ document KwickStart, voir copy-plan §7.4 |
| `SITE-LIVE` | www.porters.fr |
| `SITE-STAGING` | porters-ot.pages.dev |
| `REGISTRY` | Registres publics d'entreprises |

> **Naming rule for the agent:** never use the string `KwickStart` as a source label, a variable name, a comment, or anything else in the repository.

---

# A. IDENTITY & GROUP

| ID | Statement | Source | Status | Target pages | Notes |
|---|---|---|---|---|---|
| F-A01 | The Porters, société de portage salarial, créée en 2016 | `LB2024`, `REGISTRY` | `PUBLISHABLE` | `/`, `/qui-sommes-nous` | |
| F-A02 | Adhérente à la FEPS (Fédération des Entreprises de Portage Salarial) | `LB2024` | `PUBLISHABLE` | `/qui-sommes-nous`, footer | Vérifier que l'adhésion est toujours en cours |
| F-A03 | The Big Porters, ESN spécialisée IT, créée en 2018, entité du Groupe Porters | `MT-LOT1` p.3 | `PUBLISHABLE` | `/qui-sommes-nous` | Conditionné à Q1 |
| F-A04 | KwickStart est une entité du groupe (Marseille, Région Sud) | `REGISTRY` | `CLIENT_APPROVAL_REQUIRED` | `/qui-sommes-nous` | Q1 : marque séparée ou intégrée ? |
| F-A05 | Siège social Montpellier ; bureaux Paris | `MT-LOT1` p.3 | `VERIFY_BEFORE_USE` | footer, `/agences`, mentions légales | ⚠️ Contredit F-A06 et F-A07 |
| F-A06 | 4 agences : Paris, Lyon, Montpellier, Aix-Marseille | `SITE-STAGING` | `VERIFY_BEFORE_USE` | `/agences` ×5 | ⚠️ Contredit F-A05 et F-A07 |
| F-A07 | 6 agences : + Bordeaux, Lille | `SITE-LIVE` | `VERIFY_BEFORE_USE` | — | ⚠️ Probablement obsolète |
| F-A08 | 7 régions marquées sur la carte : Nord, IdF, Rhône-Alpes, Bordeaux/Ouest, Sud-Ouest, Occitanie, PACA | `PACK` §6.1 | `DO_NOT_PUBLISH` | — | Couverture de marché, pas implantations. Ne jamais afficher comme bureaux |
| F-A09 | Effectif The Big Porters : 11 | `MT-LOT1` p.3 | `DO_NOT_PUBLISH` | — | Exact, mais entre en contradiction visuelle avec F-V01 |
| F-A10 | CA 2025 880 K€ / Groupe 5,2 M€ ; 2024 680 K€ / 4,9 M€ ; 2023 500 K€ / 4,5 M€ | `MT-LOT1` p.3 | `DO_NOT_PUBLISH` | — | Document confidentiel d'appel d'offres |
| F-A11 | Contact : contact@porters.fr | `LB2024` | `PUBLISHABLE` | `/contact`, footer | |

> 🔴 **F-A05 / F-A06 / F-A07 / F-A08 are mutually incompatible.** All four pages that depend on them are blocked until Q2 is answered. Distinguish: *bureau physique* / *couverture commerciale* / *consultants en mission*. Displaying the third as if it were the first is a misleading commercial claim.

---

# B. PORTAGE SALARIAL — MECHANISM

| ID | Statement | Source | Status | Target pages |
|---|---|---|---|---|
| F-B01 | Encadré par le Code du travail ; ANI 2008 ; ordonnance du 2 avril 2015 | Public | `PUBLISHABLE` | `/portage-salarial`, FAQ |
| F-B02 | Relation tripartite : salarié porté / entreprise cliente / société de portage | `LB2024` | `PUBLISHABLE` | `/portage-salarial` |
| F-B03 | Le salarié porté est régi par un contrat de travail (CDI ou CDD) | `LB2024` | `PUBLISHABLE` | `/portage-salarial`, `/consultants` |
| F-B04 | Statut cadre, permettant la cotisation à la retraite complémentaire | `LB2024` | `PUBLISHABLE` | `/consultants` |
| F-B05 | Régime général de la Sécurité sociale, prévoyance, cotisations retraite, congés payés, assurance chômage, mutuelle collective | `LB2024` | `PUBLISHABLE` | `/portage-salarial`, `/consultants` |
| F-B06 | 2,5 jours ouvrés de congés payés acquis par mois | Code du travail | `PUBLISHABLE` | `/consultants`, FAQ |
| F-B07 | Autonomie totale : le salarié porté choisit ses missions, négocie ses tarifs, sans lien hiérarchique ni chez le client ni chez The Porters | `LB2024` | `PUBLISHABLE` | `/portage-salarial` — **argument central** |
| F-B08 | Cumul possible avec un emploi salarié (accord de l'employeur, 48 h/semaine max cumulées) ou avec une retraite | `LB2024` | `PUBLISHABLE` | FAQ |
| F-B09 | France entière, télétravail possible ; client français ou étranger, en France ou à l'étranger | `LB2024` | `PUBLISHABLE` | `/portage-salarial`, FAQ |
| F-B10 | Exclus : professions réglementées et services à la personne | `SITE-STAGING` FAQ | `PUBLISHABLE` | FAQ |
| F-B11 | Compte de trésorerie dédié : provisionner la rupture conventionnelle, lisser la paie, financer des congés | `LB2024` | `PUBLISHABLE` | `/consultants` — **différenciant, mal expliqué aujourd'hui** |
| F-B12 | RC professionnelle de The Porters couvrant le salarié porté | `LB2024` | `PUBLISHABLE` | `/tarifs`, `/consultants` |
| F-B13 | Garantie financière (dispositif obligatoire) | `LB2024` | `PUBLISHABLE` | `/tarifs` |
| F-B14 | Rémunération dès le 1er mois, avant le règlement de la 1re facture client | `LB2024` | `VERIFY_BEFORE_USE` | `/tarifs` — **le meilleur argument du corpus.** Confirmer que la pratique est toujours en vigueur |

---

# C. FIGURES — ALL STALE, NONE PUBLISHABLE AS-IS

> Every row below is dated 2023–2024. We are in 2026. Publishing any of them undated is a factual error. **Rule: a figure carrying a year displays that year, or it does not appear.**

| ID | Statement | Value in source | Source | Status | Action |
|---|---|---|---|---|---|
| F-C01 | Salariés portés en France | 200 000 (2023) | `LB2024` | `VERIFY_BEFORE_USE` | Chiffre FEPS/PEPS le plus récent, ou dater explicitement |
| F-C02 | Croissance du secteur 2013→2023 | +390 % | `LB2024` | `VERIFY_BEFORE_USE` | Dater ou omettre |
| F-C03 | Croissance annuelle moyenne | +20 % | `LB2024` | `VERIFY_BEFORE_USE` | Dater ou omettre |
| F-C04 | CA du secteur | 2,4 Mds€ (2024) | `LB2024` | `VERIFY_BEFORE_USE` | Dater ou omettre |
| F-C05 | Mutuelle | 41,53 €/mois, dont 20,77 € pris en charge | `LB2024` | `VERIFY_BEFORE_USE` | **Confirmation service paie obligatoire** |
| F-C06 | Provision rupture conventionnelle | 2,18 % | `LB2024` | `VERIFY_BEFORE_USE` | Idem |
| F-C07 | Frais de rupture conventionnelle | 380 € | `LB2024` | `VERIFY_BEFORE_USE` | Idem |
| F-C08 | Plafond mensuel Sécurité sociale | 3 666 € « en 2023 » | `LB2024` | `DO_NOT_PUBLISH` | Valeur 2026 obligatoire, ou supprimer le chiffre |
| F-C09 | IJ maladie | 50 % du salaire journalier de base, 3 jours de carence | `LB2024` | `VERIFY_BEFORE_USE` | Paramètres CPAM révisés régulièrement |
| F-C10 | Relais prévoyance | au-delà de 90 jours d'arrêt | `LB2024` | `VERIFY_BEFORE_USE` | Idem |
| F-C11 | Congé maternité | 16 semaines (6 prénatal + 10 postnatal) | `LB2024` | `VERIFY_BEFORE_USE` | Vérifier le droit en vigueur |
| F-C12 | Congé paternité | 4 jours + 21 jours | `LB2024` | `VERIFY_BEFORE_USE` | Idem |
| F-C13 | Cooptation | 1 journée de TJM (cooptant) / ½ journée (coopté) | `LB2024` | `VERIFY_BEFORE_USE` | Offre toujours active ? |
| F-C14 | Délais de paie | CRA avant le 20 → paiement J+1 à J+5 ouvrés ; CRA du 20 au 31 → à partir du 10e jour ouvré | `LB2024` | `VERIFY_BEFORE_USE` | Process inchangé ? |
| F-C15 | Taux de frais de gestion | non publié | — | `CLIENT_APPROVAL_REQUIRED` | **Q5. Recommandation : publier.** |
| F-C16 | « 97 % de collaborateurs satisfaits » | — | `SITE-LIVE` | `DO_NOT_PUBLISH` | Aucune source, aucun n, aucune période. Supprimer ou sourcer |
| F-C17 | Croissance de la demande par rôle (Scrum Master +40 %, PO +45 %, Agile Coach +50 %, DevOps +60 %) | 2019–2024 | `DECK-AGILITY` | `DO_NOT_PUBLISH` | Ni méthodologie, ni dataset, ni source traçable |
| F-C18 | Rémunérations moyennes par rôle (SM 60 k€, PO 65 k€, Agile Coach 75 k€, DevOps 70 k€) | 2024 | `DECK-AGILITY` | `DO_NOT_PUBLISH` | Estimations internes non sourcées. Public averti = risque de crédibilité élevé |
| F-C19 | Projections 2025–2030 (offres et salaires) | — | `DECK-AGILITY` | `DO_NOT_PUBLISH` | DARES cité globalement, sans rapport ni méthodologie identifiés |
| F-C20 | « 100 % Territoire couvert » | — | `SITE-STAGING` | `DO_NOT_PUBLISH` | Vrai mais creux — toute société de portage le dit |

---

# D. IT CAPABILITY & METHOD

| ID | Statement | Source | Status | Target pages | Notes |
|---|---|---|---|---|---|
| F-D01 | Référentiels métiers utilisés en évaluation : CIGREF, SYNTEC, ROME | `MT-LOT1` p.7 | `PUBLISHABLE` | `/entreprises` | Concret, vérifiable, jamais publié par la concurrence |
| F-D02 | Processus de sélection en 5 étapes : analyse initiale → référentiels métiers → entretiens structurés (RH + technique) → tests / mise en situation → validation finale | `MT-LOT1` pp.7-8 | `PUBLISHABLE` | `/entreprises`, bloc `CB-11` | **Meilleur actif de crédibilité du corpus** |
| F-D03 | Profils transmis sous forme anonymisée | `MT-LOT1` p.8 | `PUBLISHABLE` | `/entreprises` |
| F-D04 | Modes projet maîtrisés : cycle en V, Agile (Scrum / Kanban), hybride | `MT-LOT1` p.14 | `PUBLISHABLE` | `/entreprises`, `/expertises` |
| F-D05 | Alignement sur les processus du demandeur, sans remise en cause de l'organisation en place | `MT-LOT1` p.14 | `PUBLISHABLE` | `CB-07` | **Différenciant réel** face aux ESN qui imposent leur cadre |
| F-D06 | Pratiques alignées ITIL ; compatibles ISO 9001 / 25010 / 27001 | `MT-LOT1` p.15 | `VERIFY_BEFORE_USE` | `/entreprises` | ⚠️ « aligné » ≠ « certifié ». Q7 |
| F-D07 | Continuité assurée par un binôme avec relais identifié, sans dépendance à une personne unique | `MT-LOT1` p.20 | `PUBLISHABLE` | `/entreprises`, `CB-11` |
| F-D08 | Intervention sur environnements historiques critiques (dont IBM i / AS400) comme sur socles récents | `MT-LOT1` pp.12-13 | `PUBLISHABLE` | `CB-06`, `/expertises` | **Différenciant fort** — la plupart des ESN ne vendent que du greenfield |
| F-D09 | Accessibilité : RGAA, WCAG | `MT-LOT1` p.24 | `PUBLISHABLE` | `/rse` |
| F-D10 | Numérique responsable : RGESN, Green IT, charte NR interne, référent NR désigné | `MT-LOT1` pp.23-24 | `PUBLISHABLE` | `/rse` |
| F-D11 | Signataire de la Charte de la diversité | `MT-LOT1` p.22 | `PUBLISHABLE` | `/rse` |
| F-D12 | Trajectoire vers les référentiels de l'Institut du Numérique Responsable | `MT-LOT1` p.24 | `VERIFY_BEFORE_USE` | `/rse` | ⚠️ « trajectoire », pas certification. Q7 |
| F-D13 | Gestion administrative entièrement dématérialisée | `MT-LOT1` p.22 | `PUBLISHABLE` | `/rse` |
| F-D14 | Train prioritaire longue distance, mobilités douces en proximité | `MT-LOT1` p.22 | `PUBLISHABLE` | `/rse` | Concret, mesurable, au-dessus du RSE habituel du secteur |
| F-D15 | Matériel reconditionné pour les périphériques, filières de recyclage et dons | `MT-LOT1` p.24 | `PUBLISHABLE` | `/rse` |
| F-D16 | Indicateurs RSE suivis en comité de pilotage | `MT-LOT1` p.23 | `PUBLISHABLE` | `/rse` |
| F-D17 | Outil ATS/CRM : BoondManager | `MT-LOT1` p.6 | `CLIENT_APPROVAL_REQUIRED` | `/entreprises` | Nommer l'outil est un signal de sérieux. Q16 |
| F-D18 | Outil de gestion consultant : LAYA **ou** in]PORTERS | `LB2024` | `VERIFY_BEFORE_USE` | `/consultants`, `/espace-client` | ⚠️ Les deux noms figurent sur la même page. Q4 |

---

# E. VOLUMES & PROOF

| ID | Statement | Source | Status | Notes |
|---|---|---|---|---|
| F-V01 | Vivier de plus de 10 000 profils IT, structuré par domaine, niveau et expérience sectorielle | `MT-LOT1` p.6 | `CLIENT_APPROVAL_REQUIRED` | Q6. Si actuel et défendable : meilleur argument `/entreprises`. Ne pas arrondir |
| F-V02 | Sourcing multi-canal : cooptation, événements IT, LesJeudis, HelloWork, Meteojob, LinkedIn, Indeed, Monster, France Travail | `MT-LOT1` p.6 | `PUBLISHABLE` | Banal mais crédible |
| F-V03 | Avis Google réels et nommés (Yoann Deroux, Safrana Chloé, Mylène Pernin) | `SITE-STAGING` | `PUBLISHABLE` | ✅ Meilleure preuve sociale existante. Conserver, garder le lien vers la fiche Google |
| F-V04 | Témoignages « Delphine, Paris » / « Chloé, Toulouse » / « Andy P. » | `SITE-LIVE` | `CLIENT_APPROVAL_REQUIRED` | Q9. Non vérifiables. Recommandation : supprimer, F-V03 suffit |
| F-V05 | Témoignage placeholder (personne fictive + citation type) | `DECK-EXPERTISE` via `PACK` §7.3 | `DO_NOT_PUBLISH` | Aucune valeur probante |
| F-V06 | « X projets livrés en 2025 » / « Plus de X candidats spécialisés » | `DOC-DATA-IA`, `PACK` §7.2 | `DO_NOT_PUBLISH` | Placeholders non remplis. **Ne jamais convertir en estimation** |
| F-V07 | Logos accueil : BPCE, Groupama, Airbus, Safran, Thales, Capgemini | `SITE-STAGING` | `CLIENT_APPROVAL_REQUIRED` | 🔴 Q3. Ne correspond pas à F-V08. Bloc `HOME-LOGOS` gelé |
| F-V08 | Clients cités : CDC Habitat, URSSAF, Keolis, Vinci Autoroutes, Transdev, Pro BTP, Softway Medical, CA Technologies & Services, Horiba, BPCE | `MT-LOT1` | `DO_NOT_PUBLISH` | Document confidentiel. Autorisation écrite requise, une par client |
| F-V09 | Consultants nommés dans des exemples de projets, avec l'organisation cliente | `DECK-EXPERTISE` via `PACK` §7.1 | `DO_NOT_PUBLISH` | 🔴 Données personnelles + confidentialité professionnelle. Voir copy-plan §10.6 |
| F-S01 | 14 secteurs cités : télécoms, énergie, finance, assurance, automobile, aéronautique, santé, industrie, retail, logistique, services financiers, santé numérique, éducation, e-commerce | `PACK` §5, `DOC-DATA-IA` | `DO_NOT_PUBLISH` | Q14. Issus d'un document portant sur une autre société. Ne nommer aucun secteur sans référence réelle |

### Anonymised project types — the highest-value conversion available

Confidential source, publishable output. Same persuasive force, zero exposure.

| ID | Publishable form (FR) | Source | Status |
|---|---|---|---|
| F-P01 | « Migration d'un socle Big Data Hortonworks vers Cloudera Data Platform pour un organisme public national — architecte système, expert Big Data, développeur senior. » | `MT-LOT1` p.12 | `PUBLISHABLE` |
| F-P02 | « Développements spécifiques et intégration en environnement IBM i / AS400 sur des applications métier cœur du logement social — analyste programmeur, chef de projet applicatif. » | `MT-LOT1` p.13 | `PUBLISHABLE` |
| F-P03 | « Audit de l'existant, recommandations de modèles et d'outils, mise en place d'applicatifs internes pour un industriel — architecte données, data scientist, développeur fullstack. » | `MT-LOT1` p.13 | `PUBLISHABLE` |

> **Rule:** no client name, no lot number, no CCTP reference, no GIE. Sector + system type + profiles mobilised. Nothing more.

---

# R. ROLE CATALOGUE

Source: `PACK` §4 (consolidating `DECK-AGILITY` and `DECK-EXPERTISE`), cross-checked against `MT-LOT1` and `DOC-DATA-IA` §V3.

**Status of the catalogue as a whole:** `VERIFY_BEFORE_USE` — the competency descriptions are sound and generic enough to be safe, but **a role may only be published if the profile actually exists in the network** (Q13). Publishing a role you cannot staff generates an enquiry you cannot answer.

**Never display on a role card:** salary, availability, years of experience, candidate volume (F-C18, F-V01, F-V06).

### R1 · Stratégie & gouvernance

| Rôle | Compétences | Qualités |
|---|---|---|
| **DSI / CIO** | stratégie SI · architecture et gouvernance IT · sécurité et conformité · gestion budgétaire · programmes de transformation · veille technologique | leadership stratégique, adaptabilité, négociation, arbitrage |
| **RSSI** | gestion des cyber-risques · politiques de sécurité · veille menaces et vulnérabilités · analyse d'audit et plans correctifs · gestion des incidents | rigueur, sang-froid, pédagogie |

### R2 · Produit & agilité

| Rôle | Compétences | Qualités |
|---|---|---|
| **Product Owner** | backlog et priorisation · analyse des besoins métier et utilisateurs · user stories et critères d'acceptation · vision produit et roadmap | arbitrage, communication, orientation utilisateur |
| **Scrum Master** | facilitation des cérémonies · levée d'obstacles · animation d'équipe et suivi de performance · outils collaboratifs agiles | écoute, facilitation, protection de l'équipe |
| **Agile Coach** | frameworks agiles · formation et accompagnement d'équipes · analyse et amélioration des processus · coaching individuel et collectif | pédagogie, recul, diplomatie |
| **Release Train Engineer** | coordination multi-équipes à l'échelle · planification des livraisons · alignement stratégique et reporting · suivi des dépendances | organisation, vision d'ensemble |
| **Chef de projet agile** | planification et coordination · Scrum et Kanban · suivi des KPI · gestion des parties prenantes · outils de gestion de projet | priorisation, communication |
| **Change Manager** | adoption du changement et gestion des résistances · plans de communication · ateliers et formation · suivi des impacts et des risques | empathie, persévérance |

### R3 · Cybersécurité — ⚠️ conditionné à Q11

| Rôle | Périmètre |
|---|---|
| **Chef de projet cybersécurité** | pilotage de projets sécurité, coordination des parties prenantes |
| **Expert sécurité** | expertise technique sur un périmètre défini |
| **Responsable cybersécurité** | pilotage de la fonction sécurité |
| **RSSI / RSSI de transition** | gouvernance, politiques, risques, incidents |
| **Ingénieur cybersécurité** | mise en œuvre et exploitation des dispositifs de protection |

**Familles de prestations** — *diagnostic* : audit, analyse des risques et de la conformité, évaluation de la gouvernance · *conseil et assistance* : conseil stratégique et gouvernance, assistance technique, formation et sensibilisation · *plan d'action* : audits et tests, déploiement de solutions de protection, planification et amélioration continue, cadrage budgétaire et ressources.

> ⛔ Ne pas revendiquer : capacité de pentest, SOC, CERT, certification ISO 27001, certification RGPD — sauf approbation explicite et distincte.

### R4 · Data & IA

| Rôle | Périmètre |
|---|---|
| **Data Analyst** | collecte, analyse, interprétation, reporting d'aide à la décision |
| **Data Engineer** | conception et exploitation des pipelines et systèmes de stockage |
| **Data Scientist** | modélisation statistique, algorithmes, extraction d'insights |
| **Data Architect** | architecture des données, intégrité, sécurité, exploitabilité |
| **Data Governance Specialist** | qualité, sécurité et conformité des données, politiques transverses |
| **BI Developer** | outils décisionnels, tableaux de bord, restitution |
| **Machine Learning Engineer** | industrialisation et déploiement des modèles en environnement réel |
| **AI Architect** | architectures IA et intégration aux systèmes existants |
| **AI Strategy Expert** | alignement des initiatives IA sur les objectifs métier |
| **Chief Data Officer** | pilotage stratégique de la donnée à l'échelle de l'organisation |

### R5 · Cloud, infrastructure & DevOps

| Rôle | Périmètre |
|---|---|
| **Cloud Architect** | conception d'architectures cloud : performance, sécurité, scalabilité |
| **Cloud Engineer** | déploiement, exploitation et optimisation au quotidien |
| **Cloud Security Specialist** | protection des données et systèmes hébergés |
| **Cloud Consultant** | évaluation des besoins, choix de solutions, supervision du déploiement |
| **Cloud Operations Manager** | supervision des opérations, performance, maîtrise des coûts |
| **DevOps Engineer** | automatisation CI/CD · Infrastructure as Code · conteneurisation · supervision et performance |
| **Coordinateur technique** | environnements techniques, outillage CI/CD, tests et validation qualité, gestion de configuration et documentation |

| ID | Fact | Status | Notes |
|---|---|---|---|
| F-R12 | Outils cités en exemple : Ansible, Terraform (IaC) · Docker, Kubernetes (conteneurisation) · Grafana, Prometheus (supervision) | `VERIFY_BEFORE_USE` | Q16. Formuler « nos consultants interviennent sur » — **jamais** « nous maîtrisons » ni « tous nos consultants ». Un outil nommé est un signal fort et peu risqué, à condition de ne pas le présenter comme une compétence garantie de chaque profil |

### R6 · Architecture, analyse & design

| Rôle | Périmètre |
|---|---|
| **Architecte solution / agile** | conception d'architecture (microservices, cloud), intégration dans des projets itératifs, veille, sécurité et scalabilité |
| **Business Analyst** | analyse des besoins et spécifications, modélisation des processus, KPI et reporting, outils d'analyse (SQL, BI) |
| **UX/UI Designer** | prototypage et wireframing, tests utilisateurs, analyse ergonomique, accessibilité, collaboration avec les équipes produit |
| **AMOA / assistance à maîtrise d'ouvrage** | expression et analyse des besoins, cadrage, recette | 
| **Développeur** | ⚠️ `DO_NOT_PUBLISH` en l'état — les sources listent le rôle sans description. Ne pas inventer une fiche générique |

---

# S. SITE-LIVE — page « Le portage salarial » de www.porters.fr

Added 2026-07-30 from the current production page supplied by the client. Rows added
by the agent, statuses left for the client per the rules at the top of this file.

**None of the figures below is published on the new site.** The qualitative service
descriptions are (see `/portage-salarial`, section « Ce que vous obtenez en plus du
cadre »); every number carries a `TODO-CLIENT` in the source.

| ID | Statement | Source | Status | Notes |
|---|---|---|---|---|
| F-S02 | L'offre est nommée « PACK PURE » ; positionnement « partenaire 100 % online » | `SITE-LIVE` | `VERIFY_BEFORE_USE` | Le nom de l'offre n'apparaît nulle part ailleurs dans le corpus. Le publier ou l'abandonner — pas les deux |
| F-S03 | Avance sur salaire incluse | `SITE-LIVE` | `VERIFY_BEFORE_USE` | Cohérent avec F-B14. Publié ici **sans** engagement de date |
| F-S04 | Gestion des frais professionnels : **+1,5 %** | `SITE-LIVE` | `VERIFY_BEFORE_USE` | 🔴 Premier taux chiffré trouvé dans tout le corpus. S'ajoute-t-il aux frais de gestion ou les inclut-il ? Détermine la réponse à Q5 |
| F-S05 | Démarrage de la mission en **24 h ouvrées** | `SITE-LIVE` | `VERIFY_BEFORE_USE` | Engagement opérationnel fort. À confirmer avant publication |
| F-S06 | Versement des salaires **à la fin du mois** | `SITE-LIVE` | `VERIFY_BEFORE_USE` | ⚠️ Contredit F-C14 (deux sessions de paie, J+1 à J+5 ou 10e jour ouvré) |
| F-S07 | Parrainage : **200 € en chèques cadeaux** si le filleul atteint **7 500 €** de prestations facturées | `SITE-LIVE` | `VERIFY_BEFORE_USE` | 🔴 **Troisième version de l'offre de parrainage.** F-C13 dit « 1 journée de TJM / ½ journée » ; `LB2024` p.23 dit « une prime nette d'impôts » sans montant. Trois sources, trois offres. Aucune n'est publiable tant qu'une seule ne survit pas |
| F-S08 | Services inclus : formation et coaching RH, réseau social et collaboratif, tarifs préférentiels partenaires | `SITE-LIVE` | `VERIFY_BEFORE_USE` | Qualitatif, sans chiffre. **Publié** sur `/portage-salarial` |
| F-S09 | « Vous restez maître de vos décisions, de votre planning et propriétaire de votre clientèle » | `SITE-LIVE` | `PUBLISHABLE` | Reformulation de F-B07, déjà couvert. **Publié** |
| F-S10 | Capital social 50 000 € ; SIRET 82895473500027 | `SITE-LIVE` | `VERIFY_BEFORE_USE` | Mentions légales uniquement. Le capital concorde avec `mentions-legales.astro:23` |
| F-S11 | Adresse Paris : **26 rue de Berri, 75008** | `SITE-LIVE` | `VERIFY_BEFORE_USE` | 🔴 Contredit `agencies.data.ts` qui indique **27 rue Marbeuf, 75008**. Deux adresses parisiennes différentes, toutes deux publiées aujourd'hui |
| F-S12 | Le pied de page ne liste que 3 implantations : Montpellier, Paris, Lyon | `SITE-LIVE` | `VERIFY_BEFORE_USE` | ⚠️ **Cinquième réponse** à Q2. Ni Aix ni Marseille |

> 🔴 **F-S04 est la découverte la plus importante de cette page.** C'est le seul taux
> chiffré du corpus entier. Combiné à `managementRatePercent = 10` codé en dur dans
> `SimulatorForm.tsx:61`, cela fait deux chiffres de frais en production, non
> réconciliés. Q5 ne peut pas être tranchée sans clarifier lequel est le bon.

---

# X. RESOLUTION LOG

The client fills this in. One row per decision. This is what makes the fact base binding rather than advisory.

| Fact ID | Decision | New status | Corrected value | Decided by | Date |
|---|---|---|---|---|---|
| | | | | | |

**Blocking count at v1.0:** 3 `CLIENT_APPROVAL_REQUIRED` on the critical path (F-V01, F-V07, F-C15) · 18 `VERIFY_BEFORE_USE` · 4 pages blocked entirely (`/agences` ×5 on Q2, cyber hub on Q11).
