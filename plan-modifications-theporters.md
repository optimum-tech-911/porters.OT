# The Porters — Plan de modifications (brief pour Claude Code)

> Paste this whole file into Claude Code as the task brief. Execute tasks in the order given.
> After each task, list the files you touched and stop for review before starting the next one.

---

## 0. Règles globales (valables pour toutes les tâches)

1. **Ne pas casser le design system existant.** Palette actuelle : navy profond (`#16232F`-ish), or/laiton (`#C2A15E`-ish), crème (`#F7F4EF`), blanc. Display sans-serif géométrique bold, corps de texte en gris ardoise. Réutiliser les tokens/variables déjà présents dans le projet — ne pas introduire de nouvelles couleurs.
2. **Épuration, pas ajout.** Le site répète 10 fois la même idée. Règle : **une idée = un endroit**. Si un bloc redit ce qu'un autre bloc dit déjà, supprimer le plus faible, ne pas reformuler.
3. **Suppression propre.** Quand une section est supprimée : retirer le composant, ses données/contenu, ses assets non utilisés, ses liens dans la nav / le footer / les sitemaps, et les routes orphelines. Aucun lien mort.
4. **Rythme vertical.** Après suppression de sections, vérifier les marges/paddings entre sections adjacentes (pas de double espacement, pas de collision).
5. **Qualité de base non négociable** : responsive jusqu'à 375px, focus clavier visible, `prefers-reduced-motion` respecté, contrastes AA.
6. Ne rien changer d'autre que ce qui est listé ici.

---

## 1. Navigation — inverser deux entrées

**État actuel :** `Le portage salarial | Nos offres | Simulateur | [LOGO] | Le groupe | Ressources | ✉ | Rendez-vous`

**Cible :** `Le portage salarial | Nos offres | Le groupe | [LOGO] | Simulateur | Ressources | ✉ | Rendez-vous`

- Échanger uniquement les positions de **Simulateur** et **Le groupe**. Rien d'autre ne bouge.
- Reporter l'inversion dans le menu mobile et dans le footer si l'ordre y est dupliqué.
- Vérifier que le sous-menu déroulant de « Le groupe » fonctionne toujours à sa nouvelle position (débordement à gauche du logo).

---

## 2. Hero de la home — refonte complète

### Problème
Le hero actuel (« Votre projet / Notre accompagnement / Une collaboration durable » + 3 photos flottantes + carte fondateur) est joli mais ne dit pas ce que fait The Porters. En arrivant, on ne comprend pas le métier.

### Objectif
En 3 secondes : **on comprend le métier, on comprend le bénéfice, on a une action évidente.**

### Structure (2 colonnes desktop, 1 colonne mobile)

```
┌───────────────────────────────────────────────────────────────┐
│  PORTAGE SALARIAL · CONSULTANTS IT          (eyebrow, or)      │
│                                                                │
│  Indépendant,                     ┌──────────────────────────┐ │
│  avec la sécurité                 │  ESTIMATION RAPIDE        │ │
│  du salariat.                     │                           │ │
│                                   │  Mon TJM                  │ │
│  Vous trouvez vos missions et     │  [ 600 € ]  ──○────────    │ │
│  négociez vos conditions.         │                           │ │
│  The Porters gère le contrat,     │  Salaire net estimé       │ │
│  la facturation, la paie et les   │  3 XXX € / mois           │ │
│  déclarations sociales.           │                           │ │
│                                   │  → Voir le détail          │ │
│  [ Simuler mon salaire net ]      │    dans le simulateur     │ │
│  [ Parler à un conseiller ]       └──────────────────────────┘ │
│                                                                │
│  ● Statut salarié CDI/CDD   ● Interlocuteur dédié              │
│  ● Consultants partout en France                               │
└───────────────────────────────────────────────────────────────┘
```

### Copy exacte à utiliser

