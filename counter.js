import $ from "jquery";

export function setupCounter(element) {
  let counter = 0;

  // Set the counter value and update the element's HTML using jQuery
  const setCounter = (count) => {
    counter = count;
    $(element).html(`count is ${counter}`);
  };

  // Use jQuery to handle the click event
  $(element).on("click", () => setCounter(counter + 1));

  // Initialize the counter
  setCounter(0);
}
