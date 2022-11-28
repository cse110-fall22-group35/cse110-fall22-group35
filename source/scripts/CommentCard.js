/**
 * Class for a comment
 * @extends HTMLElement
 */

class CommentCard extends HTMLElement {
  // Called once when document.createElement('comment-card') is called, or
  // the element is written into the DOM directly as <comment-card>
  constructor () {
    super(); // Inheret everything from HTMLElement

    // Attach the shadow DOM to this Web Component (leave the mode open)
    const shadow_dom = this.attachShadow({ mode: 'open' });
    // Create an <article> element - This will hold our markup once our data is set
    const article = document.createElement('article');
    // Create a style element - This will hold all of the styles for the Web Component
    const style = document.createElement('style');
    // Insert all of the styles from cardTemplate.html into the <style> element you just made
    style.textContent =
    `
    <style>
    * {
      margin-top: 20px;
      border: 2px;
      padding: 20px;
      bor
    }

    #name {
      color: rgb (237 237 237);
      font-size: 30px;
    }

    #comment {
      color: rgb (237 237 237);
      font-size: 25px;
      border-radius: 0.2cm;
      border-color: rgb(237 237 237);
    }
    </style>
    `;
    // Append the <style> and <article> elements to the Shadow DOM
    shadow_dom.appendChild(article);
    shadow_dom.appendChild(style);
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For Example:
   * let CommentCard = document.createElement('recipe-card'); // Calls constructor()
   *
   * @param {Object} data - The data to pass into the <recipe-card>, must be of the
   *                        following format:
   *                        {
   *                          "name": "string",
   *                          "review": "string",
   *                          "rating": number
   *                        }
   */
  set data (data) {
    // If nothing was passed in, return
    if (!data) return;

    // Select the <article> we added to the Shadow DOM in the constructor
    const shadow_dom_article = this.shadowRoot.querySelector('article');
    // Set the contents of the <article> with the <article> template given in
    // cardTemplate.html and the data passed in (You should only have one <article>,
    // do not nest an <article> inside another <article>). You should use Template
    // literals (tempalte strings) and element.innerHTML for this.
    const {
      name,
      comment,
      rating
    } = data;

    shadow_dom_article.innerHTML =
    `
    <p id="name">
      ${name}
    </p>
    <div class="rating">
      <span>${rating}</span>
      <img src="./assets/images/icons/${rating}-star.svg" alt="${rating} stars">
    </div>
    <p class="comment">
      ${comment}
    </p>
    `;
  }
}

// Define the Class as a customElement so that you can create
// 'comment-card' elements
customElements.define('comment-card', CommentCard);
