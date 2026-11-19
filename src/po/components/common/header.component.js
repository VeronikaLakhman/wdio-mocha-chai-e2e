import { $ } from '@wdio/globals';

class HeaderComponent {
    get userMenu() {
        return $('[data-test="nav-menu"]');
    }

    get cartQuantity() {
        return $('[data-test="cart-quantity"]');
    }

    get cartLink() {
        return $('[data-test="nav-cart"]');
    }

    async getUserName() {
        return this.userMenu.getText();
    }

    async isCartEmpty() {
        return !(await this.cartQuantity.isExisting());
    }

    async openCart() {
        await this.cartLink.click();
    }
}

export default new HeaderComponent();