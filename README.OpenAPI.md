# OpenAPI Generator Integration

Ce projet utilise OpenAPI pour définir l'API du site Mino Skincare et générer du code automatiquement.

## Fichiers importants

- `openapi.yaml` : spec OpenAPI 3.0 de l'API.
- `package.json` : scripts de génération.

## Installer les dépendances

```bash
pnpm install
```

## Générer le client OpenAPI

```bash
pnpm run openapi:generate:client
```

Le code sera produit dans le dossier `openapi-client`.

## Générer un serveur Express stub

```bash
pnpm run openapi:generate:server
```

Le stub serveur sera produit dans `openapi-server`.

## Commande utile

```bash
pnpm run openapi:generate
```

équivaut à la génération du client.

## Utilisation

- Importer le client généré depuis `openapi-client`.
- Adapter le stub serveur dans `openapi-server` si vous voulez une API Node.js séparée.

## Exemples

Dans une page ou un service frontend, vous pouvez appeler :

```ts
import { DefaultApi } from '../openapi-client'

const api = new DefaultApi()
const products = await api.getProducts()
```

## Note

Le générateur produit du code dans `openapi-client` et `openapi-server`.
Vous pouvez versionner ces dossiers si vous voulez, ou les régénérer en cas de modification du spec.
