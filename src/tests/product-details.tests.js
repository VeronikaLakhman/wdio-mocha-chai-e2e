import { assert } from 'chai';
import HomePage from '../po/pages/home.page.js';
import ProductPage from '../po/pages/product.page.js';
import { catalogData } from '../data-provider/catalog.data.js';

describe('Product Details', () => {
    it('should display product details for Bolt Cutters', async () => {
        const productName = catalogData.products.boltCutters;

        await HomePage.open();

        const productCard = HomePage.getProductCard(productName);
        await productCard.card.waitForDisplayed();
        await productCard.open();

        await ProductPage.productName.waitForDisplayed();
        const actualName = await ProductPage.productName.getText();
        assert.strictEqual(actualName, productName);

        await ProductPage.productPrice.waitForDisplayed();
        assert.isTrue(await ProductPage.productPrice.isDisplayed());

        const price = Number(await ProductPage.productPrice.getText());
        assert.isAbove(price, 0);

        await ProductPage.productImage.waitForDisplayed();
        assert.isTrue(await ProductPage.productImage.isDisplayed());

        const imageWidth = await ProductPage.productImage.getProperty('naturalWidth');
        assert.isAbove(imageWidth, 0);
    });
});
