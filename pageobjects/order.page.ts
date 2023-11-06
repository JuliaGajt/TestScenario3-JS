import { order } from "../data/order.data";
import { quote } from "../data/quote.data";
import ObjectPage from "./object.page";


class OrderPage extends ObjectPage { 

    get editOrderProductsBtn() { return $(`//div[contains(@class,'active')]//li[@data-target-selection-name="sfdc:CustomButton.Order.SBQQ__EditOrderProducts"]//button`);};
    get selectAllProductsCheckbox() { return $(`//table[@class="sbTable" and @width="100%"]/thead/tr/th/input[@type="checkbox"]`);};
    get saveAddedProducts(){ return $(`//div[@class='sbButtons']/input[@type='submit' and @value='Save']`);};

    get productsOnRelatedList(){ return $$(`//article[@aria-label="Order Products"]//table/tbody/tr/th/div/a`);};
    get activateOrderBtn() { return $(`//div[contains(@class,'active')]//button[@name="ActivateOrder"]`);};
    get activateOrderConfirmBtn() { return $(`//div[contains(@class,'active')]//button[@title="Activate"]`);};

    get iframeInEditOrderProducts(){ return $(`//iframe[@height="100%"]`);};
    
    open(orderId: string){ 
        return super.open(`lightning/r/Order/${orderId}/view`);
    }

    async addProductsToOrder() { 
        await (await this.editOrderProductsBtn).waitForDisplayed();
        await (await this.editOrderProductsBtn).click();

        await (await this.iframeInEditOrderProducts).waitForExist();
        let frame = await this.iframeInEditOrderProducts;
        await browser.switchToFrame(frame);

        await (await this.selectAllProductsCheckbox).waitForDisplayed();
        await (await this.selectAllProductsCheckbox).click();

        await (await this.saveAddedProducts).waitForDisplayed();
        await (await this.saveAddedProducts).click();
        order.orderAmount = quote.orderAmount;

        await browser.switchToParentFrame();

    }

    async getAllOrderedProducts(){
        return await this.productsOnRelatedList.map(async prod => await prod.getText());
    }

    async activateOrder() {
        await (await this.activateOrderBtn).waitForDisplayed();
        await (await this.activateOrderBtn).click();

        await (await this.activateOrderConfirmBtn).waitForDisplayed();
        await (await this.activateOrderConfirmBtn).click();
        
    }

}

export default new OrderPage();