describe('Recommendations flow for website', () => {
    // First, visit the website
    beforeAll(async () => {
      //loads the local storage
      await page.goto('http://127.0.0.1:8444/source/html/home.html');
      //goes to the page we actually want to test
      await page.goto('http://127.0.0.1:8444/source/html/recommendations.html');
    });

    /** Testing Adding Academic and Professional specific books
     * 
     * Adds Academic genre to the search bar, and adds ratings and price elements.
     * Checks if the book-container successfully displays books
     * expects length within section to be 0
     */
    it('Check if recommendations page display a single filtered items', async () => {
        console.log('Adding Academic and Professional books');

        const genre = await page.$$('#genre li');
        await genre[1].click();
        const rating = await page.$$('#ratings li');
        await rating[2].click();
        const price = await page.$$('#price li');
        await price[3].click();
        await page.click('button[type="submit"]');

        const len = await page.evaluate(() => {
            return document.querySelectorAll(
              "#book-container > book-card"
            ).length;
          });
        expect(len).toBe(0);
      }, 10000);

    /** Testing every listed genre
     * 
     * Sets ratings as 3, since every current book in localStorage has 3 stars
     * Sets max price as 700, which is where the majority of the books are in
     * Traverse through genres and adds to the search bar
     * Checks if the book-container successfully displays books
     * expects length within section to be 0
     */
    it('Check if recommendations page work for every filtered genre', async () => {
        console.log('Adding every genre in localStorage');
        let arr = [1,2,3,4,5,7,9]
        const rating = await page.$$('#ratings li');
        await rating[2].click();
        const price = await page.$$('#price li');
        await price[3].click();

        let index = 0;
        const genre = await page.$$('#genre li');
        for (let i = 0; i < genre.length; i++) {
            if (i == arr[index]) {
                await genre[i].click();
                await page.click('button[type="submit"]');
                index++;
            }
        }
        expect(index).toBe(8);
    }, 30000);


    /** Testing Author feture
     * 
     * Sets genre as Academic from test 1
     * Sets ratings as 3, since every current book in localStorage has 3 stars
     * Sets max price as 700, which is where the majority of the books are in
     * Sets author as "amish", which adds books by Amish on top of the filtered items prior
     * expects length within section to be 0
     */
    it('Check if author feature works', async () => {
        console.log('Adding optional author feature');

        const genre = await page.$$('#genre li');
        await genre[1].click();
        const rating = await page.$$('#ratings li');
        await rating[2].click();
        const price = await page.$$('#price li');
        await price[3].click();

        let author = "amish";
        await page.$eval('input[id="author"]', (el, value) => el.value = value, author);

        await page.click('button[type="submit"]');

        const len = await page.evaluate(() => {
            return document.querySelectorAll(
                "#book-container > book-card"
            ).length;
            });
    expect(len).toBe(0);
    }, 10000);


});