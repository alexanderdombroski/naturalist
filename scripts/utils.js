/**
 * Improves search experience on some browsers
 * @param {HTMLInputElement} inputElement
 * @param {string} listName
 */
export function forceSearchRefresh(inputElement, listName) {
  inputElement.setAttribute("list", "");
  inputElement.offsetHeight; // force reflow
  inputElement.setAttribute("list", listName);
}
