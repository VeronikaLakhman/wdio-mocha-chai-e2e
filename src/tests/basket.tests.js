import { browser } from '@wdio/globals';
import { expect as chaiExpect } from 'chai';
import HomePage from '../po/pages/home.page.js';
import ProductPage from '../po/pages/product.page.js';
import BasketPage from '../po/pages/basket.page.js';
import HeaderComponent from '../po/components/common/header.component.js';
import { catalogData } from '../data-provider/catalog.data.js';

describe('Basket', () => {
    it('should increase product quantity to two and update the total price', async () => {
        const productName = catalogData.products.clawHammer;

        await BasketPage.open();
        await BasketPage.clearBasket();

        chaiExpect(await HeaderComponent.isCartEmpty()).to.be.true;

        await HomePage.open();
        await HomePage.searchProduct(productName);

        const productCard = HomePage.getProductCard(productName);
        await productCard.card.waitForDisplayed();
        await productCard.open();

        await ProductPage.addToCart();

        await HeaderComponent.cartLink.waitForDisplayed();
        await HeaderComponent.openCart();

        await BasketPage.getQuantityInput(productName).waitForDisplayed();

        const priceText = await BasketPage.getProductPrice(productName).getText();
        const productPrice = Number(priceText.replace('$', ''));

        await BasketPage.setQuantity(productName, 2);

        const expectedTotal = Number((productPrice * 2).toFixed(2));

        await browser.waitUntil(
            async () => {
                const totalText = await BasketPage.getLineTotal(productName).getText();
                return Number(totalText.replace('$', '')) === expectedTotal;
            },
            {
                timeout: 10000,
                timeoutMsg: 'Basket total price was not updated',
            }
        );

        const actualQuantity = Number(
            await BasketPage.getQuantityInput(productName).getValue()
        );

        const totalText = await BasketPage.getLineTotal(productName).getText();
        const actualTotal = Number(totalText.replace('$', ''));

        chaiExpect(actualQuantity).to.equal(2);
        chaiExpect(actualTotal).to.equal(expectedTotal);
    });
});
