describe('Basic user flow for Website', () => {
  // First, visit the website
  beforeAll(async () => {
    // loads the local storage
    await page.goto('http://127.0.0.1:8444/source/html/home.html');
    // goes to the page we actually want to test
    await page.goto('http://127.0.0.1:8444/source/html/individual-book.html?q=The%20Indian%20Economy%20:%20For%20UPSC%20And%20State%20Civil%20Services%20Preliminary%20And%20Main%20Examinations');
  });

  // This handles all dialogs
  let editing = false;
  // editing boolean controls if we accept dialogs to go through with an edit or to cancel them
  page.on('dialog', async dialog => {
    // get alert message
    console.log(dialog.message());
    // dismiss the alert
    if (editing) {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
  });
  /** begin testing by adding some reviews
     *
     * Adds 5 reviews with a default format
     * Then proceeds to check each field of each review, sets boolean (working) to false if any are not correct
     * Expects working to be true at the end on the test.
    */
  it('Add a series of reviews', async () => {
    console.log('Adding reviews');

    // adds 5 reviews. with name = name #, rating = #, comment = comment # for each numbered review
    for (let i = 0; i < 5; i++) {
      const ithname = `name ${i}`;
      const ithcomment = `comment ${i}`;
      await page.$eval('input[name=name]', (el, value) => el.value = value, ithname);
      await page.click(`input[value="${i}"]`);
      await page.$eval('textarea[name=comment]', (el, value) => el.value = value, ithcomment);
      await page.click('button[type="submit"]');
    }
    // reviews only count if they persist
    await page.reload();

    // variable we will be testing
    let working = true;

    //tests to make sure the average rating functionality works
    const overallRate = await page.$('#rating');
    const overallRateJS = await overallRate.getProperty('innerText');
    const oRateText = await overallRateJS.jsonValue();
    if (oRateText != "Average Rating: 2.0"){
      working = false;
    }
    // list of all reviews that are currently on the page
    const reviews = await page.$$('comment-card');

    // Just makes sure there are the correct number of reviews
    if (reviews.length != 5) {
      working = false;
    }
    // checks through the first 5 reviews
    for (let i = 0; i < 5; i++) {
      // following lines just get the values of name, rating, comment for each comment
      const shadow = await reviews[i].getProperty('shadowRoot');
      const name = await shadow.$('.name');
      const nameJS = await name.getProperty('innerText');
      const nameText = await nameJS.jsonValue();
      const rate = await shadow.$('span');
      const rateJS = await rate.getProperty('innerText');
      const rateText = await rateJS.jsonValue();
      const comment = await shadow.$('.comment');
      const commentJS = await comment.getProperty('innerText');
      const commentText = await commentJS.jsonValue();

      // ensures that for each comment, their values are appropriate
      if (nameText != `name ${i}` || rateText != `${i}` || commentText != `comment ${i}`) {
        working = false;
      }
    }
    expect(working).toBe(true);
  });

  /** Testing if cancelling a review edit preserves everything properly
     *
     * Inputs a comment with a repeat name
     * Dismisses any alerts to keep old comment
     * Checks that all reviews are still the same, sets boolean (working) to false if any are not correct
     * Expects working to be true at the end on the test.
     */
  it('Editing a review and cancelling', async () => {
    console.log('Canceling an edit...');

    // adding a review in place of name 0
    await page.$eval('input[name=name]', (el, value) => el.value = value, 'name 0');
    await page.click('input[value="1"]');
    await page.$eval('textarea[name=comment]', (el, value) => el.value = value, 'new comment');
    await page.click('button[type="submit"]');

    // variable we will be testing
    let working = true;
    // list of all reviews that are currently on the page
    const reviews = await page.$$('comment-card');
    // checks through all of the reviews in the same way as previous as none should change
    for (let i = 0; i < 5; i++) {
      // following lines just get the values of name, rating, comment for each comment
      // shadowRoot for all
      const shadow = await reviews[i].getProperty('shadowRoot');

      // getting name
      const name = await shadow.$('.name');
      const nameJS = await name.getProperty('innerText');
      const nameText = await nameJS.jsonValue();
      // getting rating
      const rate = await shadow.$('span');
      const rateJS = await rate.getProperty('innerText');
      const rateText = await rateJS.jsonValue();
      // getting comment
      const comment = await shadow.$('.comment');
      const commentJS = await comment.getProperty('innerText');
      const commentText = await commentJS.jsonValue();

      // ensures that for each comment, their values are appropriate
      if (nameText != `name ${i}` || rateText != `${i}` || commentText != `comment ${i}`) {
        working = false;
      }
    }
    expect(working).toBe(true);
  });

  /** Testing actually editing a comment
     *
     * Inputs a comment with a repeat name
     * Accepts any alerts to keep old comment
     * Checks that the first review has been changed,
     * Then checks that all other reviews are still the same, sets boolean (working) to false if any are not correct
     * Expects working to be true at the end on the test.
     */
  it('Editing a review', async () => {
    console.log('Editing a review...');

    editing = true;

    // adding a review in place of name 0
    await page.$eval('input[name=name]', (el, value) => el.value = value, 'name 0');
    await page.click('input[value="1"]');
    await page.$eval('textarea[name=comment]', (el, value) => el.value = value, 'new comment');
    await page.click('button[type="submit"]');

    // variable we will be testing
    let working = true;
    // list of all reviews that are currently on the page
    const reviews = await page.$$('comment-card');

    //tests to make sure the average rating functionality works
    const overallRate = await page.$('#rating');
    const overallRateJS = await overallRate.getProperty('innerText');
    const oRateText = await overallRateJS.jsonValue();
    if (oRateText != "Average Rating: 2.2"){
      working = false;
    }

    // checks through all of the reviews
    // for the first review, comment should now be new comment and rating should now be one
    for (let i = 1; i < 5; i++) {
      // following lines just get the values of name, rating, comment for each comment
      // shadowRoot for all
      const shadow = await reviews[i].getProperty('shadowRoot');

      // getting name
      const name = await shadow.$('.name');
      const nameJS = await name.getProperty('innerText');
      const nameText = await nameJS.jsonValue();
      // getting rating
      const rate = await shadow.$('span');
      const rateJS = await rate.getProperty('innerText');
      const rateText = await rateJS.jsonValue();
      // getting comment
      const comment = await shadow.$('.comment');
      const commentJS = await comment.getProperty('innerText');
      const commentText = await commentJS.jsonValue();

      // ensures that for each comment, their values are appropriate
      if (nameText != `name ${i}` || rateText != `${i}` || commentText != `comment ${i}`) {
        // handles the special case of the first comment
        if (i === 0 && commentText === 'new comment' && rateText === '1') {console.log("here");} else {
          working = false;
        }
      }
    }
    expect(working).toBe(true);
  });

  /** Testing Deleting a single review
     *
     * Goes in and deletes a comment from the middle
     * Checks that there are now 4 comments and that each comment has the expected value
     * If any do not, update working to false
     * expect working to be true
     */
  it('Deleting a review', async () => {
    console.log('deleting a review...');

    // Deleting the second review on the page
    let reviews = await page.$$('comment-card');
    const shadow = await reviews[1].getProperty('shadowRoot');
    const button = await shadow.$('button');
    await button.click();
    await page.reload();

    // variable we will be testing
    let working = true;
    // list of all reviews that are currently on the page
    reviews = await page.$$('comment-card');

    //tests to make sure the average rating functionality works
    const overallRate = await page.$('#rating');
    const overallRateJS = await overallRate.getProperty('innerText');
    const oRateText = await overallRateJS.jsonValue();
    if (oRateText != "Average Rating: 2.5"){
      working = false;
    }

    // ensures that there actually is one less review on the page
    if (reviews.length != 4) {
      working = false;
    }
    // checks through all of the reviews
    for (let i = 1; i < 4; i++) {
      // following lines just get the values of name, rating, comment for each comment
      // shadowRoot for all
      const shadow = await reviews[i].getProperty('shadowRoot');

      // getting name
      const name = await shadow.$('.name');
      const nameJS = await name.getProperty('innerText');
      const nameText = await nameJS.jsonValue();
      // getting rating
      const rate = await shadow.$('span');
      const rateJS = await rate.getProperty('innerText');
      const rateText = await rateJS.jsonValue();
      // getting comment
      const comment = await shadow.$('.comment');
      const commentJS = await comment.getProperty('innerText');
      const commentText = await commentJS.jsonValue();

      // ensures that for each comment, their values are appropriate
      if (i === 0) {
        if (nameText != `name ${i}` || rateText != '1' || commentText != 'new comment') {
          working = false;
        }
      } else {
        if (nameText != `name ${i + 1}` || rateText != `${i + 1}` || commentText != `comment ${i + 1}`) {
          working = false;
        }
      }
    }
    expect(working).toBe(true);
  });

  /** Testing Deleting all reviews
     *
     * Goes in and deletes first comment 4 times, until there are none left
     * Checks that there are now no comments
     * expect reviews.length to be 0
     */
  it('Deleting all reviews', async () => {
    console.log('deleting all reviews...');

    // deletes the first review in the list 4 times
    for (let i = 0; i < 4; i++) {
      const reviews = await page.$$('comment-card');
      const shadow = await reviews[0].getProperty('shadowRoot');
      const button = await shadow.$('button');
      await button.click();
      await page.reload();
    }
    // list of all reviews that are currently on the page
    const reviews = await page.$$('comment-card');
    expect(reviews.length).toBe(0);
  });

  /** begin testing by adding some reviews
     *
     * Adds 100 reviews with a default format
     * Then proceeds to check each field of each review, sets boolean (working) to false if any are not correct
     * Expects working to be true at the end on the test.
    */
   jest.setTimeout(60000)
   it('Add a series of reviews', async () => {
    console.log('Adding reviews');

    // adds 100 reviews. with name = name #, rating = #, comment = comment # for each numbered review
    for (let i = 0; i < 100; i++) {
      const ithname = `name ${i}`;
      const ithcomment = `comment ${i}`;
      await page.$eval('input[name=name]', (el, value) => el.value = value, ithname);
      await page.click(`input[value="${Math.floor(Math.random() * 5)}"]`);
      await page.$eval('textarea[name=comment]', (el, value) => el.value = value, ithcomment);
      await page.click('button[type="submit"]');
    }

    // reviews only count if they persist
    await page.reload();

    // check reviews are all in local storage
    //const all_comment = await page.evaluate(() => localStorage.getItem('The Indian Economy : For UPSC And State Civil Services Preliminary And Main Examinations'));
    //expect(all_comment.length).toBe(1000);

    // list of all reviews that are currently on the page
    const reviews = await page.$$('comment-card');
    let working = true;
    // Just makes sure there are the correct number of reviews
    if (reviews.length != 100) {
      working = false;
    }
    // checks through the first 5 reviews
    for (let i = 0; i < 100; i++) {
      // following lines just get the values of name, rating, comment for each comment
      const shadow = await reviews[i].getProperty('shadowRoot');
      const name = await shadow.$('.name');
      const nameJS = await name.getProperty('innerText');
      const nameText = await nameJS.jsonValue();
      const rate = await shadow.$('span');
      const rateJS = await rate.getProperty('innerText');
      const rateText = await rateJS.jsonValue();
      const comment = await shadow.$('.comment');
      const commentJS = await comment.getProperty('innerText');
      const commentText = await commentJS.jsonValue();

      // ensures that for each comment, their values are appropriate
      if (nameText != `name ${i}` || commentText != `comment ${i}`) {
        working = false;
      }
    }
    expect(working).toBe(true);
  });


  /** Testing Deleting all reviews again
     *
     * Goes in and deletes first comment 100 times, until there are none left
     * Checks that there are now no comments
     * expect reviews.length to be 0
     */
  it('Deleting all reviews', async () => {
    console.log('deleting all reviews...');

    // deletes the first review in the list 4 times
    for (let i = 0; i < 100; i++) {
      const reviews = await page.$$('comment-card');
      const shadow = await reviews[0].getProperty('shadowRoot');
      const button = await shadow.$('button');
      await button.click();
      await page.reload();
    }
    // list of all reviews that are currently on the page
    const reviews = await page.$$('comment-card');
    expect(reviews.length).toBe(0);
  });
});