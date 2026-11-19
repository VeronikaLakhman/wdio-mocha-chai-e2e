import { browser } from '@wdio/globals';
import { expect as chaiExpect } from 'chai';
import HomePage from '../po/pages/home.page.js';
import HeaderComponent from '../po/components/common/header.component.js';

describe('Localization', () => {
    it('should preserve German language after navigating to the Contact page', async () => {
        await HomePage.open();

        const initialLanguage = await HeaderComponent.languageSelector.getText();
        chaiExpect(initialLanguage.trim()).to.equal('EN');

        await HeaderComponent.selectGermanLanguage();
        await HeaderComponent.openContactPage();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/contact'),
            {
                timeout: 10000,
                timeoutMsg: 'Contact page was not opened',
            }
        );

        await browser.waitUntil(
            async () => (await HeaderComponent.homeLink.getText()).trim() === 'Start',
            {
                timeout: 10000,
                timeoutMsg: 'German translation was not displayed',
            }
        );

        const homeLabel = await HeaderComponent.homeLink.getText();
        const selectedLanguage = await HeaderComponent.languageSelector.getText();

        chaiExpect(homeLabel.trim()).to.equal('Start');
        chaiExpect(selectedLanguage.trim()).to.equal('DE');
    });
});
