# HOY Special Vehicles · Legal Eligibility

Status: product rule / legal-research basis, 2026-08-12.

## Product principle

HOY should help visitors and residents discover unusual vehicles they can rent and drive legally in Spain. Examples include motorcycles, 125cc scooters, e-bikes, quads, recreational buggies, Can-Am vehicles, road-legal electric motorcycles such as some Surron models, and other special/off-road vehicles.

This capability must not be tied prematurely to one app. It should be implemented as shared HOY data + eligibility logic that can surface contextually in HOY Lifestyle, HOY Mobility and later other HOY surfaces.

## Core rule

Never determine legality from a marketing name alone.

`Surron`, `Can-Am`, `buggy`, `quad`, `scooter` and similar names are not sufficient legal classifications. Eligibility must be calculated from the concrete rental vehicle's Spanish/EU homologation and technical data.

For every rentable vehicle store, where applicable:

- make / model / variant
- registration / homologation category
- road_legal
- vehicle_category (e.g. moped, motorcycle, motor tricycle, light quadricycle, quadricycle, passenger vehicle)
- engine_capacity_cc
- continuous / rated power kW
- power-to-weight ratio where legally relevant
- design speed
- seats
- maximum authorised mass where relevant
- required Spanish licence class
- minimum legal age
- provider minimum age
- provider licence-age requirement
- insurance restrictions
- roads/areas permitted
- off-road-only flag
- evidence source and verified_at

## Driver profile

The legal check must consider:

- licence issuing country
- visitor vs Spanish resident
- date Spanish residence began where relevant
- licence validity
- licence category/categories printed or legally recognised
- category acquisition dates / licence age
- restriction codes
- driver's age
- vehicle's exact homologated class
- rental-provider / insurer restrictions

## Initial country scope

Priority 1:
- Germany and other EU/EEA licences
- United Kingdom licences

Reason: these are key target-user groups in La Manga / Cabo de Palos and the recognition rules differ.

### EU / EEA

DGT states that valid EU/EEA licences are valid to drive in Spain while in force. EU residents in Spain may keep using a valid EU licence, subject to Spanish renewal rules for indefinite/very-long-validity licences.

### United Kingdom

Under the Spain-UK driving-licence agreement, valid UK licences are recognised for temporary driving in Spain without an IDP or official translation for the categories for which the licence is valid, subject to Spanish minimum ages and national validity rules. UK residents who move to Spain can generally use a valid UK/Gibraltar licence for up to six months after obtaining residence; continuation then requires exchange under the applicable rules.

The UK case must therefore explicitly distinguish visitor vs resident and licence issue/category details.

## Spanish vehicle licence baseline

Current Spanish baseline:

- AM: mopeds (two/three wheel) and light quadricycles.
- A1: motorcycles up to 125cc, 11 kW and 0.1 kW/kg; motor tricycles up to 15 kW.
- A2: motorcycles up to 35 kW and 0.2 kW/kg, subject to derivation restriction.
- A: motorcycles and motor tricycles; age conditions apply for high-power tricycles.
- B: passenger/light vehicles within B limits plus motor tricycles and quadricycles; Spanish rules also allow B holders with more than three years' seniority to drive A1-class motorcycles within Spanish territory.

HOY should treat the B+3/A1 rule conservatively for foreign-issued licences until the applicability to the user's exact licence situation is confirmed by authoritative legal rules and, separately, the rental provider/insurer accepts it.

## Special-vehicle examples

### 125cc scooter / motorcycle

Do not display `You may drive this` merely because the user holds car category B. Check licence origin, B seniority, age, restrictions, Spanish recognition rules and provider/insurer acceptance.

### Surron / electric dirt-bike style vehicle

Exact model matters. A road-homologated variant may fall into a moped or motorcycle category depending on homologation/power/speed, while an off-road variant may not be road legal at all. Store the homologation of the exact rental unit/model.

### Can-Am

Exact model matters. Some products may be homologated as motor tricycles, others as quadricycles/off-road vehicles. Required licence and minimum age follow the actual homologation, not the Can-Am brand name.

### Quad / buggy / off-road vehicle

Separate two questions:
1. Is the driver licensed to drive the vehicle?
2. Is the vehicle legally allowed on the intended road/trail/terrain?

A driver's licence does not imply permission to use beaches, protected areas, private tracks or restricted off-road routes.

## UX

Before showing a booking/contact CTA, HOY can offer:

`Darf ich das in Spanien fahren?`

Minimal flow:
1. Country that issued your licence
2. Visitor or resident in Spain
3. Licence categories / optional licence scan later
4. Age
5. Exact rental vehicle

Result states:

- `LEGAL MATCH` — authoritative rules and vehicle data support eligibility.
- `LIKELY, PROVIDER CHECK REQUIRED` — legal rule appears compatible but provider/insurance acceptance needs confirmation.
- `NOT ELIGIBLE` — licence/age/category does not match.
- `UNCERTAIN` — HOY cannot establish legality safely; no definitive green claim.

Every result should show:
- why
- required licence/category
- relevant age/seniority condition
- provider-specific restrictions
- evidence date

## Safety / liability rule

Fail closed. HOY must never turn incomplete vehicle data, an ambiguous licence, an unknown restriction code or an unresolved foreign-licence equivalence into a positive legal claim.

A provider saying `B licence is enough` is not by itself legal evidence. Provider restrictions are an additional layer, not a replacement for Spanish law.

## Shared HOY architecture

Special Vehicles should be a shared domain service/data layer, not a separate app decision at this stage.

Possible surfaces:
- HOY Lifestyle: discovery / experiences / rentals
- HOY Mobility: practical local transport rentals where appropriate
- future accommodation/concierge surfaces: context-aware suggestions

The same vehicle, provider, legal classification and eligibility result should be reused across all HOY products.

## Next legal-research steps

1. Build authoritative Germany/EU and UK licence equivalence tables.
2. Model old/new UK licence issue periods and restriction codes from the Spain-UK agreement annexes.
3. Verify applicability of Spain's B+3-to-A1 national rule to each supported foreign licence scenario before issuing green results.
4. Build homologation-to-licence mappings for L1e/L3e/L5e/light-quadricycle/quadricycle vehicle classes.
5. Research Murcia-specific off-road / protected-area circulation restrictions.
6. Add rental-provider insurance/minimum-age policies as a separate constraint layer.
7. Only then expose a consumer-facing legal eligibility result.