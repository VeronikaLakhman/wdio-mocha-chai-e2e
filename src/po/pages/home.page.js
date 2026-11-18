import ProductCardComponent from '../components/catalog/product-card.component.js';
import BasePage from './base.page.js';

class HomePage extends BasePage {
    open() {
        return super.open('');
    }

    getProductCard(name) {
        return new ProductCardComponent(name);
    }
}

export default new HomePage();