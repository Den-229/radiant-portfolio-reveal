# Portfolio de Denis ASSOGBA - Développeur Full Stack Web & Mobile

Portfolio professionnel moderne basé sur le template **Clyde** (ThemeWagon), enrichi de fonctionnalités dynamiques et d'un tableau de bord d'administration sécurisé.

---

## 🚀 Guide de Déploiement sur Vercel

Vercel détecte automatiquement les projets **Vite + React**. Un fichier `vercel.json` est déjà configuré à la racine pour gérer les routes du SPA (notamment l'accès direct à `/admin`).

### Méthode 1 : Déploiement automatique via GitHub (Recommandé)

1. **Pousser votre code sur votre dépôt GitHub** :
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio complet Clyde avec dashboard admin et config vercel"
   git branch -M main
   git remote add origin https://github.com/Den-229/radiant-portfolio-reveal.git
   git push -u origin main --force
   ```

2. **Connecter Vercel à votre GitHub** :
   - Rendez-vous sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub.
   - Cliquez sur le bouton **"Add New..."** puis sélectionnez **"Project"**.
   - Dans la liste de vos dépôts, choisissez `radiant-portfolio-reveal` et cliquez sur **"Import"**.

3. **Paramètres de configuration sur Vercel** :
   - **Framework Preset** : `Vite` (détecté automatiquement)
   - **Root Directory** : `./` (par défaut)
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

4. Cliquez sur **"Deploy"** !
   - En moins d'une minute, votre portfolio est en ligne avec un lien HTTPS personnalisé (ex: `denis-assogba.vercel.app`).
   - Chaque futur `git push` déclenchera un redéploiement automatique instantané.

---

### Méthode 2 : Déploiement direct via Vercel CLI (Sans passer par GitHub)

Si vous avez Node.js sur votre machine :
```bash
# 1. Lancer Vercel CLI directement
npx vercel

# Suivez les invites :
# ? Set up and deploy "~/denis-portfolio"? (Y/n) y
# ? Which scope do you want to deploy to? (Votre nom)
# ? Link to existing project? (y/N) n
# ? What's your project's name? denis-assogba-portfolio
# ? In which directory is your code located? ./
# ? Want to modify these settings? n

# 2. Déployer en production :
npx vercel --prod
```

---

## 🔐 Tableau de bord d'administration

- **Accès** : 
  - Cliquez sur le lien discret **"Accès Admin"** dans le pied de page (Footer).
  - Ou ajoutez simplement `/admin` ou `#admin` à l'URL de votre portfolio.
- **Identifiants par défaut** :
  - **Identifiant** : `admin` (ou `denis`)
  - **Mot de passe** : `denis2026`
- **Fonctionnalités du Dashboard** :
  - Modification des informations de profil (Titre, Bio, Disponibilité, Localisation, etc.).
  - Gestion dynamique des projets (Ajout, modification, suppression).
  - Gestion des articles de blog / réalisations.
  - Sauvegarde locale automatique (`localStorage`) et bouton de réinitialisation.
