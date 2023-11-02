import Quote from '../data/quote.data';
import ObjectPage from "./object.page";

class OpportunityPage extends ObjectPage { 

    contactRoleName(Id: string){ return $(`//div[contains(@class,'windowViewMode-normal')]//a[@data-recordid='${Id}']`);};
    get newQuoteBtn(){ return $(`//button[@name="Opportunity.New_Quote"]`);};
    get primaryCheckboxOnCreateQuoteView() { return $(`//span[text()='Primary']/parent::label/following-sibling::input`);};
    dateInputInCreateQuoteView(dateName: "Start Date" | "End Date"){return $(`//span[text()='${dateName}']/parent::label/following-sibling::div/input`);};
    get saveNewQuote() { return $(`//div[contains(@class,"windowViewMode-normal active")]//footer/button/span[text()='Save']`);};
    quantityOfRelatedQuotes(quantity: number) { return $(`//div[contains(@class,"windowViewMode-normal")]//span[@title="Quotes"]/following-sibling::span[@title='(${quantity})']`)}
    get linkToRelatedQuote(){ return $(`//a[not(contains(@href, 'Quote'))]//span[contains(text(),'Q-')]`);};

    async open(Id: string){
        return await super.open(`lightning/r/Opportunity/${Id}/view`);
    }

    async createQuote(quote: Quote) {
        await (await this.newQuoteBtn).click()
        
        quote.ifPrimary? await (await this.primaryCheckboxOnCreateQuoteView).click(): null;
        await (await this.dateInputInCreateQuoteView("Start Date")).setValue(quote.startDate);
        await (await this.dateInputInCreateQuoteView("End Date")).setValue(quote.endDate);
        await (await this.saveNewQuote).click()

    }

    async setPriceBookId(pricebookId: string) { 
        await (await this.editObjBtn).click();
        await (await this.inputField('SBQQ__QuotePricebookId__c')).setValue(pricebookId);
        await (await this.saveEdit).click();
    }

}

export default new OpportunityPage();