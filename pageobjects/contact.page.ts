import { $, browser } from '@wdio/globals';
import Opportunity from "../data/opportunity.data";
import ObjectPage from "./object.page";

class ContactPage extends ObjectPage {

    get oppNameInput(){ return $(`//span[text()='Opportunity Name']/parent::label/following-sibling::input`);};
    get closeDateInput(){ return $(`//span[text()='Close Date']/parent::label/following-sibling::div/input`);};
    get stageDropDownBtn() { return $(`//span[text()='Stage']/parent::span/following-sibling::div/div/div/div/a[@class='select']`);};
    get accountNameLookupInput(){ return $(`//span[text()='Account Name']/parent::label/following-sibling::div//input`);};
    async accountNameLookupSelect(accountName: string){ return $(`//div[@title="${accountName}"]/parent::div/parent::a/parent::li`);};

    stageOptionBtn(stage: string) { return $(`//a[text()='${stage}']/parent::li`);};
    linkToNewOpp(oppName: string){ return $(`//a[@title='${oppName}']`)}

    get newOpportunityBtn(){return $(`//div[contains(@class,'active')]//button[@name="Global.NewOpportunity"]`);};
    get saveBtn(){ return $(`//div[contains(@class,'active')]//footer/button/span[text()="Save"]`)}

    async open(Id: string){
        return await super.open(`lightning/r/Contact/${Id}/view`);
    }

    async createNewOpportunity(opportunity: Opportunity){
        await (await this.newOpportunityBtn).click();
        await (await this.oppNameInput).waitForDisplayed();
        await (await this.oppNameInput).click();
        await (await this.oppNameInput).setValue(opportunity.opportunityName);
        await (await this.closeDateInput).waitForDisplayed();
        await (await this.closeDateInput).clearValue();
        await (await this.closeDateInput).setValue(opportunity.closeDate.toLocaleDateString());
        await (await this.stageDropDownBtn).waitForDisplayed();
        await (await this.stageDropDownBtn).click();
        await (await this.stageOptionBtn(opportunity.stage)).click();
        await (await this.accountNameLookupInput).waitForDisplayed();
        await (await this.accountNameLookupInput).click();
        await (await this.accountNameLookupInput).setValue(opportunity.accountName);
        await (await this.accountNameLookupSelect(opportunity.accountName)).click();
        await (await this.saveBtn).click()
        await browser.pause(5000);
    }
}

export default new ContactPage();