# HOY Special Vehicles · Villa Gawy Scout v0.1

Status: active product/research basis, 2026-08-12.

## Test case

Use Villa Gawy / Villa Gawy 2 around Gran Vía de La Manga km 4 as the canonical HOY Special Vehicles test case.

User intent is NOT ordinary transport and NOT ordinary bicycle hire.

Canonical question:

> I am staying around Villa Gawy in La Manga. What unusual, fun, road-legal or guided vehicle can I rent nearby today or tomorrow to get around or have an experience?

Examples:
- 125cc / premium scooter
- motorcycle
- electric motorcycle / road-homologated Sur-Ron-type vehicle
- quad
- road buggy / recreational buggy
- Can-Am Ryker / Spyder / Canyon or similar three-wheel vehicle
- unusual EV / fun car
- off-road vehicle where legal and/or on a permitted guided route

Water products remain relevant elsewhere in HOY Lifestyle but are a separate user intent.

## Product model

Special Vehicles is a shared HOY domain, surfaced primarily through HOY Lifestyle. It must not be hard-bound to one app because the same inventory may be useful in Lifestyle, Mobility, accommodation/concierge contexts and contextual cross-links.

The shared product should support two modes:

1. `self-drive mobility`: user rents a vehicle for hours/days and uses it as personal transport.
2. `guided experience`: user drives a special vehicle only within an organised/legal route or activity.

These must never be mixed in the UI.

## Search radius

Use time/routing bands rather than a fixed municipality boundary:

- `hyperlocal`: La Manga / Cabo de Palos, roughly <= 15 min from the guest
- `local`: Mar Menor / Cartagena edge, roughly <= 30 min
- `nearby`: Cartagena / San Javier / Los Alcázares / San Pedro del Pinatar / Pilar de la Horadada, roughly <= 45 min
- `destination`: >45 min only if the product is genuinely special enough to justify the trip

A nearby provider may still rank as hyper-relevant if it delivers the vehicle to the accommodation.

## Bring it to me

A core HOY differentiator should be `delivery_to_accommodation`.

If the exact special vehicle is not stocked in La Manga, HOY may match a verified provider in Cartagena / Mar Menor / nearby Costa Cálida that offers delivery and collection at the villa/hotel/apartment.

This transforms a thin local inventory into a larger realistic market without pretending the provider is physically in La Manga.

Never show delivery unless confirmed by the provider.

## Current evidence / leads

### 1. ECOMOBIKE / La Manga Bike — direct, current public evidence

Location: beginning of La Manga, around km 1–1.5, close to Villa Gawy test area.

Current public website lists:
- 125cc scooter
- e-bike
- bicycle
- car

Published scooter starting price: 50 EUR/day.

Status: `current_public_confirmed` for scooter rental; exact fleet/model/homologation still needs capture.

Special-vehicle relevance: medium. The 125cc scooter is useful personal mobility but not yet sufficiently unusual by itself.

### 2. Bikes & Quads — strong legacy lead, current operation unresolved

Historic/local guide material identifies a `Bikes & Quads` business around Gran Vía km 6.2–6.7 and describes:
- quads
- off-road buggies
- motorcycles / scooters
- bicycles

This is extremely close to the Villa Gawy test case and would be a perfect HOY result if still operating.

However, evidence is stale and no reliable current first-party source was found in the 2026 scan.

Status: `legacy_high_priority_verify`.

Do NOT expose to consumers as current until directly reverified.

### 3. Gougo Motosharing — historic direct electric-motorcycle signal

Regional reporting documented Gougo electric motorcycles operating in La Manga and Cabo de Palos during the 2024 summer season, with trips around Zoco, Plaza Bohemia, Hotel Cavanna and Cabo de Palos.

Current 2026 operation in La Manga was not independently confirmed in the present scan. Third-party app metadata also suggests the prior app distribution changed after 2024.

Status: `historic_reverify`.

This remains important evidence that electric powered two-wheel mobility has proven local demand.

### 4. Momoven KTM 790 Adventure — Los Alcázares, currently indexed

Peer-to-peer listing:
- KTM 790 Adventure
- 750cc
- A / A2 shown by platform
- minimum age 23
- no deposit shown
- full-week availability presentation

