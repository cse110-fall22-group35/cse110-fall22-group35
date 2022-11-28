const index = window.location.href.indexOf('=');
const book_title = decodeURI(window.location.href.substring(index + 1));

window.addEventListener('DOMContentLoaded', init);
// Starts the program, all function calls trace back here
function init () {
  update_info();
  addCommentsToDocument();
  const formEl = document.querySelector('form');
  /**
     * Upon submitting the form to add a comment, it simply grabs all of the information
     * needed from the form and adds it to the list of comments for that book.
     */
  function formElSubmit (event) {
    event.preventDefault();

    const formData = new FormData(formEl);
    const reviewObject = {};
    for (const pair of formData.entries()) {
      reviewObject[`${pair[0]}`] = `${pair[1]}`;
    }
    const currentDate = new Date();
    const cDay = currentDate.getDate();
    const cMonth = currentDate.getMonth() + 1;
    const cYear = currentDate.getFullYear();
    const date = cMonth + '/' + cDay + '/' + cYear;
    reviewObject.date = date;
    const newreviews = getReviewsFromStorage();
    newreviews.push(reviewObject);
    saveReviewsToStorage(newreviews);
  }
  formEl.addEventListener('submit', formElSubmit);
}

/**
 * Reads 'books' from localStorage and returns an array of
 * all of the books found (parsed, not in string form). If
 * nothing is found in localStorage for 'books', an empty array
 * is returned.
 * @returns {Array<Object>} An array of books found in localStorage
 */
function getBooksFromStorage () {
  // Complete the functionality as described in this function
  // header. It is possible in only a single line, but should
  // be no more than a few lines.
  if (!localStorage.getItem('books')) {
    return [];
  }

  const books = JSON.parse(localStorage.getItem('books'));
  return books;
}

/**
 * Finds the book object the page needs to represent
 * @return the book object for the page
 */
function searchBook () {
  const books = getBooksFromStorage();
  for (let i = 0; i < books.length; i++) {
    if (books[i].titleTxt == book_title) {
      return books[i];
    }
  }
}

/**
* Adds the book's information to the page.
*/
function update_info () {
  const current_book = searchBook();
  console.log(current_book);
  document.querySelector('#top-title').innerHTML = current_book.titleTxt;
  document.querySelector('#cover').src = current_book.imgSrc;
  document.querySelector('#cover').alt = current_book.imgAlt;
  document.querySelector('#title').innerHTML = current_book.titleTxt;
  document.querySelector('#author').innerHTML = 'Author: ' + current_book.author;
  document.querySelector('#genre').innerHTML = 'Genre: ' + current_book.bookType;
  document.querySelector('#summary').innerHTML = current_book.summary;
}

/**
 * Reads the reviews from localStorage and returns an array of
 * all of the reviews for this book found (parsed, not in string form). If
 * nothing is found in localStorage this book, an empty array
 * is returned.
 * @returns {Array<Object>} An array of reviews found in localStorage
 */
function getReviewsFromStorage () {
  // fails to access if it does not exist, just returns an empty array
  if (!localStorage.getItem(book_title)) {
    return [];
  }

  const books = JSON.parse(localStorage.getItem(book_title));
  return books;
}

/**
 * Takes in an array of reviews, converts it to a string, and then
 * saves that string to the book's title in local storage
 * @param {Array<Object>} reviews An array ofreviews
 */
function saveReviewsToStorage (reviews) {
  localStorage.setItem(book_title, JSON.stringify(reviews));
}

/**
 * Takes in an array of books and for each book creates a
 * new <comment-card> element, adds the book data to that card
 * using element.data = {...}, and then appends that new comment
 * @param {Array<Object>} books An array of books
 */
function addCommentsToDocument (comment) {
  if (!comment) return;
  // Get a reference to the <main> element
  const sectionEl = document.querySelector('.comment_section');
  // Loop through each of the books in the passed in array,
  // create a <book-card> element for each one, and populate
  // each <book-card> with that book data using element.data = ...
  // Append each element to <main>
  // console.log(typeof books);
  comment.forEach(createCommentCard);

  function createBookCard (item) {
    // console.log("checking type of item: ");
    // console.log(typeof item);
    const element = document.createElement('comment-card');
    element.data = item;
    sectionEl.append(element);
  }
}