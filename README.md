# Marijn met aandacht

Nederlandstalige website voor mindfulness, trainingen en begeleiding, gebouwd met Next.js, React en TypeScript.

## Lokaal draaien

Vereist Node.js 20.9 of nieuwer.

```bash
npm install
npm run dev
```

Open daarna [http://localhost:3000](http://localhost:3000).

## Controles

```bash
npm run typecheck
npm run lint
npm run build
```

## Wat is aangepast in v2

- Header met logo op alle pagina's
- Meerdere pagina's toegevoegd
- Training detailpagina's toegevoegd
- Contactpagina toegevoegd
- Nieuwere Next.js en React versies
- TypeScript- en ESLint-controles toegevoegd

## Pagina's

- /
- /over-marijn
- /trainingen
- /trainingen/mindfulness-basistraining
- /trainingen/workshop-voor-teams
- /trainingen/individuele-begeleiding
- /contact

## Deployment

De applicatie is geschikt voor deployment op Vercel. Koppel de GitHub-repository aan een Vercel-project; pushes naar de gekozen productiebranch kunnen vervolgens automatisch worden uitgerold.
