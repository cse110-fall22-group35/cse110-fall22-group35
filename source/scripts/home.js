// home.js

// importing the variable of arrary from the bookstorage.js
import { booksdb } from '../scripts/bookstorage.js';

/**
 * GLOBAL VARIABLES that enables SORT/FILTER/SEARCH functionalities.
 *
 * @bookStorage refers to current books in local storage, and SHOULD ONLY
 * be modified when a book in added to the storage in add-book.html;
 *
 * @bookToDisplay refers to the books we want to display at the homepage.
 * It is always a subset of @bookstorage and changes upon sorting/filtering/searching;
 *
 * NOTE:
 * 1. ALWAYS use @bookToDisplay to store books displayed on the homepage.
 * 2. SORT/FILTER/SEARCH functionalities SHOULD ONLY modifify @bookToDisplay.
 */
// processing the books to be loaded into localstorage
let bookStorage = JSON.stringify(booksdb);
let bookToDisplay = bookStorage;

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls (except eventListeners for SORT/FILTER/SEARCH) trace back here
function init (refreshFlag) {
  // load all the books from database to localstorage
  if (localStorage.length === 0 || refreshFlag == true) {
    localStorage.setItem('books', bookToDisplay);
  }
  // Get the books from localStorage
  const books = getBooksFromStorage();
  // Add each book to the <main> element
  addBooksToDocument(books);
}
const refreshBtn = document.querySelector('#refreshBtn');
refreshBtn.addEventListener('click', (event) => {
  // load all the books from database to localstorage
  let bookStorage = JSON.stringify(booksdb);
  let bookToDisplay = bookStorage;
  localStorage.setItem('books', bookToDisplay);
  
  // Get the books from localStorage
  const books = getBooksFromStorage();
  // Add each book to the <main> element
  addBooksToDocument(books);
});
/**
 * FILTER FUNCTIONALITY
 *
 * Description:
 * Allows users to filter by the following genres, then display only books of that genre (c):
 *      1. 'All': display all books in storage;
 *      2. 'Entrance Exam': display only books with genre 'Entrance Exam';
 *      3. 'fiction':  display ......                     'Literature and Fiction';
 *      4. 'academic': display ......                     'Academic and Professional';
 *      5. 'biograph': display ......                     'Biographies and Auto Biographies';
 *      6. 'business': display ......                     'Business and Management';
 *
 * NOTE:
 * 1. Modifies @bookToDisplay accordingly in each case. Uses init() to reload and display books.
 * 2. Filtering executes when user selects a genre from the filter bar, and clicks on 'filter' button.
 *
 * DEVELOPERS ONLY:
 * The list of filters are customazible, to add/drop/change a filter, first modify
 *  <select id="filterBar">
      <option value="default">Select one...</option>
      <option value="all">All</option>
      <option value="fiction">fiction</option>
      <option value="academic">academic</option>
      <option value="Entrance Exam">Entrance Exam</option>
      <option value="business">business</option>
      <option value="biograph">biograph</option>
    </select> in home.html
    , then modify cases in switch block.

  TO DO: fix how SORT/SEARCH/FILTER interacts with each other.
 */
