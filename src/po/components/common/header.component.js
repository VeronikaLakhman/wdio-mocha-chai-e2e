import { $ } from '@wdio/globals';

class HeaderComponent {
    get userMenu(){
        return $('[data-test="nav-menu"]');
    }

    async getUserName() {
        return this.userMenu.getText();
    }
}

export default new HeaderComponent();