- **Eyebrow :** `PORTAGE SALARIAL · CONSULTANTS IT`
- **H1 :** `Indépendant, avec la sécurité du salariat.`
- **Sous-titre (1 phrase, pas 3) :** `Vous trouvez vos missions et négociez vos conditions. The Porters prend en charge le contrat, la facturation, la paie et les déclarations sociales — sans créer de société.`
- **CTA primaire (or, plein) :** `Simuler mon salaire net` → `/simulateur`
- **CTA secondaire (outline navy) :** `Parler à un conseiller` → prise de RDV
- **Preuves (3 puces max, une ligne) :** `Statut salarié CDI ou CDD` · `Interlocuteur dédié` · `Consultants partout en France`

*Variantes de H1 si besoin d'un A/B :*
- `Vos missions. Notre administratif. Votre salaire.`
- `Le portage salarial, sans la charge administrative.`

### Élément signature : le mini-simulateur
La carte de droite est **le** parti pris du hero. Un seul input (TJM, slider + saisie), un seul output (net mensuel estimé, gros chiffre). Elle utilise la même logique de calcul que le simulateur complet — **factoriser le calcul dans un module partagé**, pas de duplication de formule. Le bouton passe la valeur saisie en query param au simulateur (`/simulateur?tjm=600`) pour que l'utilisateur retrouve son chiffre.

Mention obligatoire sous le chiffre, en petit : `Estimation indicative, hors frais professionnels.`

### À supprimer du hero
- Les 3 photos flottantes de type polaroid (Ambre / Eric / Lisa).
- La carte « FONDATEUR — Eric BENSAID » avec ses 2 boutons.
- Le lien tertiaire « Nos solutions entreprises » (il double le menu principal). Garder un accès entreprises en bas de hero **uniquement** sous forme d'un lien texte discret : `Vous êtes une entreprise ?`

### Traitement visuel
Fond crème uni, **une seule** forme géométrique douce en fond (garder le grand cercle dégradé existant, très atténué, ou le supprimer si le contraste avec la carte est mauvais). Pas de photo dans le hero. Titre très large, interlignage serré (~0.95), pas de gras sur le sous-titre. Animation : une seule séquence d'entrée au chargement (eyebrow → titre → sous-titre → CTA → carte), 400ms, désactivée si `prefers-reduced-motion`.

---

## 3. Simulateur — frais bloqués + saisie manuelle

Écran concerné : bloc « HYPOTHÈSES — Ajustez votre projection ».

1. **Frais professionnels mensuels : figer à 500 €.**
   - Supprimer le slider « Frais professionnels mensuels ».
   - Remplacer par une ligne d'information statique : `Frais professionnels : 500 € / mois` avec une note discrète `Hypothèse fixe utilisée dans cette simulation.`
   - La valeur `500` doit être une **constante nommée** dans la config du simulateur (ex. `FRAIS_PRO_MENSUELS = 500`), pas un nombre en dur dans le composant.
   - Vérifier qu'aucun profil (« Mission régulière », etc.) ne surcharge cette valeur.

2. **Rendre les chiffres saisissables.**
   - Chaque valeur affichée à droite du label (ex. `9 900 €`) devient un **champ de saisie** éditable, en plus du slider.
   - Saisie ↔ slider synchronisés dans les deux sens.
   - Bornes conservées (3 000 € – 25 000 €) : on clampe à la sortie du champ, avec un message inline si la valeur est hors bornes (`Valeur ajustée au maximum de 25 000 €`).
   - Formatage à l'affichage (espace milliers + €), parsing tolérant à la saisie (espaces, points, virgules).
   - `inputMode="numeric"`, accessible au clavier, `aria-label` explicite.

3. Recalcul immédiat de la projection à chaque changement (slider ou saisie), sans bouton « valider ».

---

## 4. Supprimer la section « Un cadre adapté à votre situation professionnelle »

