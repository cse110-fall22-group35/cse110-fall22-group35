// home.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
  // Get the books from localStorage
  let books = getBooksFromStorage();
  // Add each book to the <main> element
  addBooksToDocument(books);
  // Add the event listeners to the form elements
  // initFormHandler();
}

/**
 * Reads 'books' from localStorage and returns an array of
 * all of the books found (parsed, not in string form). If
 * nothing is found in localStorage for 'books', an empty array
 * is returned.
 * @returns {Array<Object>} An array of books found in localStorage
 */
function getBooksFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  if(!localStorage.getItem("books")) {
    return;
  }

  const books = JSON.parse(localStorage.getItem("books"));
  return books;
}

/**
 * Takes in an array of books and for each book creates a
 * new <book-card> element, adds the book data to that card
 * using element.data = {...}, and then appends that new book
 * to <main>
 * @param {Array<Object>} books An array of books
 */
function addBooksToDocument(books) {
  if (!books) return;
  // A10. TODO - Get a reference to the <main> element
  let sectionEl = document.querySelector("section");
  // console.log(mainEl);
  // A11. TODO - Loop through each of the books in the passed in array,
  //            create a <book-card> element for each one, and populate
  //            each <book-card> with that book data using element.data = ...
  //            Append each element to <main>
  // console.log(typeof books);
  books.forEach(createBookCard);

  function createBookCard(item) {
    // console.log("checking type of item: ");
    // console.log(typeof item);
    let element = document.createElement("book-card");
    element.data = item;
    sectionEl.append(element);
  }
}

/**
 * Takes in an array of books, converts it to a string, and then
 * saves that string to 'books' in localStorage
 * @param {Array<Object>} books An array of books
 */
function saveBooksToStorage(books) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  localStorage.setItem("books", JSON.stringify(books));
}

