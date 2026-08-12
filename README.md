# HOY Lifestyle

HOY Lifestyle ist die Schwester-App von HOY Gastro für La Manga del Mar Menor,
Cabo de Palos und die relevante Umgebung.

## Produktidee

HOY Lifestyle beantwortet die Frage:

**„Was kann ich heute, jetzt und hier machen?“**

Die App soll Freizeitangebote nicht nur auffindbar machen, sondern auch Aktivitäten
entdecken lassen, von denen Nutzer bisher möglicherweise noch nichts wussten.

Dazu gehören unter anderem:

- Wassersport
- Tauchen & Schnorcheln
- Boot & Segeln
- Reiten
- Fitness
- Padel & Tennis
- Familie & Kinder
- Natur
- Wellness
- Events & Märkte
- Indoor-Aktivitäten
- außergewöhnliche Erlebnisse und Tagesausflüge

## Rentals als eigener Kernbereich

Vermietungen werden nicht als unscharfe Unterkategorie von „Aktivitäten“ behandelt,
sondern als eigener Produktbereich innerhalb von HOY Lifestyle.

Dazu gehören insbesondere:

### Land
- Fahrräder
- E-Bikes
- Rennräder / Mountainbikes
- Roller / Mopeds
- Motorräder
- Quads
- Buggys
- Mietwagen
- Vans / 7-Sitzer

### Wasser
- Motorboote mit Führerschein
- Boote ohne Führerschein
- Boote mit Skipper
- Segelboote
- Jetskis
- Kajaks
- SUP
- Tretboote und weitere Wassersport-Ausrüstung

HOY soll dabei nicht nur Anbieter auflisten, sondern möglichst beantworten:

- Was kann ich heute noch mieten?
- Was kostet es?
- Wo kann ich es abholen?
- Wird es zur Unterkunft geliefert?
- Brauche ich einen Führerschein / Bootsführerschein?
- Wie hoch ist die Kaution?
- Was ist im Preis enthalten?
- Für wie viele Personen ist das Produkt geeignet?

Der Bereich bleibt Teil von HOY Lifestyle. Eine separate Rental-App ist derzeit nicht gerechtfertigt.

## Produktprinzip

HOY Lifestyle ist kein klassisches Branchenverzeichnis.

Im Mittelpunkt stehen:

- Was ist heute möglich?
- Was ist jetzt noch möglich?
- Was findet heute Abend statt?
- Was ist kostenlos?
- Was eignet sich mit Kindern?
- Was ist bei Hitze oder schlechtem Wetter geeignet?
- Was ist in sinnvoller Fahrzeit erreichbar?
- Was könnte mich überraschen?

## Technische Strategie

HOY Lifestyle wird nicht unabhängig von Grund auf neu entwickelt.

Zuerst wird HOY Gastro vollständig und stabil fertiggestellt.
Anschließend wird dessen bewährter HOY-Unterbau als Basis für HOY Lifestyle verwendet.

Gemeinsam genutzt werden sollen unter anderem:

- HOY Designsystem
- Navigation und App-Shell
- Karten- und Standortlogik
- Mehrsprachigkeit
- Favoriten
- Supabase-Grundarchitektur
- Live- und Aktualitätslogik
- gemeinsame UI-Komponenten

Lifestyle-spezifisch bleiben insbesondere:

- Places
- Experiences
- Rentals
- Rental Products
- Sessions
- Events
- Availability
- Freizeitkategorien und Filter

## Status

Aktuell befindet sich HOY Lifestyle in der Daten- und Produktvorbereitung.

Die erste strukturierte Rental-Recherche liegt unter:

- `docs/RENTALS-V0.1.md`
- `data/rentals-research-v0.1.csv`

Die eigentliche App-Entwicklung beginnt nach Fertigstellung des stabilen HOY-Gastro-Core.
