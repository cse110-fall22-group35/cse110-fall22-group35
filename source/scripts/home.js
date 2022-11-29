// home.js
import {booksdb} from '../scripts/bookstorage.js';

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init () {
  // Get the books from localStorage
  const books = getBooksFromStorage();
  // Add each book to the <main> element
  addBooksToDocument(books);
  // Add the event listeners to the form elements
  // initFormHandler();
  localStorage.setItem('books', JSON.stringify(booksdb));
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
    return;
  }

  const books = JSON.parse(localStorage.getItem('books'));
  return books;
}

/**
 * Takes in an array of books and for each book creates a
 * new <book-card> element, adds the book data to that card
 * using element.data = {...}, and then appends that new book
 * to <main>
 * @param {Array<Object>} books An array of books
 */
function addBooksToDocument (books) {
  if (!books) return;
  // A10. TODO - Get a reference to the <main> element
  const sectionEl = document.querySelector('section');
  // console.log(mainEl);
  // A11. TODO - Loop through each of the books in the passed in array,
  //            create a <book-card> element for each one, and populate
  //            each <book-card> with that book data using element.data = ...
  //            Append each element to <main>
  // console.log(typeof books);
  books.forEach(createBookCard);

  function createBookCard (item) {
    // console.log("checking type of item: ");
    // console.log(typeof item);
    const element = document.createElement('book-card');
    element.data = item;
    sectionEl.append(element);
  }
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



// Initialise. If the database doesn't exist, it is created
var lib = new localStorageDB("library_ignore_first", localStorage);

// Check if the database was just created. Useful for initial database setup

  // create the "books" table
lib.createTable("books", ["code", "title", "author", "year", "copies"]);

// insert some data
lib.insert("books", {code: "B001", title: "Phantoms in the brain", author: "Ramachandran", year: 1999, copies: 10});
lib.insert("books", {code: "B002", title: "The tell-tale brain", author: "Ramachandran", year: 2011, copies: 10});
lib.insert("books", {code: "B003", title: "Freakonomics", author: "Levitt and Dubner", year: 2005, copies: 10});
lib.insert("books", {code: "B004", title: "Predictably irrational", author: "Ariely", year: 2008, copies: 10});
lib.insert("books", {code: "B005", title: "Tesla: Man out of time", author: "Cheney", year: 2001, copies: 10});
lib.insert("books", {code: "B006", title: "Salmon fishing in the Yemen", author: "Torday", year: 2007, copies: 10});
lib.insert("books", {code: "B007", title: "The user illusion", author: "Norretranders", year: 1999, copies: 10});
lib.insert("books", {code: "B008", title: "Hubble: Window of the universe", author: "Sparrow", year: 2010, copies: 10});

// commit the database to localStorage
// all create/drop/insert/update/delete operations should be committed
lib.commit();

