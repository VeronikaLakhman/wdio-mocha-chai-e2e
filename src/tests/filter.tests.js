import { browser } from '@wdio/globals';
import { should } from 'chai';
import HomePage from '../po/pages/home.page.js';
import { catalogData } from '../data-provider/catalog.data.js';

should();

describe('Product Filtering', () => {
    it('should display products matching the selected category', async () => {
        const category = catalogData.filters.categories.hammer;

        await HomePage.open();
        await HomePage.filterByCategory(category);

        await browser.waitUntil(
            async () => {
                const products = await HomePage.productNames;

                if (products.length === 0) return false;

                const firstName = await products[0].getText();
                return firstName.toLowerCase().includes(category.toLowerCase());
            },
            {
                timeout: 10000,
                timeoutMsg: 'Category filter results were not updated',
            }
        );

        const products = await HomePage.productNames;

        products.length.should.be.greaterThan(0);

        for (const product of products) {
            const productName = await product.getText();
            productName.toLowerCase().should.include(category.toLowerCase());
        }
    });
});