Status: `marketplace_current_candidate`.

Important: peer-to-peer inventory is volatile and must be checked live before HOY presents availability. This is not the same as a permanent commercial rental partner.

### 5. Momoven Yamaha XSR 700 — Cartagena, currently indexed

Peer-to-peer listing:
- Yamaha XSR 700
- 700cc
- A / A2
- owner shown as verified
- multiple previous rentals

Status: `marketplace_current_candidate`.

Special-vehicle relevance: high for users wanting a real motorcycle rather than a scooter.

### 6. Momoven Honda CB600F Hornet — Cartagena, current/recent index

Peer-to-peer listing:
- Honda CB600F Hornet
- 600cc
- licence A
- minimum age 23

Status: `marketplace_current_candidate`.

### 7. DFM Rent a Car Cartagena — current business-index lead

Current business index categorises DFM Rent a Car Cartagena as including a motorcycle rental agency in addition to car/van/recreational rental.

Exact motorcycle/special-vehicle fleet was not established in the first pass.

Status: `business_current_needs_fleet_capture`.

Potentially important for commercial supply and possible delivery partnerships.

### 8. Ecoadventure Bolnuevo — official regional tourism source

Official Turismo Región de Murcia currently lists guided 100% electric buggy routes in Bolnuevo/Mazarrón during the May–October period.

Status: `official_current_guided_experience`.

This is too far for ordinary daily transport from Villa Gawy, but it proves that electric buggy experiences exist in the wider Region of Murcia and may be worth surfacing as a destination experience.

## Explicit gaps after v0.1 scan

No sufficiently current, direct commercial La Manga/Cabo de Palos source was confirmed yet for:
- Can-Am Ryker / Spyder / Canyon rental
- road-homologated Sur-Ron rental
- current commercial quad self-hire
- current commercial recreational buggy self-hire

These are `demand-led gaps`, not categories to delete.

HOY should actively maintain a wanted-inventory list and later recruit verified providers capable of delivery to La Manga.

## Consumer UX

Primary entry should be emotional, not technical:

`Was Cooles fahren`

Suggested secondary filters:
- `Besonders`
- `Motorrad`
- `Roller`
- `Elektro`
- `3 Räder`
- `Quad & Buggy`
- `Offroad`
- `Heute verfügbar`
- `Lieferung zur Unterkunft`

Example result card:

> Yamaha XSR 700
> Cartagena · delivery status unknown
> A2 / A
> legal check available
> next availability: live check required

Never display `available today` from stale scrape/marketplace metadata.

## Legal eligibility gate

Every consumer-facing self-drive result must integrate the shared HOY legal eligibility engine documented in `SPECIAL-VEHICLES-LEGAL-CHECK.md`.

No positive `you can drive this` claim without:
- exact vehicle homologation/category
- licence issuing country
- visitor/resident status where relevant
- licence categories and restrictions
- age / licence seniority
- provider and insurance restrictions

Priority licence countries:
- Germany / EU-EEA
- United Kingdom

Result states remain fail-closed:
- LEGAL MATCH
- LIKELY, PROVIDER CHECK REQUIRED
- NOT ELIGIBLE
- UNCERTAIN

## Strategic rule

HOY should not merely index what happens to exist locally.

For high-demand special categories with weak direct supply, HOY may create demand density and then recruit suitable providers from the surrounding region to offer delivery/collection into La Manga.

This is especially relevant for:
- premium motorcycles
- Can-Am / three-wheel vehicles
- road-legal electric motorcycles
- quad/buggy products

No provider outreach is required during this research phase; prepare the market and product first.

## Next pass

1. Directly reverify whether Bikes & Quads at km 6.x still exists/operates under another name.
2. Capture exact current scooter fleet from ECOMOBIKE.
3. Search commercial motorcycle fleets in Cartagena, Los Alcázares, San Javier, San Pedro and Pilar de la Horadada.
4. Search Can-Am dealers/rental operators and ask later whether rental/delivery to La Manga can be offered.
5. Search road-homologated Sur-Ron / electric-motorcycle rental and dealer demo/rental models.
6. Capture delivery-to-accommodation capability separately from physical provider location.
7. Never publicise stale availability.