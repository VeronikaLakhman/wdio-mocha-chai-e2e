import { browser } from '@wdio/globals';
import { expect as chaiExpect } from 'chai';
import HomePage from '../po/pages/home.page.js';
import { catalogData } from '../data-provider/catalog.data.js';

describe('Product Sorting', () => {
    it('should sort products by price from low to high', async () => {
        await HomePage.open();

        await HomePage.filterByCategory(
            catalogData.filters.categories.hammer
        );

        await browser.waitUntil(
            async () => (await HomePage.productPrices).length === 7,
            {
                timeout: 10000,
                timeoutMsg: 'Hammer products were not loaded',
            }
        );

        await HomePage.sort.selectByAttribute(
            'value',
            catalogData.sorting.priceLowToHigh
        );

        await browser.waitUntil(
            async () => {
                try {
                    const prices = await HomePage.getPrices();

                    return prices.length === 7 &&
                        prices.every((price, index) =>
                            index === 0 || price >= prices[index - 1]
                        );
                } catch {
                    return false;
                }
            },
            {
                timeout: 10000,
                timeoutMsg: 'Products were not sorted by ascending price',
            }
        );

        const actualPrices = await HomePage.getPrices();

        const expectedPrices = [...actualPrices].sort(
            (firstPrice, secondPrice) => firstPrice - secondPrice
        );

        chaiExpect(actualPrices.length).to.equal(7);
        chaiExpect(actualPrices).to.deep.equal(expectedPrices);

        const selectedSorting = await HomePage.sort.getValue();

        chaiExpect(selectedSorting).to.equal(
            catalogData.sorting.priceLowToHigh
        );
    });
});
