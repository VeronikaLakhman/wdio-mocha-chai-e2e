import { $$ } from '@wdio/globals';
import BasePage from './base.page.js';

class FavoritesPage extends BasePage {
    open() {
        return super.open('account/favorites');
    }

    getProductCards(name) {
        return $$(
            `//div[starts-with(@data-test, "favorite-")][.//*[@data-test="product-name" and normalize-space(.)="${name}"]]`
        );
    }

    async removeProduct(name) {
        const cards = await this.getProductCards(name);

        if (cards.length > 0) {
            await cards[0].$('[data-test="delete"]').click();
        }
    }
}

export default new FavoritesPage();