Bloc « CHOISIR SON PARCOURS » avec les 4 cartes 01/02/03/04 (Consultant indépendant / Expert IT en mission / Entreprise cliente / En transition).

- Supprimer la section entière.
- Les destinations utiles (Parcours consultant, Cadre du portage, Offre entreprises, Simulation revenus) sont déjà toutes accessibles depuis la nav → **ne pas les réimplanter ailleurs**.
- Vérifier qu'aucune de ces pages ne devient orpheline (sinon, garder le lien dans le footer uniquement).

---

## 5. Supprimer la section recrutement

Bloc « RECRUTEMENT — Explorez nos opportunités » (cartes HelloWork / Profils business…).

- Supprimer la section de la page concernée.
- Conserver la page recrutement si elle existe en propre, mais uniquement accessible depuis le footer.
- Supprimer les assets et données (cartes flottantes, pastilles Rendez-vous / RH / Conseil) devenus inutilisés.

---

## 6. Section « Suivi » — ne garder que la vidéo

Bloc « À VOS CÔTÉS À CHAQUE ÉTAPE / Suivi / Être indépendant ne veut pas dire être seul ».

- **Supprimer** : le témoignage de Delphine (carte navy), les deux avis en bas (Chloé, Andy P.), et tout le bloc de texte de gauche (titre « Suivi », « Être indépendant ne veut pas dire être seul », paragraphe, « Profils IT, produit, data et transformation »).
- **Garder uniquement la vidéo** « LE MOT DU PRÉSIDENT — Une vision du portage, au plus près des talents ».
- Voir tâche 7 : cette vidéo est **déplacée**, pas laissée sur place. Si après extraction il ne reste plus rien dans la section, supprimer la section entière.

---

## 7. Déplacer la vidéo sur la page « Le portage salarial »

- Cible : page portage salarial, section **« Trois acteurs. Deux contrats. Une mission. »**
- Insérer la vidéo du président **à la place de la photo actuelle** (photo de réunion à 3 personnes), dans la colonne de droite, ou en pleine largeur juste sous cette section — choisir l'option qui garde le mieux le rythme de la page ; me montrer un screenshot des deux si l'arbitrage n'est pas évident.
- Garder le libellé `LE MOT DU PRÉSIDENT — Une vision du portage, au plus près des talents`.
- Lecteur : poster/vignette propre, pas d'autoplay, son coupé par défaut si autoplay imposé, contrôles natifs accessibles, `preload="metadata"` pour ne pas plomber le LCP.

---

## 8. Schéma triangle des trois acteurs

