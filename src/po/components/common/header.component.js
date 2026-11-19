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

    get languageSelector() {
        return $('[data-test="language-select"]');
    }

    get germanLanguageOption() {
        return $('[data-test="lang-de"]');
    }

    get homeLink() {
        return $('[data-test="nav-home"]');
    }

    get contactLink() {
        return $('[data-test="nav-contact"]');
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

    async selectGermanLanguage() {
        await this.languageSelector.click();
        await this.germanLanguageOption.click();
    }

    async openContactPage() {
        await this.contactLink.click();
    }
}

export default new HeaderComponent();