// rec-book.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
let genre = '';
let ratings = '';
let price = '';
let author = '';
function init () {
  const items = document.querySelectorAll('#genre li');
  // Changes values of certain genres that do not fit in the given cards
  for (var i = 0; i < items.length; i++) {
    items[i].onclick = function () {
      if (this.innerText == "CHILDREN") {
        document.getElementById('genrebar').value = "CHILDREN AND TEENS";
        genre = "CHILDREN AND TEENS";
      }
      else if (this.innerText == "LITERATURE") {
        document.getElementById('genrebar').value = "LITERATURE AND FICTION";
        genre = "LITERATURE AND FICTION";
      }
      else if (this.innerText == "BIOGRAPHIES") {
        document.getElementById('genrebar').value = "BIOGRAPHIES AND AUTO BIOGRAPHIES";
        genre = "BIOGRAPHIES AND AUTO BIOGRAPHIES";
      }
      else if (this.innerText == "ACADEMIC") {
        document.getElementById('genrebar').value = "ACADEMIC AND PROFESSIONAL";
        genre = "ACADEMIC AND PROFESSIONAL";
      }
      else if (this.innerText == "REGIONAL") {
        document.getElementById('genrebar').value = "REGIONAL BOOKS";
        genre = "REGIONAL BOOKS";
      }
      else if (this.innerText == "BUSINESS") {
        document.getElementById('genrebar').value = "BUSINESS AND MANAGEMENT";
        genre = "BUSINESS AND MANAGEMENT";
      }
      else if (this.innerText == "HEALTH") {
        document.getElementById('genrebar').value = "HEALTH AND COOKING";
        genre = "HEALTH AND BOOKING";
      }
      else {
        document.getElementById('genrebar').value = this.innerText;
        genre = this.innerText;
      }
    };
  }
  const rate = document.querySelectorAll('#ratings li');
  for (var i = 0; i < rate.length; i++) {
    rate[i].onclick = function () {
      document.getElementById('placeholder1').innerText = this.innerText;
      ratings = this.innerText;
    };
  }
  const prices = document.querySelectorAll('#price li');
  for (var i = 0; i < prices.length; i++) {
    prices[i].onclick = function () {
      document.getElementById('placeholder2').innerText = "$" + this.innerText + ".00";
      price = this.innerText;
    };
  }
  // Get the books from localStorage
  const books = getBooksFromStorage();
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

  const sectionEl = document.querySelector('section');

  // Event listener to search for filtered books
  document.getElementById('myBtn').addEventListener('click', function () {
    // Select element of autohr
    author = document.getElementById('author').value.toUpperCase();
    // Loop through each of the books in the passed in array...
    books.forEach(createBookCard);
    // Function to create a book card for filtered items
    function createBookCard (item) {
      if (item.Category != null && item.Author != null && genre != '') {
        if (((item.Category.toUpperCase() == genre) && (item.Price <= price)) ||item.Author.toUpperCase().includes(author)) {
          // Create a book-card element
          const element = document.createElement('book-card');
          // Populate <book-card> with book data
          element.data = item;
          // Append each element to <section>
          sectionEl.append(element);
        }
      }
    }
  });
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