Remplace les 3 icônes alignées (Le consultant / The Porters / L'entreprise cliente) sur la page portage salarial.

**Forme :** triangle, The Porters au sommet, le consultant en bas à gauche, l'entreprise cliente en bas à droite. Les liens entre les sommets portent la nature de la relation — c'est ça l'information, pas la décoration :

```
                 ┌──────────────┐
                 │  THE PORTERS │
                 └──────────────┘
             ▲                      ▲
   Contrat de travail        Contrat de prestation
      (CDI / CDD)            (convention de mission)
             │                      │
   ┌───────────────┐        ┌────────────────────┐
   │ LE CONSULTANT │───────▶│ L'ENTREPRISE CLIENTE│
   └───────────────┘   Mission réalisée
                       (conditions négociées entre eux)
```

- **SVG inline responsive**, pas d'image bitmap. Sur mobile (<768px) : bascule en liste verticale de 3 blocs avec les mêmes libellés de relation, le triangle n'est pas lisible en dessous de ~500px.
- Couleurs : navy pour les nœuds, or pour les arêtes/labels de relation, crème en fond.
- Texte de chaque nœud réduit à **une ligne max** (le paragraphe actuel de 2-3 lignes par acteur est supprimé) :
  - `Le consultant` — `Trouve ses missions et réalise ses prestations.`
  - `The Porters` — `Contrat, facturation, paie et déclarations.`
  - `L'entreprise cliente` — `Bénéficie de l'expertise, dans un cadre sécurisé.`
- Accessibilité : `role="img"` + `<title>`/`<desc>` décrivant la relation tripartite en toutes lettres.

---

## 9. Couverture nationale — « on intervient partout en France »

Nouveau bloc, à placer sur la home (après le hero ou avant le CTA final) et à réutiliser sur la page « Le groupe ».

- **Carte de France** en SVG (tracé simple, pas de fond de carte tuilé, pas de dépendance lourde type Leaflet/Mapbox).
- **Points sur la carte** : les **vraies agences** — marqueurs pleins, or, avec le nom de la ville au survol/tap et au focus clavier.
- **Note associée**, à côté de la carte : `Nos consultants interviennent partout en France.` + une ligne : `Agences : [liste des villes réelles].`
- ⚠️ **Ne pas inventer d'adresses ni de villes.** Utiliser exclusivement la liste d'agences que je fournis (voir « Données à me demander » en fin de brief). Tant que la liste n'est pas fournie, laisser un `TODO` explicite et ne pas commiter de données placeholder visibles.
- Distinguer visuellement les deux niveaux : points pleins = agences physiques, halo léger = zone d'intervention.

---

## 10. Passe éditoriale globale — anti-répétition

À faire **en dernier**, une fois les sections supprimées, sur l'ensemble du site.

1. Lister chaque page et chaque section avec son message principal en une phrase.
2. Identifier les doublons de message (ex. « on gère l'administratif », « interlocuteur dédié », « vous restez indépendant » reviennent partout).
3. Règle d'arbitrage : **le message reste là où il est le plus utile pour décider**, il est supprimé partout ailleurs — pas reformulé, supprimé.
4. Réduire les paragraphes : max **2 phrases** par bloc de texte, max **1 phrase** sous un titre de section.
5. Bannir les phrases-tunnel et les synonymes empilés (« réactivité, proximité et transparence »). Une qualité affirmée = une preuve concrète ou rien.
6. Me livrer, avant modification, un **tableau récapitulatif** : page | section | message | doublon de | action proposée. Je valide, puis tu appliques.

---

## Ordre d'exécution

1. Tâches 4 et 5 (suppressions sèches — allègent la page tout de suite)
2. Tâche 6 puis 7 (extraction et déplacement de la vidéo)
3. Tâche 1 (nav)
4. Tâche 3 (simulateur)
5. Tâche 2 (hero — dépend du simulateur pour la logique de calcul partagée)
6. Tâche 8 (triangle)
7. Tâche 9 (carte France — nécessite mes données)
8. Tâche 10 (passe éditoriale — en dernier, après validation du tableau)

---

## Checklist de recette

- [ ] Aucun lien mort, aucune route orpheline, sitemap à jour
- [ ] Aucun asset ni composant orphelin laissé dans le repo
- [ ] Espacements entre sections cohérents après suppressions
- [ ] Simulateur : frais figés à 500 €, valeurs saisissables, sync slider ↔ input, clamp aux bornes
- [ ] Hero : chiffre du mini-simulateur = chiffre du simulateur complet pour le même input
- [ ] Vidéo : pas d'autoplay avec son, LCP non dégradé
- [ ] Triangle : lisible et accessible, fallback mobile
- [ ] Carte : aucune donnée inventée
- [ ] Responsive 375 / 768 / 1440, focus visible, `prefers-reduced-motion`
- [ ] Lighthouse perf/a11y non dégradé par rapport à la baseline

---

## Données à me demander avant de coder

1. Liste réelle des agences (villes + adresses) pour la carte.
2. Chiffres/hypothèses de calcul à utiliser pour le mini-simulateur du hero (taux de gestion, charges) — ou confirmation qu'on réutilise tel quel le moteur du simulateur existant.
3. Fichier vidéo / URL d'hébergement de la vidéo du président (pour éviter de la dupliquer).
