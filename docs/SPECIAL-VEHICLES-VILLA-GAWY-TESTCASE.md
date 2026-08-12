# HOY Special Vehicles · Villa Gawy test case

Status: active product/research case, 2026-08-12.

## User problem

Starting from Villa Gawy 1/2 in La Manga, the user is not primarily looking for the cheapest transport. The question is:

> What unusual, fun vehicle can I rent nearby to get around or turn mobility into part of the holiday experience?

This is explicitly different from airport transfer/local taxi and from ordinary bicycle hire.

## Search intent

Prioritise:
- Can-Am / Ryker / Spyder / Trail
- quad / ATV
- buggy / SSV
- road-legal electric motorcycles (including Surron-class products where available)
- motorcycles beyond basic commuter scooters
- Vespa / distinctive scooters
- unusual road-legal microcars / fun cars
- premium e-mobility only when it is genuinely special (e.g. high-end e-MTB/fatbike), not generic bicycles

## Coverage rings

Do not use one rigid distance filter. Rank by value and friction:

1. `direct` — La Manga / Cabo de Palos: easiest pickup; strong default.
2. `nearby` — Mar Menor / Cartagena / San Javier / Los Alcazares: acceptable when the product is special or delivery is available.
3. `experience_worth_trip` — roughly wider Costa Calida / southern Costa Blanca: only surface when the vehicle/experience is unusual enough to justify the drive (e.g. Can-Am off-road tour).

A provider farther away can outrank a nearby generic scooter if it uniquely satisfies the user's `something special` intent.

## First current findings

- Ecomobike: current first-party La Manga provider offering Vespas and 125cc motorcycles/scooters.
- Motor Rent, San Miguel de Salinas: current first-party Can-Am Trail 800cc buggy, SSV 550/800cc and Quad ATV 450cc guided off-road experiences; published 1h30 Can-Am Trail experience for two at 150 EUR.
- Bikes & Quads, La Manga km 6.x: important historic/direct lead for road-legal quads and off-road buggies, but not independently proven active in 2026. Never publish as active without re-verification.
- DFM Cartagena: current business-index motorcycle-rental lead; exact fleet needs first-party verification.
- Pacutos San Javier: current Can-Am dealer; not a rental provider. Treat as possible future partner/supply lead only.
- Ecoadventure Bolnuevo: current official Murcia tourism listing for 100% electric buggy experiences; farther away but useful category/market evidence.

## UX target

A future HOY surface should be able to answer:

`Was Geiles kann ich hier fahren?`

Possible result card:

- vehicle/model
- why it is special
- pickup/delivery friction
- distance/travel time from user
- rental vs guided experience
- price
- today/next availability
- passengers
- road/off-road context
- legal/homologation class
- `Darf ich das mit meinem Führerschein fahren?`
- provider/insurer restrictions

## Ranking model

Suggested ranking features:

- uniqueness score
- current availability
- exact vehicle match
- travel/pickup friction
- delivery to accommodation
- legal eligibility confidence
- price/value
- evidence freshness
- provider verification

Do not rank purely by distance.

## Safety / legal gate

A vehicle card may be discoverable before legal eligibility is known, but HOY must not show a definitive `you may drive this` claim until the shared legal eligibility service can match the exact homologated vehicle to the user's licence origin/categories, age/residency status and provider/insurer rules.

## Research rule

Historical local leads are valuable because they prove category fit/demand, but they are never production inventory until independently reverified. The desired end-state is a live provider/product inventory, not a scraped directory.
