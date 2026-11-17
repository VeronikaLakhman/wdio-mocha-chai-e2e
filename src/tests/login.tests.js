import { browser } from '@wdio/globals';
import { expect as chaiExpect } from 'chai';
import LoginPage from '../po/pages/login.page.js';
import HeaderComponent from '../po/components/common/header.component.js';
import { users } from '../data-provider/users.data.js';

describe('Authentication', () => {
    it('should sign in with valid credentials', async () => {
        const user = users.regularUser1;

        await LoginPage.open();

        await LoginPage.emailInput.waitForDisplayed();

        await LoginPage.login(user.email, user.password);

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/account'),
            {
                timeout: 10000,
                timeoutMsg: 'Account page was not opened after login',
            }
        );

        await HeaderComponent.userMenu.waitForDisplayed();
        
        const actualName = await HeaderComponent.getUserName();

        chaiExpect(actualName).to.equal(user.fullName);
    });
});