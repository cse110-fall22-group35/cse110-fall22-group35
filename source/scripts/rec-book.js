// recommend-book.js

// importing books from bookstorage.js
import { booksdb } from '../scripts/bookstorage.js';

let bookStorage = JSON.stringify(booksdb);
let bookToDisplay = bookStorage;

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// variables that will be used in the "Recommend Feature"
let genre = '';
let ratings = '';
let price = '';
let author = '';

// Starts the program, all function calls trace back here
function init () {
  const items = document.querySelectorAll('#genre li');
  // Changes values of certain genres that do not fit in the given cards
  for (var i = 0; i < items.length; i++) {
    items[i].onclick = function () {
      if (this.innerText == 'CHILDREN') {
        document.getElementById('genrebar').value = 'CHILDREN AND TEENS';
        genre = 'Children and Teens';
      } else if (this.innerText == 'LITERATURE') {
        document.getElementById('genrebar').value = 'LITERATURE AND FICTION';
        genre = 'Literature and Fiction';
      } else if (this.innerText == 'BIOGRAPHIES') {
        document.getElementById('genrebar').value = 'BIOGRAPHIES AND AUTO BIOGRAPHIES';
        genre = 'Biographies and Auto Biographies';
      } else if (this.innerText == 'ACADEMIC') {
        document.getElementById('genrebar').value = 'ACADEMIC AND PROFESSIONAL';
        genre = 'Academic and Professional';
      } else if (this.innerText == 'REGIONAL') {
        document.getElementById('genrebar').value = 'REGIONAL BOOKS';
        genre = 'Regional Books';
      } else if (this.innerText == 'BUSINESS') {
        document.getElementById('genrebar').value = 'BUSINESS AND MANAGEMENT';
        genre = 'Business and Management';
      } else if (this.innerText == 'HEALTH') {
        document.getElementById('genrebar').value = 'HEALTH AND COOKING';
        genre = 'Health and Cooking';
      } else {
        document.getElementById('genrebar').value = this.innerText;
        genre = this.innerText;
      }
    };
  }

  // assigns rating value chosen by user to variable ratings...
  const rate = document.querySelectorAll('#ratings li');
  for (var i = 0; i < rate.length; i++) {
    rate[i].onclick = function () {
      document.getElementById('placeholder1').innerText = this.innerText + ' ✩';
      ratings = this.innerText;
    };
  }

  // assigns price value chosen by user to variable price...
  const prices = document.querySelectorAll('#price li');
  for (var i = 0; i < prices.length; i++) {
    prices[i].onclick = function () {
      document.getElementById('placeholder2').innerText = '$' + this.innerText + '.00';
      price = this.innerText;
    };
  }

  // Get the books from localStorage
  const books = getBooksFromStorage();
  // Add each book to the <main> element
  addBooksToDocument(books);
}

/**
 * NavBar Reset
 *
 * Description:
 * Resets the local storage when traversing through other sites, since we do not want to have the
 *          users to continue to view recommended items on the home page.
 *
 */
const navBtn = document.getElementById('nav');
navBtn.addEventListener('click', function () {
  const bookStorage = JSON.stringify(booksdb);
  const bookToDisplay = bookStorage;
  localStorage.setItem('books', bookToDisplay);

  const books = getBooksFromStorage();
  addBooksToDocument(books);
});

/**
 * Recommend Feature
 *
 * Description:
 * Displays books that fall into categories chosen in the forms given on the recommendations page:
 *      1. 'All': display all books in storage;
 *      2. 'Entrance Exam': display only books with genre 'Entrance Exam';
 *      3. 'fiction':  display ......                     'Literature and Fiction';
 *      4. 'academic': display ......                     'Academic and Professional';
 *      5. 'biograph': display ......                     'Biographies and Auto Biographies';
 *      6. 'business': display ......                     'Business and Management';
 *
 * NOTE:
 * 1. Takes three mandatory items to filter/recommend (author is optional and will display all books with that author if inputted)
 * 1. Executes when search button is clicked on
 *
 */
document.getElementById('myBtn').addEventListener('click', function () {
  bookStorage = JSON.parse(bookStorage);

  author = document.getElementById('author').value.toUpperCase();

  // Use genre choice from filter search bar
  switch (genre) {
    case 'ENTRANCE EXAM':
      bookToDisplay = bookStorage.filter(function (el) {
        if (author != '') {
          return (el.Category === 'Entrance Exam' && el.Rating >= ratings && el.Price <= price) || (el.Author.toUpperCase() == author);
        }
        return el.Category === 'Entrance Exam' && el.Rating >= ratings && el.Price <= price;
      });
      break;
    case 'Children and Teens':
      bookToDisplay = bookStorage.filter(function (el) {
        if (author != '') {
          return (el.Category === genre && el.Rating >= ratings && el.Price <= price) || (el.Author.toUpperCase() == author);
        }
        return el.Category === genre && el.Rating >= ratings && el.Price <= price;
      });
      break;
    case 'Literature and Fiction':
      bookToDisplay = bookStorage.filter(function (el) {
        if (author != '') {
          return (el.Category === genre && el.Rating >= ratings && el.Price <= price) || (el.Author.toUpperCase() == author);
        }
        return el.Category === genre && el.Rating >= ratings && el.Price <= price;
      });
      break;
    case 'Academic and Professional':
      bookToDisplay = bookStorage.filter(function (el) {
        if (author != '') {
          return (el.Category === genre && el.Rating >= ratings && el.Price <= price) || (el.Author.toUpperCase() == author);
        }
        return el.Category === genre && el.Rating >= ratings && el.Price <= price;
      });
      break;
    case 'Biographies and Auto Biographies':
      bookToDisplay = bookStorage.filter(function (el) {
        if (author != '') {
          return (el.Category === genre && el.Rating >= ratings && el.Price <= price) || (el.Author.toUpperCase() == author);
        }
        return el.Category === genre && el.Rating >= ratings && el.Price <= price;
      });
      break;
    case 'Business and Management':
      bookToDisplay = bookStorage.filter(function (el) {
        if (author != '') {
          return (el.Category === genre && el.Rating >= ratings && el.Price <= price) || (el.Author.toUpperCase() == author);
        }
        return el.Category === genre && el.Rating >= ratings && el.Price >= price;
      });
      break;
    case 'Health and Cooking':
      bookToDisplay = bookStorage.filter(function (el) {
        if (author != '') {
          return (el.Category === genre && el.Rating >= ratings && el.Price <= price) || (el.Author.toUpperCase() == author);
        }
        return el.Category === genre && el.Rating >= ratings && el.Price <= price;
      });
      break;
  }

  bookStorage = JSON.stringify(bookStorage);
  bookToDisplay = JSON.stringify(bookToDisplay);
  localStorage.setItem('books', bookToDisplay);
  init();
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
  books.forEach(createBookCard);

  function createBookCard (item) {
    const element = document.createElement('book-card');
    element.data = item;
    sectionEl.append(element);
  }
}