const filterBar = document.querySelector('#filterBar');
filterBar.addEventListener('change', (event) => {
  // console.log(filterBar);
  // console.log(event.target.value);
  const filterBtn = document.querySelector('#filterBtn');
  // console.log(filterBtn);
  filterBtn.addEventListener('click', function () {
    // console.log('filterBtn clicked.');
    bookStorage = JSON.parse(bookStorage);
    // Filter depending on user choice using array manipulation
    switch (event.target.value) {
      case 'Entrance Exam':
        console.log("Display books with genre: 'Entrance Exam' only.");
        bookToDisplay = bookStorage.filter(function (el) {
          return el.Category === 'Entrance Exam';
        });
        break;
      case 'fiction':
        console.log("Display books with genre: 'Literature and Fiction' only.");
        bookToDisplay = bookStorage.filter(function (el) {
          return el.Category === 'Literature and Fiction';
        });
        break;
      case 'academic':
        console.log("Display books with genre: 'Academic and Professional' only.");
        bookToDisplay = bookStorage.filter(function (el) {
          return el.Category === 'Academic and Professional';
        });
        break;
      case 'biograph':
        console.log("Display books with genre: 'Biographies and Auto Biographies' only.");
        bookToDisplay = bookStorage.filter(function (el) {
          return el.Category === 'Biographies and Auto Biographies';
        });
        break;
      case 'business':
        console.log("Display books with genre: 'Business and Management' only.");
        bookToDisplay = bookStorage.filter(function (el) {
          return el.Category === 'Business and Management';
        });
        break;
      case 'all':
        console.log('Display all books in storage.');
        bookToDisplay = bookStorage;
        break;
    }
    bookStorage = JSON.stringify(bookStorage);
    bookToDisplay = JSON.stringify(bookToDisplay);
    localStorage.setItem('books', bookToDisplay);
    init();
  });
});

/**
 * SORT FUNCTIONALITY
 *
 * Description:
 * Allows users to sort by the following rules, then display books accordingly:
 *      1. 'price low to high':     books with the LOWEST price are displayed first;
 *      2. 'price high to low':     ...            HIGHEST price  ...         first;
 *      3. 'rating':                ...            HIGHEST rating ...         first;
 *
 * NOTE:
 * 1. Modifies @bookToDisplay accordingly in each case. Uses init() to reload and display books.
 * 2. Sorting executes when user selects a rule from the sort bar, and clicks on 'sort' button.
 *
 * DEVELOPERS ONLY:
 * The list of rules are customazible, to add/drop/change a rule, first modify
 *  <select id="sortBar">
      <option value="default">Select one...</option>
      <option value="price low to high">price low to high</option>
      <option value="price high to low">price high to low</option>
      <option value="rating">rating</option>
    </select> in home.html
    , then modify cases in switch block.

  TO DO: fix how SORT/SEARCH/FILTER interacts with each other.
 */
const sortBar = document.querySelector('#sortBar');

sortBar.addEventListener('change', (event) => {
  console.log(sortBar);
  console.log(event.target.value);
  const sortBtn = document.querySelector('#sortBtn');
  console.log(sortBtn);
  sortBtn.addEventListener('click', function () {
    console.log('sortBtn clicked.');
    bookToDisplay = JSON.parse(bookToDisplay);
    // Sort depending on user choice using array manipulation
    switch (event.target.value) {
      case 'price low to high':
        console.log('Sorting books by price low to high');
        bookToDisplay = bookToDisplay.sort((a, b) => {
          if (+a.Price < +b.Price) {
            return -1;
          }
        });
        break;
      case 'price high to low':
        console.log('Sorting books by price high to low');
        bookToDisplay = bookToDisplay.sort((a, b) => {
          if (+b.Price < +a.Price) {
            return -1;
          }
        });
        break;
      case 'rating':
        console.log('Sorting books by rating');
        bookToDisplay = bookToDisplay.sort((a, b) => {
          if (+b.Rating < +a.Rating) {
            return -1;
          }
        });
        break;
    }
    bookToDisplay = JSON.stringify(bookToDisplay);
    localStorage.setItem('books', bookToDisplay);
    init();
  });
});

/**
 * SEARCH FUNCTIONALITY
 *
 * Description:
 * Let user enter 'input', then display books whose title contains 'input' as a substring.
 *
 * NOTE:
 * 1. Modifies @bookToDisplay accordingly in each case.
 * 2. Searching executes when user enters 'input' from the search bar, and clicks on 'search' button.
 *
 * DEVELOPERS ONLY:
 * search rules are customizable, currently have 2 options:
 *      Option1: Search by Title only (implemented)
 *      Option2: Search in all attributes (not yet implemented)
 * TO DO: fix how SORT/SEARCH/FILTER interacts with each other.
 *
 */
