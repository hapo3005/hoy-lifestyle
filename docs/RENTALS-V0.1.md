# HOY Lifestyle · Rentals v0.1

Status: first structured market scan, 2026-08-12.

## Product rule

Rentals are a first-class HOY Lifestyle domain, not one undifferentiated activity list. The product must answer what can be rented, where, under which conditions, at what price, and ideally whether it is available today.

## Core taxonomy

### Land
- bicycle
- e-bike
- road bike
- mountain bike
- scooter / moped
- motorcycle
- quad
- buggy
- car
- van / 7-seater

### Water
- motorboat with licence
- motorboat without licence
- boat with skipper
- sailboat
- jet ski
- kayak
- SUP
- pedal boat
- other water-sports equipment

## Market finding

The local supply is highly uneven.

Strong direct supply in La Manga / Cabo de Palos:
- boats and charters
- boats without licence
- jet skis
- kayak / SUP
- bicycles / e-bikes / 125cc scooters

Weaker or not yet sufficiently verified direct local supply:
- full-size motorcycles
- quads
- recreational off-road buggies

HOY must show this honestly. A thin category should not be padded with distant or stale businesses. Nearby-region supply can be offered separately as `nearby`, never presented as directly in La Manga/Cabo de Palos.

## Confirmed public examples

### La Manga Bike / ECOMOBIKE
Location: Gran Vía de La Manga km 1.5.
Public offer: bicycle, e-bike, 125cc scooter, car.
Published starting prices: bicycle 15 EUR/day, e-bike 20 EUR/day, scooter 50 EUR/day, car 50 EUR/day.
Website: https://lamangabike.com/
Initial HOY status: research-confirmed; operational verification later.

### Kayak Cabo de Palos
Location: C/ Salero 11, Cabo de Palos.
Public offer: single/double kayaks, SUP, guided routes.
Published rental examples: single kayak 20 EUR/1.5h; double kayak 30 EUR/1.5h; SUP 20 EUR/1.5h.
Website: https://www.kayakcabodepalos.com/
Initial HOY status: research-confirmed; strong candidate for live availability.

### Motos de Agua La Manga
Location/start: Puerto Tomás Maestre.
Public offer: guided jet-ski rentals/excursions; with or without licence/experience depending product.
Website: https://www.motosdeagualamanga.com/
Initial HOY status: research-confirmed.

### Maleni Jet
Location: La Manga km 5 / Castillo de Mar area.
Public/business listing offer: jet skis, boats without licence, kayak, banana and other water activities.
Initial HOY status: research-confirmed; direct website/price capture still required.

### Portless La Manga
Public offer: boats with and without licence.
Published examples: Trinity, up to 6 persons, no licence, 120 EUR / 2h; Delux II, up to 10 persons, licence required, 200 EUR / 2h.
Website: https://www.portlesslamanga.com/alquiler-barcos/
Initial HOY status: research-confirmed.

### Life Aholic
Location: Puerto Tomás Maestre.
Public/business listing category: boat rental / boat dealer.
Initial HOY status: business-index confirmed; product/price extraction still required.

### Luxury Charter La Manga
Location: Puerto Tomás Maestre.
Public/business listing category: boat rental service.
Initial HOY status: business-index confirmed; product/price extraction still required.

### Mar Menor Charter
Location: Calle Cornisa del Estacio, La Manga.
Public/business listing category: boat rental service.
Initial HOY status: business-index confirmed; product/price extraction still required.

### Nautical Ark / Velfun Charter
Location: Puerto Deportivo Tomás Maestre / La Manga.
Public/business listing category: sailboat / boat rental, including no-skipper/no-pattern offer.
Initial HOY status: business-index confirmed; duplicate/business-identity check required before production import.

### Jade Sailing
Location: Puerto de Cabo de Palos.
Public/business listing category: boat rental service.
Initial HOY status: business-index confirmed; product/price extraction still required.

### Djinn Charter
Location: Paseo de la Barra, Cabo de Palos.
Public/business listing category: boat rental and boat tours.
Initial HOY status: business-index confirmed; product/price extraction still required.

## Nearby-region supply

These may be useful when no direct La Manga/Cabo product exists, but must be clearly labelled as nearby.

### Jesalcar · Los Narejos / Los Alcázares
Offer: normal and electric bicycle rental, sales and repair.
Source: local Los Alcázares business directory and business index.

### OriMar Bikes
Base: Pilar de la Horadada; advertises delivery to La Manga Club, Mar Menor and Los Alcázares.
Offer: premium carbon road-bike rental and cycling logistics.

### Motorcycle lead · Los Alcázares
A current peer-to-peer Momoven listing shows a KTM 790 Adventure in Los Alcázares. This proves regional motorcycle rental demand/supply exists, but it is not equivalent to a stable local commercial rental provider and must not be seeded as a permanent HOY business.

## Quad / buggy finding

The initial public scan did not identify a sufficiently strong, current commercial quad or recreational buggy rental directly in La Manga/Cabo de Palos. Do not create empty or misleading supplier cards. Keep both categories in the taxonomy and continue targeted verification in Cartagena / Mar Menor surroundings.

Golf buggies are a separate product class and must not be mixed with recreational road/off-road buggies.

## HOY data fields

Every rental product should eventually support:

- provider_id
- category
- subtype
- product_name
- location / pickup point
- delivery_available
- delivery_area
- price_from
- pricing_unit: hour / half-day / day / week / trip
- deposit_required
- deposit_amount
- licence_required
- accepted_licence_types
- minimum_age
- capacity
- fuel_included
- insurance_included
- helmet_or_safety_gear_included
- skipper_available / skipper_required
- cancellation_rule
- booking_method
- instant_booking
- today_available
- availability_verified_at
- season_start / season_end
- languages
- source_url
- source_verified_at
- verification_status

## UX principle

The user should never have to understand the provider landscape first.

Examples:

- `Heute noch ein Boot ohne Führerschein`
- `E-Bike für morgen`
- `125er Roller für 3 Tage`
- `Boot für 6 Personen, ohne Schein`
- `Motorrad in der Nähe`

HOY filters providers and products behind the scenes and shows the relevant conditions before contact or booking.

## Availability model

v0.1: public/static availability hints only (`today possible`, season, opening state).

v0.2: provider-confirmed availability windows in the Business Dashboard.

v0.3: optional booking / lead integrations where commercially and legally sensible.

## Cross-app links

Rentals stay inside HOY Lifestyle. Contextual deep links may connect to:

- HOY Gastro: food/drink before or after the rental experience
- HOY Mobility: getting to the pickup point
- later HOY Concierge: rental suggestions from the guest's accommodation context

No separate rental app is justified at this stage.

## Next research passes

1. Expand every water-rental operator around Puerto Tomás Maestre and Cabo de Palos.
2. Capture current public prices/product types from first-party sites.
3. Deep-search motorcycle, quad and recreational buggy supply in Cartagena / Mar Menor.
4. De-duplicate operators that appear under several marketplace/business names.
5. Assign exact coordinates and `direct` vs `nearby` coverage.
6. Only after the provider inventory is dense enough, design the production UI.
