# Mino Skincare

Site de démonstration d'une marque de cosmétique, mêlant page vitrine et boutique en ligne.

## Objectif

- Présenter l'identité de la marque Mino Skincare
- Afficher les produits, catégories et marques partenaires
- Permettre l'inscription, la connexion, l'ajout au panier et la passation de commande

## Stack technique

| Technologie | Rôle |
|---|---|
| **Next.js 16** | Framework React (SSR, Turbopack) |
| **Tailwind CSS 4** | Styles |
| **Prisma 7** | ORM → PostgreSQL |
| **PostgreSQL 16** | Base de données |
| **Intlayer** | Internationalisation (fr/en) |
| **Vercel** | Déploiement (recommandé) |

## Prérequis

- Node.js 20+
- pnpm 11+
- PostgreSQL 12+ (local ou service externe)

## Installation

```bash
# Cloner le repo
git clone https://github.com/ton-user/mino-skincare.git
cd mino-skincare

# Installer les dépendances
pnpm install

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec tes credentials PostgreSQL et tes secrets JWT
```

## Base de données

```bash
# Créer la base PostgreSQL (si elle n'existe pas)
psql -U postgres -c "CREATE DATABASE mino_skincare;"

# Générer le client Prisma
pnpm db:generate

# Appliquer le schéma
pnpm db:push

# (Optionnel) Seed avec des données de test
pnpm db:seed
```

## Développement

```bash
pnpm dev
# → http://localhost:3000
```

## Production

```bash
pnpm build
pnpm start
```

## Déploiement sur Vercel

1. Pousser le code sur GitHub
2. Importer le projet sur [vercel.com](https://vercel.com)
3. Configurer les variables d'environnement dans le dashboard Vercel :
   - `DATABASE_URL` → URL de ta base PostgreSQL (Neon, Supabase, Railway...)
   - `JWT_SECRET` → secret pour les tokens d'accès
   - `JWT_REFRESH_SECRET` → secret pour les tokens de rafraîchissement
4. Le déploiement se fait automatiquement à chaque push sur `main`

## Structure du projet

```
app/
├── [locale]/              # Pages (fr/en)
│   ├── page.tsx           # Accueil
│   ├── catalogue/         # Liste des produits
│   ├── cart/              # Panier
│   ├── checkout/          # Paiement
│   ├── login/             # Connexion
│   ├── register/          # Inscription
│   └── dashboard/         # Tableau de bord
├── api/                   # Routes API
│   ├── auth/              # Login, register, refresh, logout
│   ├── products/          # CRUD produits
│   ├── orders/            # Commandes
│   ├── cart-items/        # Panier
│   ├── users/             # Utilisateurs + adresses
│   ├── categories/        # Catégories
│   └── brands/            # Marques
├── components/            # Composants React
lib/
├── auth.ts                # JWT, guards (requireAuth, requireAdmin)
├── prisma.ts              # Client Prisma
├── types.ts               # Types partagés
└── home.ts                # Helpers pour la page d'accueil
prisma/
├── schema.prisma          # Schéma de la base
└── migrations/            # Migrations Prisma
```

## Commandes utiles

| Commande | Description |
|---|---|
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build de production |
| `pnpm start` | Lancer le build de production |
| `pnpm db:generate` | Régénérer le client Prisma |
| `pnpm db:push` | Pousser le schéma vers la base |
| `pnpm db:studio` | Ouvrir Prisma Studio (GUI) |
| `pnpm db:seed` | Remplir la base avec des données de test |
| `pnpm db:reset` | Reset complet de la base |
| `pnpm lint` | Vérifier le code avec ESLint |
