import { $, $$ } from '@wdio/globals';
import ProductCardComponent from '../components/catalog/product-card.component.js';
import BasePage from './base.page.js';

class HomePage extends BasePage {
    open() {
        return super.open('');
    }

    getProductCard(name) {
        return new ProductCardComponent(name);
    }

    get searchInput() {
        return $('[data-test="search-query"]');
    }

    get searchButton() {
        return $('[data-test="search-submit"]');
    }

    get productNames() {
        return $$('[data-test="product-name"]');
    }

    getCategoryCheckbox(category) {
        return $(`//label[normalize-space(.)="${category}"]/input[@name="category_id"]`);
    }

    async filterByCategory(category) {
        await this.getCategoryCheckbox(category).click();
    }

    async searchProduct(name) {
        await this.searchInput.setValue(name);
        await this.searchButton.click();
    }
}

export default new HomePage();