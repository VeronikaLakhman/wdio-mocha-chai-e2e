import { $, $$, browser } from '@wdio/globals';
import BasePage from './base.page.js';

class BasketPage extends BasePage {
    open() {
        return super.open('checkout');
    }

    getProductRow(name) {
        return $(`//tr[.//span[@data-test="product-title" and normalize-space(translate(., "\u00A0", " "))="${name}"]]`);
    }

    getQuantityInput(name) {
        return this.getProductRow(name).$('[data-test="product-quantity"]');
    }

    getProductPrice(name) {
        return this.getProductRow(name).$('[data-test="product-price"]');
    }

    getLineTotal(name) {
        return this.getProductRow(name).$('[data-test="line-price"]');
    }

    async setQuantity(name, quantity) {
        await this.getQuantityInput(name).setValue(quantity);
    }

    async removeProduct(name) {
        await this.getProductRow(name).$('a.btn-danger').click();
    }

    get removeButtons() {
        return $$('app-cart tbody tr a.btn-danger');
    }

    async clearBasket() {
        let buttons = await this.removeButtons;

        while (buttons.length > 0) {
            const count = buttons.length;

            await buttons[0].click();

            await browser.waitUntil(
                async () => (await this.removeButtons).length < count,
                {
                    timeout: 10000,
                    timeoutMsg: 'Product was not removed from basket',
                }
            );

            buttons = await this.removeButtons;
        }
    }
}

export default new BasketPage();
