
import { Key } from 'webdriverio';
import { Product } from "../data/quote.data";
import ObjectPage from "./object.page";

class QuotePage extends ObjectPage { 

    get ifPrimary(){ return $(`//div[contains(@class,"windowViewMode-normal")]//input[@name="SBQQ__Primary__c" and @type='checkbox']/parent::span/parent::div/parent::lightning-primitive-input-checkbox`);};
    get editLinesBtn(){ return $(`//button[text()='Edit Lines']`)};
    
    
    // EDIT LINES MODE
    get mainIframeInEditLinesMode() { return $(`//div[contains(@class,"windowViewMode-normal")]//iframe[@height='100%']`)}

    async btnInEditLinesMode(buttonName: string) { return await $(`#sbPageContainer`).shadow$(`sb-line-editor`)
                                                                .shadow$(`sb-custom-action[name='${buttonName}']`)
                                                                .shadow$(`#mainButton`)}

    get searchInputInEditLinesMode() { return $(`#sbPageContainer`).shadow$(`sb-product-lookup`)
                                                                .shadow$(`#headersearch`)
                                                                .shadow$(`#typeahead`)
                                                                .shadow$(`#itemLabel`);};

    get selectAndAddMoreInEditLinesMode() { return $(`#sbPageContainer`).shadow$(`sb-product-lookup`).shadow$(`#plSelectMore`);};
    get selectInEditLinesMode() { return $(`#sbPageContainer`).shadow$(`sb-product-lookup`).shadow$(`#plSelect`);};

    async resultCheckboxInEditLinesMode(productName: string) { return await (await (await (await (await $(`#sbPageContainer`)).shadow$(`sb-product-lookup`))
                                                                .shadow$(`sb-lookup-layout`))
                                                                .shadow$(`sb-table-row[name='${productName}']`))
                                                                .shadow$(`#selection`);
                                                                };

    get spinner() { return $(`#sbPageContainer`).shadow$(`#spinner`).shadow$(`#mask`)}

    get quoteLinesProducts() { return $$(`//table[@aria-label="Quote Lines"]/tbody/tr/td[@data-label="Product"]//slot`);};
    get quoteLinesTable() { return $(`//table[@aria-label="Quote Lines"]`);};

    async open(Id: string){
        return await super.open(`lightning/r/SBQQ__Quote__c/${Id}/view`);
    }

    async addProductsToQuote(products: Array<Product>){

        await (await this.editLinesBtn).click();
        
        await (await this.mainIframeInEditLinesMode).waitForExist();
        let frame = await this.mainIframeInEditLinesMode;
        await browser.switchToFrame(frame); 

        await browser.waitUntil(async () => await this.spinner.getAttribute('hidden') == 'true');
        
        await (await this.btnInEditLinesMode('Add Products')).waitForDisplayed()
        await (await this.btnInEditLinesMode('Add Products')).moveTo()
        await (await this.btnInEditLinesMode('Add Products')).click()

        await browser.switchToParentFrame();
        await browser.switchToFrame((await this.mainIframeInEditLinesMode));

        for(let product of products){
            await (await this.searchInputInEditLinesMode).waitForClickable();
            await (await this.searchInputInEditLinesMode).click();
            await (await this.searchInputInEditLinesMode).clearValue();
            await (await this.searchInputInEditLinesMode).setValue(product.productCode);
            await browser.keys(Key.Enter);

            await browser.waitUntil(async () => await (await this.spinner).getAttribute('hidden') === 'true');

            await (await this.resultCheckboxInEditLinesMode(product.productName)).waitForDisplayed();
            await (await this.resultCheckboxInEditLinesMode(product.productName)).moveTo();
            await (await this.resultCheckboxInEditLinesMode(product.productName)).click();

            await (await this.selectAndAddMoreInEditLinesMode).click();

        }
        await (await this.selectInEditLinesMode).click();
        await browser.waitUntil(async () => await (await this.spinner).getAttribute('hidden') === 'true');

        await (await this.btnInEditLinesMode('Save')).click();
        await browser.switchToParentFrame();

    }

    async getAllProductsNamesFromQuoteLines() {
        await (await this.quoteLinesTable).waitForDisplayed();
        return await this.quoteLinesProducts.map(async (prod) => {
            let match = ((await prod.getHTML()).match(/>(.*)</));
            return match !== null? match[1]?.toString(): null;});
    }

}

export default new QuotePage();