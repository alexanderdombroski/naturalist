import throttle from "https://unpkg.com/lodash-es@4.17.23/throttle.js";

const BASE_URL = "https://api.inaturalist.org/v1";

/** @param {string} endpoint */
async function fetchEndpoint(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  console.log(res, 'res')
  return await res.json();
}

async function fetchPlaces(query) {
  if (!query) return;
  const data = await fetchEndpoint(
    `/places/autocomplete?q=${encodeURIComponent(query)}`,
  );
  return data;
}

async function fetchProjects(params) {
  const { q, place_id, featured, noteworthy } = params;
  if (!q) return;
  console.log(q)
  const queryString = new URLSearchParams(params);
  const data = await fetchEndpoint(`/projects/autocomplete?${queryString}`);
  return data;
}

/** @param {number} projectId */
export async function fetchProject(projectId) {
  return fetchEndpoint(`/projects/${projectId}`)
}

/** Throttle the API calls (max once every 500ms) */
export const throttledFetchPlaces = throttle(fetchPlaces, 500, {
  leading: true,
});
export const throttledFetchProjects = throttle(fetchProjects, 500, {
  leading: true,
});
