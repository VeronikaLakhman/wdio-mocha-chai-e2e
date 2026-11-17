import BasePage from './base.page.js';
import { $ } from '@wdio/globals'

class LoginPage extends BasePage {
    open() {
        return super.open('auth/login');
    }

    get emailInput() {
        return $('[data-test="email"]');
    }

    get passwordInput() {
        return $('[data-test="password"]');
    }

    get loginButton() {
        return $('[data-test="login-submit"]');
    }

    async login(email, password) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

export default new LoginPage();