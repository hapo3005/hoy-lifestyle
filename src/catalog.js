const INDEX_URL = "./data/lifestyle-catalog-index.json";

let cached;

export async function loadCatalog() {
  if (cached) return cached;
  const indexResponse = await fetch(INDEX_URL, { cache: "no-store" });
  if (!indexResponse.ok) throw new Error(`Catalog index load failed: ${indexResponse.status}`);
  const index = await indexResponse.json();
  if (index.contractVersion !== "1.0.0" || !Array.isArray(index.chunks)) {
    throw new Error("Unsupported Lifestyle catalog contract");
  }
  const chunks = await Promise.all(index.chunks.map(async url => {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Catalog chunk load failed: ${response.status}`);
    const rows = await response.json();
    if (!Array.isArray(rows)) throw new Error("Invalid catalog chunk");
    return rows;
  }));
  const records = chunks.flat();
  if (index.recordCount !== records.length) throw new Error("Catalog recordCount mismatch");
  cached = { ...index, records };
  return cached;
}

export function publicSourceLinks(item) {
  return (item?.trust?.sourceUrls || []).filter(url => /^https:\/\//i.test(String(url)));
}
