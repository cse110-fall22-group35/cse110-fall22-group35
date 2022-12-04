/* global FormData, localStorage, alert, confirm */

// Getting book's title
const index = window.location.href.indexOf('=');
const bookTitle = decodeURI(window.location.href.substring(index + 1));

window.addEventListener('DOMContentLoaded', init);
/**
 * All function calls trace back to here, controls the individual-book page's functionality
 */
function init () {
  removeBook();
  // Add books information
  updateInfo();
  // getting and adding reviews to the page
  const reviews = getReviewsFromStorage();
  updateRating(reviews);
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
          if (i !== iterator) {
            newReviews.push(reviews[i]);
          }
        }
        saveReviewsToStorage(newReviews);

        // update the rating if a new comment is added
        updateRating(reviews);
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

    // find if the user has commented this book already
    const index = findExistingUser(reviews, reviewObject.name);
    console.log(index);
    // if the user has not, add the new comment at the end of the list
    if (index === -1) {
      reviews.push(reviewObject);
      addCommentToDocument(reviewObject);
      saveReviewsToStorage(reviews);
      setupDeleteButtons();

      // update the rating if a new comment is added
      updateRating(reviews);
    } else { // if the user has, edits their previous comment
      if (confirm(reviewObject.name + ', do you want to overwrite your old comment?')) {
        alert('Overwriting the old comment by ' + reviewObject.name);

        reviews[index] = reviewObject;

        const comments = document.querySelectorAll('comment-card');

        const shadowDom = comments[index].shadowRoot;

        shadowDom.querySelector('.date').innerHTML = reviewObject.date;
        shadowDom.querySelector('img').src = `../images/${reviewObject.rating}-star.svg`;
        shadowDom.querySelector('span').innerHTML = reviewObject.rating;
        shadowDom.querySelector('.comment').innerHTML = reviewObject.comment;

        // update the rating if a new comment is added
        updateRating(reviews);
      } else {
        alert('Keeping the old comment');
      }
    }

    saveReviewsToStorage(reviews);

    formEl.reset();
  }
  formEl.addEventListener('submit', formElSubmit);
}

/**
   * Calculate the average rating of this book and display it at the page
   * @param {array} reviewList A list of reviews of this book
   */
function updateRating (reviewList) {
  // if the book has no comment
  if (reviewList.length === 0) {
    document.querySelector('#rating').innerHTML = 'Average Rating: N/A';
    return;
  }

  let sum = 0;
  for (let i = 0; i < reviewList.length; i++) {
    sum += Number(reviewList[i].rating);
    console.log(reviewList[i]);
    console.log(sum);
  }
  document.querySelector('#rating').innerHTML = 'Average Rating: ' + (sum / reviewList.length).toFixed(1);
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
    if (books[i].Title === bookTitle) {
      return books[i];
    }
  }
}

/**
* Adds the book's information to the page.
*/
function updateInfo () {
  const currentBook = searchBook();
  console.log(currentBook);
  // dealing with inconsistency in how data is created
  if (currentBook.Edition) {
    document.querySelector('#top-title').innerHTML = currentBook.Title + `, ${currentBook.Edition}` + getSuffix(currentBook.Edition) + ' Edition';
  } else {
    document.querySelector('#top-title').innerHTML = currentBook.Title;
  }
  document.querySelector('#cover').src = currentBook.imgSrc;
  document.querySelector('#cover').alt = currentBook.imgAlt;
  document.querySelector('#author').innerHTML = 'Author: ' + currentBook.Author;
  document.querySelector('#genre').innerHTML = 'Genre: ' + currentBook.Category;
  document.querySelector('#price').innerHTML = 'Price: $' + currentBook.Price;
  document.querySelector('#summary').innerHTML = currentBook.Description;
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
  if (!localStorage.getItem(bookTitle)) {
    return [];
  }

  const books = JSON.parse(localStorage.getItem(bookTitle));
  return books;
}

/**
 * Takes in an array of reviews, converts it to a string, and then
 * saves that string to the book's title in local storage
 * @param {Array<Object>} reviews An array of reviews
 */
function saveReviewsToStorage (reviews) {
  localStorage.setItem(bookTitle, JSON.stringify(reviews));
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
  } else if (Edition % 10 === 2) {
    return 'nd';
  } else if (Edition % 10 === 2) {
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
    if (reviewList[i].name === name) {
      return i;
    }
  }
  return -1;
}

/**
 * remove the bookfrom local storage and back to the homepage
 */

function removeBook () {
  const btn = document.getElementById('delete');
  btn.addEventListener('click', (event) => {
    console.log('del clicked.');
    libUpdate(bookTitle);
  });
}
function libUpdate (title) {
  console.log('clear the book with title');
  let libraryBook = localStorage.getItem('books');
  console.log(title);
  libraryBook = JSON.parse(libraryBook);
  console.log(libraryBook.length);
  const afteraction = libraryBook.filter(el => !(el.Title).includes(title));
  console.log(afteraction.length);
  const bookRemain = JSON.stringify(afteraction);
  localStorage.setItem('books', bookRemain);
  alert("Successfully removed");
  window.location.href = "./home.html"
}
