# Lokali

Application mobile React Native + Expo pour la location de biens : voitures, appartements, maisons et materiel.

## Fonctionnalites de cette premiere version

- Authentification demo par role : Client, Loueur, Administrateur.
- Recherche de biens avec filtres simples.
- Detail d'un bien, galerie, localisation et disponibilite.
- Reservation avec calcul du montant.
- Paiement simule puis historique client.
- Dashboard loueur, gestion de biens et demandes de reservation.
- Moderation admin des annonces, utilisateurs et statistiques.

## Structure

```txt
mobile/
  app/          Expo Router, routes par role
  src/
    api/        facade API, mocks pour demarrer sans backend
    components/ composants UI et metier
    stores/     etat global Zustand
    types/      modeles du diagramme de classes
shared/
  types/        types partageables backend/mobile
  constants/    roles et statuts communs
```

## Prerequis Android

Pour Expo SDK 56, utilisez Node.js 22 LTS ou plus recent. Node 18 provoque l'erreur `configs.toReversed is not a function`.

Verifiez :

```bash
node -v
```

La version doit etre `v22.13.0` ou superieure. Sur Windows, vous pouvez installer Node 22 LTS depuis nodejs.org ou via nvm-windows.

Avec Android Studio :

- Ouvrir Android Studio > Device Manager.
- Creer ou lancer un emulateur Android.
- Verifier que la variable `ANDROID_HOME` pointe vers le SDK Android si Expo ne detecte pas l'emulateur.

## Lancer le mobile

Depuis la racine :

```bash
npm install
npm --workspace mobile run android
```

Ou depuis le dossier mobile :

```bash
cd mobile
npm install
npx expo install --fix
npm run android
```

Si Metro garde un ancien cache :

```bash
npm run android:clear
```

Puis ouvrir avec Expo Go ou l'emulateur Android.

> Le code utilise des donnees mockees pour permettre de valider les parcours UML avant le branchement du backend Node.js.
