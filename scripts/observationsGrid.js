/** @param {IdentificationAPIResults} data */
export function fillObservations(data) {
  const galleryContainer = document.querySelector(".gallery-grid");
  galleryContainer.innerHTML = "";

  data.results.forEach(({ observation: obs }) => {
    const photo = obs.photos.find((p) => !p.hidden);
    if (!photo) return; // skip if no photo

    // Create gallery item
    const item = document.createElement("div");
    item.classList.add("gallery-item");

    // Image
    const img = document.createElement("img");
    img.src = photo.url;
    img.alt = obs.species_guess || "Unknown species";
    img.dataset.description = obs.description || obs.taxon.name;

    // Metadata overlay
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.textContent = obs.species_guess || "Unknown";
    if (obs.description) overlay.textContent += " \u{0069}";

    item.appendChild(img);
    item.appendChild(overlay);
    galleryContainer.appendChild(item);
  });
}

/**
 * @typedef {Object} IdentificationAPIResults
 * @property {number} page
 * @property {Identification[]} results
 * @property {number} total_results
 */

/**
 * @typedef {Object} Identification
 * @property {number} id
 * @property {string} uuid
 * @property {boolean} current
 * @property {boolean} vision
 * @property {number} taxon_id
 * @property {Observation} observation
 */

/**
 * @typedef {Object} Observation
 * @property {number} id
 * @property {string} uuid
 * @property {string} observed_on_string
 * @property {string} species_guess
 * @property {string} location
 * @property {string} description
 * @property {string} quality_grade
 * @property {Photo[]} photos
 * @property {ObservationPhoto[]} observation_photos
 */

/**
 * @typedef {Object} ObservationPhoto
 * @property {number} id
 * @property {number} position
 * @property {string} uuid
 * @property {number} photo_id
 * @property {Photo} photo
 */

/**
 * @typedef {Object} Photo
 * @property {number} id
 * @property {string} url
 * @property {string} attribution
 * @property {string} license_code
 * @property {boolean} hidden
 * @property {OriginalDimensions} original_dimensions
 */

/**
 * @typedef {Object} OriginalDimensions
 * @property {number} width
 * @property {number} height
 */
