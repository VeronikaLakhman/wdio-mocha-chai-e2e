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

    get sort() {
        return $('[data-test="sort"]');
    }

    get productPrices() {
        return $$('[data-test="product-price"]');
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

    async getPrices() {
        const products = await this.productPrices;
        const prices = [];

        for (const product of products) {
            const priceText = await product.getText();
            prices.push(Number(priceText.replace('$', '')));
        }

        return prices;
    }
}

export default new HomePage();