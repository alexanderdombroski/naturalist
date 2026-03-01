import throttle from "https://unpkg.com/lodash-es@4.17.23/throttle.js";

const BASE_URL = "https://api.inaturalist.org/v1";

/** @param {string} endpoint */
async function fetchEndpoint(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  return await res.json();
}

async function fetchPlaces(query) {
  if (!query) return;
  const data = await fetchEndpoint(
    `/places/autocomplete?q=${encodeURIComponent(query)}`,
  );
  return data;
}

const defaultParams = { current: true, order: "desc", order_by: "created_at" };
export async function fetchIdentifications(params = {}) {
  const paramString = new URLSearchParams({ ...defaultParams, ...params });
  return await fetchEndpoint(`/identifications?${paramString}`);
}

/** Throttle the API calls (max once every 500ms) */
export const throttledFetchPlaces = throttle(fetchPlaces, 500, {
  leading: true,
});
