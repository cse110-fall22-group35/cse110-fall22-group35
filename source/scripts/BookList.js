// BookList.js

class BookList extends HTMLElement {
  // Called once when document.createElement('book-card') is called, or
  // the element is written into the DOM directly as <book-card>
  constructor () {
    super(); // Inheret everything from HTMLElement

    // Attach the shadow DOM to this Web Component (leave the mode open)
    const shadowEl1 = this.attachShadow({ mode: 'open' });
    // Create an <article> element - This will hold our markup once our data is set
    const article = document.createElement('article');
    // Create a style element - This will hold all of the styles for the Web Component
    const style = document.createElement('style');
    // Insert all of the styles from cardTemplate.html into the <style> element you just made
    // TODO - Change style as needed
    style.innerHTML = ` 
  * article{
    height: min-content;
    width: 100%;
    min-width: 250px;
    padding: 10px 12px;
    border: 1px solid #cce7d0;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px 0;
    transition: 0.2 ease;
    background-color: antiquewhite;
}

article:hover{
    box-shadow: 50px 50px 30px rgba(0,0,0,0.1)
}
article .book_info{
    text-align: center;
    padding: 3px 0;
}
article .book_info h4{
    padding-top: 7px;
    color: #088120;
    font-size: 15px;
    font-weight: 700;
} 
  `;
    // A5. Append the <style> and <article> elements to the Shadow DOM
    shadowEl1.append(style);
    shadowEl1.append(article);
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For Example:
   * let bookList = document.createElement('book-list'); // Calls constructor()
   * bookCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
   *
   * @param {Object} data - The data to pass into the <book-card>, must be of the
   *                        following format:
   *                        {
   *                          "titleTxt": "string",
   *                          "author": "string",
   *                          "bookType": "string"
   *                        }
   */
  set data (data) {
    // If nothing was passed in, return
    if (!data) return;

    // A6. Select the <article> we added to the Shadow DOM in the constructor
    const article = this.shadowRoot.querySelector('article');
    // A7. Set the contents of the <article> with the <article> template given in
    //           cardTemplate.html and the data passed in (You should only have one <article>,
    //           do not nest an <article> inside another <article>). You should use Template
    //           literals (tempalte strings) and element.innerHTML for this.
    article.innerHTML = `
    <div class="book_info">
                  <a href=${data.profile} id="profile">
                    <span><b><h3>${data.titleTxt}<h3></b></span>
                  </a>
                        <h5>${data.author}</h5>
                        <h5>${data.bookType}</h5>
                </div>`;
  }
}
// A8. Define the Class as a customElement so that you can create
//           'book-list' elements
customElements.define('book-list', BookList);
