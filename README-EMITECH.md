# Emi_Tech storefront

Storefront headless per lo shop Emi_Tech (emi-tech.it), basato su BigCommerce Catalyst con integrazione Makeswift.

## Da dove viene il codice

Base: `bigcommerce/catalyst`, branch `integrations/makeswift` (pacchetto `@bigcommerce/catalyst-makeswift` 1.13.0), commit `47325062a3d37a2a564d5eac23ce1e0f6f1a17cb` del 21/10/2026.
Rispetto all'upstream sono stati tolti `.github/` (workflow CI di BigCommerce) e `.changeset/`.
Per aggiornare in futuro si riparte da quel commit e si riapplicano le modifiche Emi_Tech.

## Struttura

- `core/` è l'app Next.js vera e propria (root directory da impostare su Vercel).
- `packages/` sono le librerie interne usate da `core` (client GraphQL, eslint config).
- Monorepo pnpm + turbo, Node 22 (vedi `.nvmrc`).

## Variabili d'ambiente

Le chiavi non stanno nel repo. Copiare `core/.env.example` in `core/.env.local` in locale, e impostarle come Environment Variables nel progetto Vercel.

| Variabile | Valore / dove si prende |
|---|---|
| `BIGCOMMERCE_STORE_HASH` | `mdzh960sd4` |
| `BIGCOMMERCE_CHANNEL_ID` | `1897018` (canale "Emi_Tech Catalyst") |
| `BIGCOMMERCE_STOREFRONT_TOKEN` | pannello BigCommerce → Settings → Storefront API tokens, legato al canale 1897018 |
| `BIGCOMMERCE_STOREFRONT_UNAUTHENTICATED_TOKEN` | idem, token senza customer (facoltativo) |
| `BIGCOMMERCE_ACCESS_TOKEN` | Store API account (serve per i componenti Makeswift tipo CustomerGroupSlot) |
| `MAKESWIFT_SITE_API_KEY` | builder Makeswift → Settings → Host |
| `AUTH_SECRET` | `openssl rand -hex 32` |
| `ENABLE_ADMIN_ROUTE` | `false` in produzione |

Le lingue (it, en) vengono lette dalle impostazioni del canale su BigCommerce, non vanno configurate qui.

## Sviluppo locale

```bash
corepack enable
pnpm install
cp core/.env.example core/.env.local   # poi compilare i valori
pnpm dev
```

## Deploy

Vercel, root directory `core`, framework Next.js, package manager pnpm. Dominio di produzione `emi-tech.it` (DNS su Serverplan).
