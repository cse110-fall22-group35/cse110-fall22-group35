// Getting book's title
const index = window.location.href.indexOf('=');
const book_title = decodeURI(window.location.href.substring(index + 1));

window.addEventListener('DOMContentLoaded', init);
/**
 * All function calls trace back to here, controls the individual-book page's functionality
 */
function init () {
  // Add books information
  update_info();
  // getting and adding reviews to the page
  let reviews = getReviewsFromStorage();
  reviews.forEach(addCommentToDocument);
  setupDeleteButtons();

  /**
   * Adds functionality to the delete buttons for every comment on the page
   */
  function setupDeleteButtons () {
    const comments = document.querySelectorAll('comment-card');
    // iterates through each comment-card, finds its button and adds an event listener
    for (let iterator = 0; iterator < comments.length; iterator++) {
      const button = comments[iterator].shadowRoot.querySelector('button');
      button.addEventListener('click', (event) => {
        // deletes and saves a new array without this element in it
        const newReviews = [];
        for (let i = 0; i < reviews.length; i++) {
          if (i != iterator) {
            newReviews.push(reviews[i]);
          }
        }
        saveReviewsToStorage(newReviews);
        window.location.reload();
      });
    }
  }

  // form for adding a comment
  const formEl = document.querySelector('form');
  /**
     * Upon submitting the form to add a comment, it simply grabs all of the information
     * needed from the form and adds it to the list of comments for that book.
     */
  function formElSubmit (event) {
    event.preventDefault();

    // grabs data and creates a review from it
    const formData = new FormData(formEl);
    const reviewObject = {};
    for (const pair of formData.entries()) {
      reviewObject[`${pair[0]}`] = `${pair[1]}`;
    }
    // all related to getting today's date
    const currentDate = new Date();
    const cDay = currentDate.getDate();
    const cMonth = currentDate.getMonth() + 1;
    const cYear = currentDate.getFullYear();
    const date = cMonth + '/' + cDay + '/' + cYear;
    reviewObject.date = date;
    const reviewList = getReviewsFromStorage();

    // find if the user has commented this book already
    const index = findExistingUser(reviewList, reviewObject.name);
    console.log(index);
    // if the user has not, add the new comment at the end of the list
    if (index == -1) {
      reviewList.push(reviewObject);
      addCommentToDocument(reviewObject);
      saveReviewsToStorage(reviewList);
      reviews = reviewList;
      setupDeleteButtons();
    }
    // if the user has, edits their previews comment
    else {
      alert('Overwriting the old comment by ' + reviewObject.name);

      reviewList[index] = reviewObject;

      const comments = document.querySelectorAll('comment-card');

      const shadow_dom = comments[index].shadowRoot;

      shadow_dom.querySelector('#date').innerHTML = reviewObject.date;
      shadow_dom.querySelector('img').src = `../images/${reviewObject.rating}-star.svg`;
      shadow_dom.querySelector('span').innerHTML = reviewObject.rating;
      shadow_dom.querySelector('#comment').innerHTML = reviewObject.comment;
    }

    saveReviewsToStorage(reviewList);

    formEl.reset();
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
    if (books[i].Title == book_title) {
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
  document.querySelector('#top-title').innerHTML = current_book.Title + `, ${current_book.Edition}` + getSuffix(current_book.Edition) + ' Edition';
  document.querySelector('#cover').src = current_book.imgSrc;
  document.querySelector('#cover').alt = current_book.imgAlt;
  document.querySelector('#author').innerHTML = 'Author: ' + current_book.Author;
  document.querySelector('#genre').innerHTML = 'Genre: ' + current_book.Category;
  document.querySelector('#price').innerHTML = 'Price: $' + current_book.Price;
  document.querySelector('#summary').innerHTML = current_book.Description;
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
 * @param {Array<Object>} reviews An array of reviews
 */
function saveReviewsToStorage (reviews) {
  localStorage.setItem(book_title, JSON.stringify(reviews));
}

/**
 * Takes in a comment and  creates a new <comment-card> element, adds the review data to that card
 * using element.data = {...}, and then appends that new comment
 * @param {Array<Object>} comment the comment to add
 */
function addCommentToDocument (comment) {
  if (!comment) return;
  // Get a reference to the <main> element
  const sectionEl = document.querySelector('.comment_section');
  const element = document.createElement('comment-card');
  element.data = comment;
  sectionEl.append(element);
}

/**
 * Gets a number and returns the suffix used for it
 * ie given 1 it returns st for 1st
 *
 * @param {int} Edition - A number to get the suffix for
 * @returns {string} The suffix for that number
 */
function getSuffix (Edition) {
  // all numbers in teens are th
  if (Math.floor((Edition % 100) / 10) === 1) {
    return 'th';
  }
  // all others ending in 1 are st
  if (Edition % 10 === 1) {
    return 'st';
  }
  // all others ending in 2 are nd
  else if (Edition % 10 === 2) {
    return 'nd';
  }
  // all others ending in 3 are rd
  else if (Edition % 10 === 2) {
    return 'rd';
  }
  return 'th';
}

/**
 * Finds the index of existing user, or -1 if the user has not commented yet this book
 * @param {Array<Object>} reviewList The list of review in local storage
 * @param {string} name The user of new comment
 * @returns {int} The index of existing user, or -1 if the user has not commented yet
 */
function findExistingUser (reviewList, name) {
  for (let i = 0; i < reviewList.length; i++) {
    if (reviewList[i].name == name) {
      return i;
    }
  }
  return -1;
}
