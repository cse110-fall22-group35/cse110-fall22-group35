let index = window.location.href.indexOf ("=");
let book_title = decodeURI (window.location.href.substring (index + 1));

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
    const books = getBooksFromStorage ();
    for (let i = 0; i < books.length; i++) {
        if (books[i]["titleTxt"] == book_title) {
            return books[i];
        }
    }
}

/**
* Adds the book's information to the page.
*/
function update_info () {
    const current_book = searchBook ();
    console.log (current_book);
    document.querySelector ("#top-title").innerHTML = current_book["titleTxt"];
    document.querySelector ("#cover").src = current_book["imgSrc"];
    document.querySelector ("#cover").alt = current_book["imgAlt"];
    document.querySelector ("#title").innerHTML = current_book["titleTxt"];
    document.querySelector ("#author").innerHTML = "Author: " + current_book["author"];
    document.querySelector ("#genre").innerHTML = "Genre: " + current_book["bookType"];
    document.querySelector ("#summary").innerHTML = current_book["summary"];
}

update_info ();