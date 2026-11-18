
import { browser } from '@wdio/globals';
import { should } from 'chai';
import HomePage from '../po/pages/home.page.js';
import { catalogData } from '../data-provider/catalog.data.js';

should();

describe('Product Search', () => {
    it('should display products matching the search query', async () => {
        const searchQuery = catalogData.searchQueries.pliers;

        await HomePage.open();
        await HomePage.searchProduct(searchQuery);

        await browser.waitUntil(
            async () => (await HomePage.productNames).length === 4,
            {
                timeout: 10000,
                timeoutMsg: 'Expected four products in search results',
            }
        );

        const products = await HomePage.productNames;

        products.length.should.equal(4);

        for (const product of products) {
            const productName = await product.getText();
            productName.should.include(searchQuery);
        }
    });
});
