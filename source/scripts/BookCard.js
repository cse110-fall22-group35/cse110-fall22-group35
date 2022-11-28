/**
 * Class for a bookcard
 * @extends HTMLElement
 */

class BookCard extends HTMLElement {
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
    style.innerHTML = ` 
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  #profile{
    float: right;
    margin: 10px 10px 0 0;
    color:#FFF;
    text-align:center;
  }

  img{
    display: inline;
  }

  article{
      height: 10%;
      width: 13%;
      min-width: 250px;
      min-height: 460px;
      padding: 10px 12px;
      border: 1px solid #cce7d0;
      border-radius: 25px;
      cursor: pointer;
      margin: 15px 0;
      transition: 0.2 ease;
      background-color: antiquewhite;
  }
  article:hover{
      box-shadow: 50px 50px 30px rgba(0,0,0,0.1)
  }
  article img{
      height: 10%;
      width: 100%;
      border-radius: 20px;
  }
  article .book_info{
      text-align: start;
      padding: 10px 0;
  }
  
  article .book_info span{
      font-size: 12px;
  }
  
  article .book_info h5{
      padding-top: 7px;
      color: #1a1a1a; ;
      font-size: 14px;
  }
  
  article .book_info i{
      color: rgb(243, 181, 25);
      font-size: 12px;
  }
  
  article .book_info h4{
      padding-top: 7px;
      color: #088120;
      font-size: 15px;
      font-weight: 700;
  }
  `;
    // Append the <style> and <article> elements to the Shadow DOM
    shadowEl1.append(style);
    shadowEl1.append(article);
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For Example:
   * let bookCard = document.createElement('book-card'); // Calls constructor()
   * bookCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
   *
   * @param {Object} data - The data to pass into the <book-card>, must be of the
   *                        following format:
   *                        {
   *                          "imgSrc": "string",
   *                          "imgAlt": "string",
   *                          "titleTxt": "string",
   *                          "author": "string",
   *                          "bookType": "string"
   *                        }
   */
  set data (data) {
    // If nothing was passed in, return
    if (!data) return;

    // Select the <article> we added to the Shadow DOM in the constructor
    const article = this.shadowRoot.querySelector('article');

    const url = '../html/individual-book.html?q=' + `${data.titleTxt}`;

    article.innerHTML = `
    <a href="${url}" id="profile">
      <img src="${data.imgSrc}" id="profile-picture" alt="${data.imgAlt}">
      <p>${data.profile}</p>
    </a>
    <div class="book_info">
      <span><b><h3>${data.titleTxt}<h3></b></span>
      <h4>${data.author}</h4>
      <h5>${data.bookType}</h5>
      <div class= "star"></div>
    </div>`;
  }
}
// Define the Class as a customElement so that you can create
// 'book-card' elements
customElements.define('book-card', BookCard);
