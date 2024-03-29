/* global HTMLElement, customElements */

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
    const shadowDom = this.attachShadow({ mode: 'open' });
    // Create an <article> element - This will hold our markup once our data is set
    const article = document.createElement('article');
    // Create a style element - This will hold all of the styles for the Web Component
    const style = document.createElement('style');
    // Insert all of the styles from cardTemplate.html into the <style> element you just made
    style.innerHTML =
    `
    article{
      margin-top: 10px;
      margin-bottom: 10px;
      padding-left: 15px;
      padding-right: 15px;
      border: 2px;
      border-color: rgb(237 237 237);
      border-radius: 25px;
      border-style: double;
    }

    .name {
      color: rgb(237 237 237);
      font-size: 30px;
    }

    .date {
      color: rgb(237 237 237);
    }

    img {
      display: inline;
      width: 150px;
    }

    span {
      color: rgb(237 237 237);
    }

    .comment {
      color: rgb(237 237 237);
      font-size: 20px;
      border-radius: 0.2cm;
      border-color: rgb(237 237 237);
    }

    .delete {
      color: rgb(237 237 237);
      font-size: 15px;
      background-color: rgb(0 0 0 / 0%);
      border: 0px;
    }

    .del {
      text-align: right;
    }
    `;
    // Append the <style> and <article> elements to the Shadow DOM
    shadowDom.appendChild(article);
    shadowDom.appendChild(style);
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For Example:
   * let CommentCard = document.createElement('comment-card'); // Calls constructor()
   *
   * @param {Object} data - The data to pass into the <comment-card>, must be of the
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
    const shadowDomArticle = this.shadowRoot.querySelector('article');
    // Set the contents of the <article> with the <article> template given in
    // cardTemplate.html and the data passed in (You should only have one <article>,
    // do not nest an <article> inside another <article>). You should use Template
    // literals (tempalte strings) and element.innerHTML for this.
    const {
      name,
      comment,
      rating,
      date
    } = data;

    shadowDomArticle.innerHTML =
    `
    <p class="name">
      ${name}
    </p>
    <hr>
    <p class="date">
      ${date}
    </p>
    <div class="rating">
      <img src="../images/${rating}-star.svg" alt="${rating} stars">
      <span>${rating}</span>
    </div>
    <p class="comment">
      ${comment}
    </p>
    <div class="del">
      <button class="delete" type="button">
      Delete Comment
      </button>
    </div>
    `;
  }
}

// Define the Class as a customElement so that you can create
// 'comment-card' elements
customElements.define('comment-card', CommentCard);
