# Fit Recipes - Application mobile de recettes intelligentes

[![Made with React Native](https://img.shields.io/badge/Made%20with-React%20Native-blue)](https://reactnative.dev/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)](https://www.mongodb.com/)

## Présentation

**Fit Recipes** est une application mobile moderne qui vous aide à :
- Gérer vos **ingrédients**
- Proposer des **recettes adaptées**
- Créer une **liste de courses**
- Suivre vos **calories**
- Planifier vos **entraînements de musculation**

Le tout dans une interface claire, responsive et agréable.

---

## Fonctionnalités principales

- Ajout, édition et suppression d’ingrédients
- Stockage des données sur MongoDB Atlas
- Choix de l’unité et de la date d’expiration
- Génération automatique de liste de courses (à venir)
- Suivi des calories et macro-nutriments (à venir)
- Planning des entraînements (à venir)

---

## Tech Stack

- **Frontend** : React Native + Expo + Tailwind CSS (via NativeWind)
- **Backend** : Node.js + Express
- **Base de données** : MongoDB Atlas
- **Autres** : Axios, DateTimePicker, Expo Router

---

## 🚀 Installation

1. **Cloner le projet**  
```bash
git clone https://github.com/ton-pseudo/fit-recipes-app.git
cd fit-recipes-app
````

2. **Installer les dépendances**

```bash
npm install
```

3. **Lancer l’application mobile (Expo)**

```bash
npx expo start
```

4. **Lancer le backend (depuis le dossier `server/`)**

```bash
cd server
npm install
node index.js
```

5. **Configurer l’environnement (`.env`) dans le dossier `server/`)**

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/fit-recipes
PORT=4000
```

---

## Roadmap

* ✅ Interface mobile des ingrédients
* ✅ Backend Node.js avec MongoDB
* ✅ Ajout / modification / suppression d'ingrédients
* 🔄 Création de recettes à partir des ingrédients
* 🔄 Génération automatique de liste de courses
* 🔄 Module nutrition : calories et macros
* 🔄 Module musculation : planification et suivi

---

## Technologies utilisées

* **React Native** avec **Expo**
* **Tailwind CSS** via `nativewind`
* **Node.js** avec **Express.js**
* **MongoDB Atlas**
* **Expo Router**
* **Axios**
* **AsyncStorage**
* **React Native DateTimePicker**
* **React Navigation**

---

## Auteur

**Jonathan Queyroi**
Étudiant ingénieur à Polytech Sorbonne
📧 [jonath91220@gmail.com](mailto:jonath91220@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/jonathan-queyroi-590a3b236/)

---

## 📄 Licence

Ce projet est sous licence **MIT**.
Vous pouvez l'utiliser librement à des fins personnelles ou éducatives.

---

> *"Parce qu'une bonne alimentation commence par une bonne organisation."*
