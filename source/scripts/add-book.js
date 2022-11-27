// add-book.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init () {
  // Add the event listeners to the form elements
  // stores data from form to local storage
  initFormHandler();
}

/**
 * Reads 'books' from localStorage and returns an array of
 * all of the books found (parsed, not in string form). If
 * nothing is found in localStorage for 'books', an empty array
 * is returned.
 * @returns {Array<Object>} An array of books found in localStorage
 */
function getBooksFromStorage () {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  if (!localStorage.getItem('books')) {
    return [];
  }

  const books = JSON.parse(localStorage.getItem('books'));
  return books;
}

/**
 * Takes in an array of books, converts it to a string, and then
 * saves that string to 'books' in localStorage
 * @param {Array<Object>} books An array of books
 */
function saveBooksToStorage (books) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  localStorage.setItem('books', JSON.stringify(books));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler () {
  // B2. TODO - Get a reference to the <form> element
  const formEl = document.getElementById('new-book');
  console.log(formEl);
  // let clearLocalBtn = document.querySelector(".danger");
  // console.log(clearLocalBtn);
  // Steps B4-B9 will occur inside the event listener from step B3
  function formElSubmit (event) {
    event.preventDefault();
    // console.log("form submitted.");
    // B4. TODO - Create a new FormData object from the <form> element reference above
    const formData = new FormData(formEl);
    // B5. TODO - Create an empty object (I'll refer to this object as bookObject to
    //            make this easier to read), and then extract the keys and corresponding
    //            values from the FormData object and insert them into bookObject
    const bookObject = {};
    for (const pair of formData.entries()) {
      console.log(pair[0]);
      console.log(pair[1]);
      bookObject[`${pair[0]}`] = `${pair[1]}`;
    }

    // B9. TODO - Get the books array from localStorage, add this new book to it, and
    //            then save the books array back to localStorage
    const newbooks = getBooksFromStorage();
    // console.log(typeof newbooks);
    // console.log(newbooks);
    newbooks.push(bookObject);
    saveBooksToStorage(newbooks);
  }
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  formEl.addEventListener('submit', formElSubmit);

  // Steps B12 & B13 will occur inside the event listener from step B11
  // function clearStorage(event) {
  //   event.preventDefault();
  //   // console.log("clearing local storage");
  //   // B12. TODO - Clear the local storage
  //   localStorage.clear();
  //   // B13. TODO - Delete the contents of <main>
  //   let mainEl = document.querySelector("main");
  //   mainEl.innerHTML = "";
  // }
  // // B10. TODO - Get a reference to the "Clear Local Storage" button
  // let clearLocalBtn = document.querySelector(".danger");
  // // console.log(clearLocalBtn);
  // // B11. TODO - Add a click event listener to clear local storage button
  // clearLocalBtn.addEventListener("click", clearStorage);
}
