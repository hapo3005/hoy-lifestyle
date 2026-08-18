# HOY Lifestyle

HOY Lifestyle beantwortet für La Manga del Mar Menor, Cabo de Palos und die relevante Umgebung eine konkrete Frage:

> **Was kann ich heute, jetzt und hier machen?**

Es ist keine statische Tourismus- oder Branchenliste. Die Produktlogik kombiniert Aktivität, Zeitfenster, Verfügbarkeit, Restriktionen, Wetterkontext, Family-/Accessibility-Bedarf und Datenfrische.

## Qualitätsziel

Lifestyle wird auf denselben Produkt- und Engineering-Maßstab wie HOY Gastro gebracht:

- explizite Trust-/Freshness-Zustände;
- keine erfundenen Live-Aussagen;
- konkrete Accessibility-Attribute statt Pauschalbadge;
- Betreiberverifizierung und auditable Datenherkunft;
- PWA-Cache-Grenzen;
- Supabase RLS/Authorization contract;
- unit + browser QA;
- Mobile Chrome, Mobile WebKit und Desktop Chromium als Release-Matrix;
- null bekannte/unexplained Release-Failures als Ziel.

Siehe [`docs/QUALITY_STANDARD.md`](docs/QUALITY_STANDARD.md).

## Aktueller vertikaler Slice

Der Stand enthält:

- 101 strukturierte Lifestyle-Research-Datensätze aus dem aktuellen Masterbestand;
- Nutzer-Home mit HOY NOW Ranking;
- Presets: Jetzt, Heute, Mit Kindern, Drinnen, Sunset, Barrierefreiheit, Überrasch mich;
- Activity/Provider-Detail mit Preis, Regeln, Trust, Accessibility und Quellen;
- explizit opt-in Geolocation;
- Betreiber-Arbeitsplatz für lokale, **nicht veröffentlichte** Vorprüfung;
- PWA Service Worker mit Same-Origin-Cache-Grenze;
- versionierten Catalog Contract;
- Supabase Domain/RLS Foundation;
- Edge-Discovery-Adapter;
- statische/unit/browser QA und GitHub Gates.

## Daten

Aktueller importierter Research-Snapshot:

- `data/lifestyle-catalog-index.json` + versionierte Chunks unter `data/catalog/`
- Contract: `data/contracts/lifestyle-catalog-index-v1.schema.json` + `data/contracts/lifestyle-record-v1.schema.json`

Wichtig: Ein Research-Datensatz ist nicht automatisch `OWNER_CONFIRMED`, `HOY_VERIFIED` oder `LIVE_TODAY`.

## HOY NOW Organic Score

100 Punkte: Intent/category 25 · Availability 20 · Time window 15 · Distance/travel 10 · Weather/context 10 · Family/access preference 5 · Trust/freshness 10 · Variety/serendipity 5.

Harte Gates laufen **vor** dem Score. Gesponserte Platzierung verändert den organischen Score nicht.

## Lokale QA

```bash
npm install --no-audit --no-fund
npm run qa
npm run qa:e2e
```

Browser-Matrix: Mobile Chromium · Mobile WebKit · Desktop Chromium.

## Supabase

Die Migration `supabase/migrations/20260818_lifestyle_quality_foundation.sql` definiert das Domain- und RLS-Fundament. Sie ist absichtlich fail-closed: nicht ausdrücklich autorisierte Betreiber-Mutationen bleiben trotz Tabellen-GRANT durch RLS gesperrt, bis die jeweilige Policy und ihre Tests vorhanden sind.

Vor Production: reales Projekt integrieren; RLS/GRANT- und Advisor-Checks ausführen; Owner-Claim-Authorization testen; Production Smoke Test durchführen.

## Produktbereiche

Wasser & Meer · Tauchen · Boot & Charter · Familie & Spaß · Natur & Outdoor · Sport & Fitness · Wellness · Kultur & Lokales · Mobilität/Rentals · Events & Märkte.

Rentals bleiben ein Kernbereich von HOY Lifestyle, keine separate App.
