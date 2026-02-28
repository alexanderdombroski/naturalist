import { throttledFetchPlaces, throttledFetchProjects } from "./iNaturalist.js";
import { forceSearchRefresh } from "./utils.js";

let featured = false;
let noteworthy = false;
document.getElementById("featured").addEventListener("change", (event) => featured = event.currentTarget.checked);
document.getElementById("noteworthy").addEventListener("change", (event) => noteworthy = event.currentTarget.checked);

// ---------- Places ----------

let place_id;

const placeList = document.getElementById("place-list");
const placesInput = document.getElementById("places-search");
placesInput.addEventListener("input", (e) => {
  searchPlaces(e.currentTarget.value);
  forceSearchRefresh(placesInput, 'place-list');
});
placesInput.addEventListener("change", (e) => {
  place_id = placeList.querySelector(`option[value="${e.currentTarget.value}"]`)?.getAttribute('data-id');
});

async function searchPlaces(search) {
  const data = await throttledFetchPlaces(search);

  placeList.innerHTML = "";
  data.results.forEach((place) => {
    const { display_name, id } = place
    const option = document.createElement("option");
    option.value = display_name;
    option.innerText = display_name
    option.setAttribute('data-id', id);
    placeList.appendChild(option);
  });
}

// ---------- Projects ----------

let projected_id

const projectList = document.getElementById("project-list");
const projectInput = document.getElementById("project-search");
projectInput.addEventListener("input", (e) => {
  searchProjects(e.currentTarget.value);
  forceSearchRefresh(projectInput, 'project-list');
});
projectInput.addEventListener("change", (e) => {
  projected_id = projectList.querySelector(`option[value="${e.currentTarget.value}"]`)?.getAttribute('data-id');
});

async function searchProjects(search) {
  const queryParams = {
    q: search,
    featured,
    noteworthy,
  }
  if (place_id) queryParams["place_id"] = place_id
  const data = await throttledFetchProjects(queryParams);

  projectList.innerHTML = "";
  data?.results.forEach((project) => {
    const { title, id } = project
    const option = document.createElement("option");
    option.value = title;
    option.innerText = title
    option.setAttribute('data-id', id);
    projectList.appendChild(option);
  });
}

