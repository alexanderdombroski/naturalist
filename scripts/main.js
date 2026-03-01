import { fetchIdentifications, throttledFetchPlaces } from "./iNaturalist.js";
import { fillObservations } from "./observationsGrid.js";
import { setupGalleryTooltip } from "./tooltip.js";
import { forceSearchRefresh } from "./utils.js";

// ---------- Places ----------

let place_id;

const placeList = document.getElementById("place-list");
const placesInput = document.getElementById("places-search");
placesInput.addEventListener("input", (e) => {
  searchPlaces(e.currentTarget.value);
  forceSearchRefresh(placesInput, "place-list");
});
placesInput.addEventListener("change", (e) => {
  place_id = placeList
    .querySelector(`option[value="${e.currentTarget.value}"]`)
    ?.getAttribute("data-id");
  updateIdentifications();
});

async function searchPlaces(search) {
  const data = await throttledFetchPlaces(search);

  placeList.innerHTML = "";
  data?.results.forEach((place) => {
    const { display_name, id } = place;
    const option = document.createElement("option");
    option.value = display_name;
    option.innerText = display_name;
    option.setAttribute("data-id", id);
    placeList.appendChild(option);
  });
}

// ---------- Biological Rank ----------

let rank = "";

// document.getElementById("rank").addEventListener("change", (event) => {
//   rank = event.currentTarget.value;
//   updateIdentifications();
// });

// ---------- Load Identifications ----------

async function updateIdentifications() {
  const params = {};
  if (place_id) params["place_id"] = place_id;
  if (rank) params["rank"] = rank;
  const data = await fetchIdentifications(params);
  fillObservations(data);
}

updateIdentifications();
setupGalleryTooltip();
