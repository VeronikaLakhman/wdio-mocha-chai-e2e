
import { browser } from '@wdio/globals';
import { expect as chaiExpect } from 'chai';
import LoginPage from '../po/pages/login.page.js';
import HomePage from '../po/pages/home.page.js';
import ProductPage from '../po/pages/product.page.js';
import FavoritesPage from '../po/pages/favorites.page.js';
import { users } from '../data-provider/users.data.js';
import { catalogData } from '../data-provider/catalog.data.js';

describe('Favorites', () => {
    it('should add a product to favorites only once', async () => {
        const user = users.regularUser1;
        const productName = catalogData.products.slipJointPliers;

        await LoginPage.open();
        await LoginPage.login(user.email, user.password);

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/account'),
            {
                timeout: 10000,
                timeoutMsg: 'Login was not completed',
            }
        );

        await FavoritesPage.open();

        await FavoritesPage.removeProduct(productName);

        await browser.waitUntil(
            async () => (await FavoritesPage.getProductCards(productName)).length === 0,
            {
                timeout: 10000,
                timeoutMsg: 'Product was not removed from favorites',
            }
        );

        await HomePage.open();
        await HomePage.searchProduct(productName);

        const productCard = HomePage.getProductCard(productName);
        await productCard.card.waitForDisplayed();
        await productCard.open();

        await ProductPage.addToFavorites();

        await FavoritesPage.open();

        await browser.waitUntil(
            async () => (await FavoritesPage.getProductCards(productName)).length > 0,
            {
                timeout: 10000,
                timeoutMsg: 'Product was not added to favorites',
            }
        );

        const favorites = await FavoritesPage.getProductCards(productName);

        chaiExpect(favorites.length).to.equal(1);
    });
});
