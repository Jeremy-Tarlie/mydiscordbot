# Étape 1 : Utiliser une image Node.js officielle comme image de base
FROM node:18-alpine AS builder

# Étape 2 : Créer et définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier package.json et package-lock.json (ou yarn.lock) pour installer les dépendances
COPY package.json package-lock.json ./

# Étape 4 : Installer les dépendances avec --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Vérifier les dépendances installées
RUN npm list --depth=0

# Étape 5 : Copier le reste du code source dans le conteneur
COPY . .

# Étape 6 : Construire l'application Next.js pour la production
RUN npm run build

# Étape 7 : Créer une image plus légère pour exécuter l'application
FROM node:18-alpine

# Étape 8 : Définir le répertoire de travail pour l'image finale
WORKDIR /app

# Étape 9 : Copier uniquement les fichiers nécessaires (build et node_modules)
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
# Ajouter cette ligne pour copier le dossier public
COPY --from=builder /app/public ./public

# Étape 10 : Installer les dépendances de production
RUN npm install --production --legacy-peer-deps

# Étape 11 : Exposer le port sur lequel l'application Next.js fonctionnera
EXPOSE 3000

# Étape 12 : Lancer l'application en mode production
CMD ["npm", "start"]