const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#search-input');
// console.log(searchBtn);
// console.log(searchInput);
searchBtn.addEventListener('click', function () {
  console.log(`Display only books whose title includes ${searchInput.value} (case insensitive)`);
  bookStorage = JSON.parse(bookStorage);
  // Option1: Search by Title only
  bookToDisplay = bookStorage.filter(el => (el.Title).toLowerCase().includes((searchInput.value).toLowerCase()));

  // TO DO: Option2: Search in all attributes
  // CODE FOR Option2

  bookToDisplay = JSON.stringify(bookToDisplay);
  bookStorage = JSON.stringify(bookStorage);
  localStorage.setItem('books', bookToDisplay);
  init();
});

// Keyboard press "enter" will click search btn as well
searchInput.addEventListener('keypress', function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === 'Enter') {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    searchBtn.click();
  }
});

/**
 * Author FILTER FUNCTIONALITY
 *
 */

const image1 = document.querySelector('#authorimg1');
const image2 = document.querySelector('#authorimg2');
const image3 = document.querySelector('#authorimg3');
const image4 = document.querySelector('#authorimg4');
const image5 = document.querySelector('#authorimg5');
const image6 = document.querySelector('#authorimg6');
const image7 = document.querySelector('#authorimg7');
const image8 = document.querySelector('#authorimg8');

function authorUpdate (authorName) {
  console.log('Display only books whose author includes given names.');
  bookStorage = JSON.parse(bookStorage);
  // Option1: Search by Title only
  bookToDisplay = bookStorage.filter(el => (el.Author).includes(authorName));

  // TO DO: Option2: Search in all attributes
  // CODE FOR Option2

  bookToDisplay = JSON.stringify(bookToDisplay);
  bookStorage = JSON.stringify(bookStorage);

  localStorage.setItem('books', bookToDisplay);
  init();
}

image1.addEventListener('click', function () {
  authorUpdate('Durjoy');
});
image2.addEventListener('click', function () {
  authorUpdate('Chetan');
});
image3.addEventListener('click', function () {
  authorUpdate('Brown');
});
image4.addEventListener('click', function () {
  authorUpdate('Singh');
});
image5.addEventListener('click', function () {
  authorUpdate('Archer');
});
image6.addEventListener('click', function () {
  authorUpdate('Salman');
});
image7.addEventListener('click', function () {
  authorUpdate('Rowling');
});
image8.addEventListener('click', function () {
  authorUpdate('Roy');
});



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
  sectionEl.innerHTML = '';
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

// // Initialise. If the database doesn't exist, it is created
// const lib = new localStorageDB('library_ignore_first', localStorage);

// // Check if the database was just created. Useful for initial database setup

// // create the "books" table
// lib.createTable('books', ['code', 'title', 'author', 'year', 'copies']);

// // insert some data
// lib.insert('books', { code: 'B001', title: 'Phantoms in the brain', author: 'Ramachandran', year: 1999, copies: 10 });
// lib.insert('books', { code: 'B002', title: 'The tell-tale brain', author: 'Ramachandran', year: 2011, copies: 10 });
// lib.insert('books', { code: 'B003', title: 'Freakonomics', author: 'Levitt and Dubner', year: 2005, copies: 10 });
// lib.insert('books', { code: 'B004', title: 'Predictably irrational', author: 'Ariely', year: 2008, copies: 10 });
// lib.insert('books', { code: 'B005', title: 'Tesla: Man out of time', author: 'Cheney', year: 2001, copies: 10 });
// lib.insert('books', { code: 'B006', title: 'Salmon fishing in the Yemen', author: 'Torday', year: 2007, copies: 10 });
// lib.insert('books', { code: 'B007', title: 'The user illusion', author: 'Norretranders', year: 1999, copies: 10 });
// lib.insert('books', { code: 'B008', title: 'Hubble: Window of the universe', author: 'Sparrow', year: 2010, copies: 10 });

// // commit the database to localStorage
// // all create/drop/insert/update/delete operations should be committed
// lib.commit();
