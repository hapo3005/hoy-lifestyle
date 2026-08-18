# HOY Lifestyle — Gastro Parity Gate v1.0

HOY Lifestyle is only allowed to claim vertical parity with HOY Gastro when every gate below is evidenced by code, data contracts and automated QA. Since Lifestyle 0.3, cross-vertical truth semantics are owned by **HOY Platform Core v1.0** (`HOY-PC-1.0`); Lifestyle owns only domain translation, context scoring and presentation.

## Platform Core boundary

- `platform-core.lock.json` pins an immutable Platform Core source commit and Git blob SHA.
- `vendor/hoy-platform-core-v1.js` is a generated runtime artifact, not a second handwritten source of truth.
- `npm run platform:check` fails if the vendor artifact differs from the pinned core blob.
- `src/requirements.js` delegates confirmation, freshness and MUST/PREFER/IGNORE semantics to `HOYPlatformCore`.
- `src/commercial-integrity.js` delegates sponsorship eligibility/disclosure semantics to `HOYPlatformCore`.
- Lifestyle may add stricter domain gates but may not weaken Platform Core truth, safety or commercial-integrity rules.

## P0 product truth

- Discovery and HOY NOW ranking remain evidence-backed and fail closed.
- Truth value and verification state are separate concepts.
- Canonical fact values are `yes`, `no`, `partial`, `unknown`, `not_applicable`, `temporarily_unavailable`.
- Only `hoy_verified`, `business_confirmed` and `community_confirmed` may produce a confirmed MUST match or mismatch.
- `external_unverified`, stale, disputed and missing facts never become confirmed positive claims.
- `unknown` remains `NEEDS_CONFIRMATION`; confirmed `no`, `partial`, `not_applicable` and `temporarily_unavailable` do not satisfy a default `MUST=yes`.
- MUST / PREFER / IGNORE is supported, including numeric `gte` / `lte` comparisons.
- A confirmed failed MUST is a no-match. An unresolved MUST is a possible match that explicitly requires confirmation. PREFER may rank but can never rescue a failed MUST.

## Trust and freshness

- Research, owner confirmation, HOY verification and live-today state remain distinct.
- Suppressed, identity-conflicted or inactive records are not eligible for ranking.
- Stale or disputed evidence is not promoted to current truth.
- Platform research freshness defaults to 180 days and requires a usable source-check timestamp.

## Commercial integrity

- Organic HOY Fit is calculated independently from sponsorship.
- Sponsorship never changes the organic score or rank.
- A paid placement is eligible only when active, approved and explicitly disclosed as `Anzeige`.
- Suppressed records can never be promoted commercially.

## Safety and privacy

- Weather/safety blocks override ranking.
- Geolocation is opt-in and is not requested during initial bootstrap.
- The service worker keeps same-origin cache boundaries and excludes auth/API/function traffic.
- No owner/live truth is invented from research data.

## Data and operator quality

- Catalog IDs and slugs are unique and the current catalog contract remains versioned.
- Owner workflows remain non-authoritative until authenticated authorization and production validation exist.
- Production Supabase rollout remains separately gated by RLS/GRANT, advisor, migration and smoke-test evidence.

## QA gate

Before merge/release:

1. `npm run platform:check` passes.
2. `npm run qa:static` proves the Lifestyle adapters delegate to HOY Platform Core instead of reimplementing truth/commercial rules.
3. `npm run qa:unit` passes.
4. Full Playwright desktop/mobile browser matrix passes.
5. No known release failure is waived without an explicit documented exception.
6. Production database changes remain outside a frontend-only merge unless the coordinated Supabase release gate is passed.

## Status semantics

`PARITY_CODE_COMPLETE` means the cross-vertical product contracts and automated source-level checks exist and Lifestyle consumes the pinned HOY Platform Core. It does **not** mean production rollout, legal clearance, provider confirmation or live-data completeness are finished.
