import { $ } from '@wdio/globals';

export default class ProductCardComponent {
    constructor(name) {
        this.name = name;
    }

    get card() {
        return $(`//a[.//*[@data-test="product-name" and normalize-space(.)="${this.name}"]]`);
    }

    get productName() {
        return this.card.$('[data-test="product-name"]');
    }

    async open() {
        await this.card.click();
    }
}
