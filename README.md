# Coinche

Feuille de score **Coinche / Belote coinchée** en **single-file HTML** (offline-first), pensée pour mobile (iPhone/PWA) mais utilisable partout.

## Aperçu

Cette app permet de gérer une partie complète :
- saisie des **contrats** (nombre, capot, générale, coinché/surcoinché),
- saisie des **points** par tour,
- calcul automatique des **totaux cumulés**,
- vue **graphique** de l’évolution des scores,
- vue **statistiques**,
- vue **export texte canonique** (copiable),
- gestion du **placement des joueurs**, du **donneur**, et de l’équipe **Nous/Eux**.

Le tout sans backend, avec persistance locale via `localStorage`.

---

## Stack

- HTML/CSS/JS vanilla (aucune dépendance)
- stockage local navigateur (`localStorage`)
- optimisations iOS/PWA (meta tags Apple, icône Home Screen)

---

## Structure du repo

```txt
Coinche/
├─ index.html        # application complète (UI + logique)
├─ IconCoinche.png   # icône app / favicon
├─ accueil.png       # écran d’accueil
└─ grain.png         # texture visuelle
```

---

## Fonctionnalités clés

## 1) Feuille de score
- Colonnes **Nous / Eux** avec contrats et totaux.
- Tour courant mis en évidence.
- Contrat raté barré visuellement.
- Indication du donneur en grille 2x2.

## 2) Contrats
Depuis le panneau **Contrat** :
- équipe qui annonce,
- type : nombre / capot / générale,
- couleur,
- coinché / surcoinché,
- bouton **Tout le monde passe**.

Règle de garde-fou : impossible d’entrer un contrat pour une équipe si l’autre équipe est déjà partie sur le même tour.

## 3) Points
Depuis le panneau **Points** :
- saisie par équipe et par tour,
- pré-remplissage intelligent,
- fermeture auto du panneau quand les 2 côtés du tour sont saisis.

## 4) Stats
Vue dédiée avec :
- score total,
- écart et leader,
- changements de leader,
- moyennes par tour,
- meilleurs/pires tours,
- réussite des contrats,
- compte coinchés/surcoinchés,
- bloc “Champagne” (faits marquants).

## 5) Graphique
Courbes cumulées Nous/Eux avec :
- axes et grille,
- adaptation responsive,
- valeurs finales affichées sur les derniers points.

## 6) Export
Génère un bloc texte structuré (`COINCHE EXPORT v1`) avec :
- métadonnées,
- joueurs/équipes,
- résultat final,
- stats détaillées,
- historique complet des tours.

Bouton **Copier** avec fallback pour navigateurs plus anciens.

## 7) Placement / donneur / scorekeeper
Panneau **Autres** :
- configuration des 4 joueurs,
- choix du donneur (ancrage de rotation),
- choix de “qui tient les scores” (détermine l’équipe Nous),
- inversion possible Nous/Eux sur historique (avec confirmation),
- verrouillage du placement si partie déjà commencée.

## 8) Undo / Reset
- **Undo** avec historique local (jusqu’à 60 actions).
- **Nouvelle partie** (reset complet) avec confirmation.

---

## Lancer le projet

Aucune installation nécessaire.

### Option rapide
Ouvre `index.html` dans le navigateur.

### Option serveur local (recommandé)
```bash
python3 -m http.server 8080
```
Puis ouvre :
```txt
http://127.0.0.1:8080
```

---

## Persistance des données

Les données sont stockées en local dans le navigateur :
- `coinche_app_v1` : état principal (joueurs, tours, undo/redo, etc.)
- `coinche_home_enabled` : activation de l’écran d’accueil

Si tu vides le stockage navigateur, les données de partie sont perdues.

---

## UX mobile / iPhone

Le fichier inclut déjà :
- `apple-mobile-web-app-capable`
- `apple-touch-icon`
- `viewport-fit=cover`

Donc l’app peut être ajoutée à l’écran d’accueil iOS comme pseudo-PWA.

---

## Limites connues

- Pas de synchro multi-appareils (100% local).
- Pas de backend ni compte utilisateur.
- Tout est dans `index.html` (simple à déployer, moins modulaire pour évoluer).

---

## Évolutions possibles

- découper JS/CSS en fichiers séparés,
- ajouter import/export JSON de sauvegarde,
- ajouter tests unitaires (calcul contrats/totaux/stats),
- ajouter mode multi-parties (historique de sessions).
