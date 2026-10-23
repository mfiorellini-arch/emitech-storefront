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

## Home page e skin

- Palette in `core/globals.css` e `core/lib/makeswift/components/site-theme/base-colors.tsx` (antracite `215 20% 10%` + verde `145 70% 55%`).
- Font: Space Grotesk per i titoli, Inter per il testo, Roboto Mono per gli accenti (`core/app/fonts.ts`).
- La home (`core/app/[locale]/(default)/page.tsx`) è scritta in codice: hero, griglia categorie (prese da BigCommerce), prodotti in evidenza, "come funziona", novità, fascia B2B, newsletter. Se su Makeswift viene pubblicata una pagina sul path `/`, quella sostituisce la home in codice.
- Testi in `core/messages/it.json` e `en.json`, namespace `Home`.
- Logo: viene letto dalle impostazioni dello store BigCommerce (Store Settings → Storefront → Logo). Finché non c'è il logo definitivo, impostare il logo testuale "Emi_Tech".
- Le CTA B2B puntano a `/b2b`, pagina da creare su BigCommerce (Web Pages) con il form preventivo.

## Deploy

Vercel, root directory `core`, framework Next.js, package manager pnpm, **Node 24** (Catalyst richiede `>=24`, va impostato nelle Project Settings di Vercel). Il comando di build lancia prima `generate`, che scarica lo schema GraphQL dello store, quindi servono store hash, channel id e storefront token tra le variabili d'ambiente già in fase di build. Dominio di produzione `emi-tech.it` (DNS su Serverplan).
