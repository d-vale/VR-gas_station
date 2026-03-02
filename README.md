# Gas Station VR

> TP du cours optionnel Réalité Virtuelle — HEIG-VD (HES-SO)

Simulation immersive de station-service en WebXR. Le joueur ravitaille des voitures avec le bon type de carburant avant l'expiration d'un minuteur, depuis un navigateur — sans installation, sur desktop, mobile ou casque VR.

## Gameplay

1. **Une voiture arrive** et se gare à la pompe. Un type de carburant est tiré aléatoirement (Sans-plomb 95, 95+, Diesel, LPG).
2. **Le joueur saisit la pompe correspondante** (clic sur desktop, trigger en VR) et ravitaille la voiture.
3. **La jauge se remplit** en temps réel. Il faut terminer avant la fin du minuteur (30 secondes).
4. **Succès** → gain affiché en CHF et compteur de voitures incrémenté. **Échec** → "Raté !" et la voiture repart.
5. Après un délai, une nouvelle voiture arrive et la boucle recommence.

| Carburant | Prix |
|-----------|------|
| Sans-plomb 95 | CHF 80 |
| Sans-plomb 95+ | CHF 95 |
| Diesel | CHF 70 |
| LPG | CHF 60 |

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework UI | Vue 3 (Composition API) |
| Moteur 3D / WebXR | A-Frame 1.7.1 |
| Bibliothèque 3D | Three.js (bundlé avec A-Frame) |
| Build | Vite 7 (HTTPS auto-signé) |
| Post-processing | OutlinePass, UnrealBloomPass (Three.js) |
| Input VR | aframe-extras + blink-controls personnalisé |

A-Frame est chargé comme script statique dans `index.html` (pas via npm). `src/three.js` ré-exporte `window.THREE` pour permettre la syntaxe ES module dans le reste du code.

## Installation

```sh
npm install
```

### Lancer en développement

```sh
npm run dev          # Serveur local HTTPS (localhost)
npm run dev-expose   # Exposé sur le réseau local (pour casque VR)
```

### Build de production

```sh
npm run build
npm run preview
```

## Test sur casque VR

1. Lancer `npm run dev-expose`
2. Connecter le casque au même réseau Wi-Fi que la machine de développement
3. Ouvrir l'URL affichée dans le terminal (`https://[ip-locale]:[port]`) depuis le navigateur du casque
4. Accepter l'avertissement de certificat auto-signé
5. Entrer en mode immersif via le bouton VR de la scène

### Contrôles

| Plateforme | Mouvement | Interaction |
|------------|-----------|-------------|
| Desktop | WASD / flèches + souris (pointer lock) | Clic |
| Mobile | Gestures tactiles | Tap |
| VR | Main gauche : téléportation blink + rotation snap | Main droite : raycaster laser / trigger pour saisir |

## Structure du projet

```
src/
├── Aframe.vue              # Composant racine (onboarding + scène)
├── components/
│   ├── TheScene.vue        # <a-scene>, assets, éclairage
│   ├── TheCameraRig.vue    # Caméra multi-plateforme + contrôleurs
│   ├── TheGasStation.vue   # Modèle station + 4 pompes + lumières
│   └── TheRedCar.vue       # Voiture + jauge carburant + phares
├── aframe/
│   ├── car-animation.js    # Arrivée et départ de la voiture
│   ├── car-refuel.js       # Logique de ravitaillement
│   ├── fuel-gauge.js       # Jauge 3D interactive
│   ├── pump-grab.js        # Saisie des pompes (desktop + VR)
│   ├── score-board.js      # Tableau de bord, timer, score
│   ├── blink-controls.js   # Téléportation VR
│   └── ...                 # Autres composants A-Frame
└── utils/
    └── aframe.js           # Helpers position/rotation world-space
public/
├── lib/                    # A-Frame + aframe-extras (scripts pré-compilés)
└── assets/                 # Modèles GLB/GLTF, textures, sons
```

## Contexte académique

Projet réalisé dans le cadre du cours optionnel **Réalité Virtuelle** à la [HEIG-VD](https://heig-vd.ch) (HES-SO), 3ème année de Bachelor.

L'objectif du TP est d'explorer les possibilités de WebXR à travers A-Frame et de mettre en pratique les interactions immersives (saisie d'objets, déplacement, feedback visuel) sur un cas concret multi-plateforme.
