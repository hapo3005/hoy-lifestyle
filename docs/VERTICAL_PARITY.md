# HOY Lifestyle — Gastro Parity Gate v1.0

HOY Lifestyle is only allowed to claim vertical parity with HOY Gastro when every gate below is evidenced by code, data contracts and automated QA. This document is a release contract, not marketing copy.

## P0 product truth

- Discovery and HOY NOW ranking remain evidence-backed and fail closed.
- Truth value and verification state are separate concepts.
- Canonical fact values are `yes`, `no`, `partial`, `unknown`, `not_applicable`, `temporarily_unavailable`.
- Only `hoy_verified`, `business_confirmed` and `community_confirmed` may produce a confirmed MUST match or mismatch.
- `external_unverified`, stale, disputed, missing and partial facts never become confirmed positive claims.
- MUST / PREFER / IGNORE is supported, including numeric `gte` / `lte` comparisons.
- A confirmed failed MUST is a no-match. An unresolved MUST is a possible match that explicitly requires confirmation. PREFER may rank but can never rescue a failed MUST.

## Trust and freshness

- Research, owner confirmation, HOY verification and live-today state remain distinct.
- Suppressed, identity-conflicted or inactive records are not eligible for ranking.
- Stale or disputed evidence is not promoted to current truth.

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

1. `npm run qa:static` passes.
2. `npm run qa:unit` passes.
3. Full Playwright desktop/mobile browser matrix passes.
4. No known release failure is waived without an explicit documented exception.
5. Production database changes remain outside a frontend-only merge unless the coordinated Supabase release gate is passed.

## Status semantics

`PARITY_CODE_COMPLETE` means the cross-vertical product contracts and automated source-level checks exist. It does **not** mean production rollout, legal clearance, provider confirmation or live-data completeness are finished.
