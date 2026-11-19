import { $ } from '@wdio/globals';
import BasePage from './base.page.js';

class ProductPage extends BasePage {
    get productName() {
        return $('[data-test="product-name"]');
    }

    get productPrice() {
        return $('[data-test="unit-price"]');
    }

    get productImage() {
        return $('app-detail img.figure-img');
    }

    get addToFavoritesButton() {
        return $('[data-test="add-to-favorites"]');
    }

    async addToFavorites() {
        await this.addToFavoritesButton.click();
    }
}

export default new ProductPage();
