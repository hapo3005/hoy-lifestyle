# HOY Lifestyle quality standard

HOY Lifestyle targets the same engineering and product standard as HOY Gastro. It is not enough for a page to look polished: data truth, freshness, authorization, accessibility semantics, browser behavior and release QA are part of product quality.

## Release principles

1. **No known unexplained release failure is accepted.**
2. **Research is not live truth.** `RESEARCHED`, `OWNER_CONFIRMED`, `HOY_VERIFIED`, `LIVE_TODAY`, `STALE` and `CONFLICT` remain distinct.
3. **Unknown is not false.** This is especially important for accessibility, eligibility and availability.
4. **LIVE TODAY expires.** No yesterday-state may silently survive into a new local day.
5. **No automatic geolocation request.** Location is opt-in and can be used request-scoped.
6. **Organic discovery is not pay-to-win.** Sponsorship cannot silently modify the organic HOY NOW score.
7. **Public clients never receive secret/service-role credentials.**
8. **PWA caching never captures auth/API/Supabase traffic.**
9. **Public source provenance is retained per critical field/object.**
10. **Operator writes are authorized server-side / via RLS and auditable.**

## Accessibility contract

HOY does not publish a universal “barrier-free” percentage.

A user requirement can be required, preferred or ignored. Concrete facts use at least `yes`, `no`, `partial`, `unknown`, `not_applicable`, `temporarily_unavailable`. The evidence source and verification state are separate from the fact value. `unknown` never earns a positive match.

## Quality gates

A release candidate should not be considered Gastro-quality until static runtime/data contracts pass; unit tests for decision gates and trust semantics pass; catalog integrity and service-worker cache boundary pass; Mobile Chrome, Mobile WebKit and Desktop Chromium pass; owner authorization/RLS is validated against a real project; and the production smoke test has no known regression.

## Current foundation scope

This repository now provides the first parity-grade vertical slice: a 101-record structured Lifestyle catalog, HOY NOW decision engine, provenance/freshness semantics, accessibility-safe matching, explicit geolocation UX, guest experience, owner workflow contract, PWA cache boundary, Supabase domain/RLS contract and automated QA.

It is a foundation, not permission to skip real production validation.
