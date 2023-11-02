import { $, browser } from '@wdio/globals';
import Opportunity from "../data/opportunity.data";
import ObjectPage from "./object.page";

class ContactPage extends ObjectPage {

    get oppNameInput(){ return $(`//span[text()='Opportunity Name']/parent::label/following-sibling::input`);};
    get closeDateInput(){ return $(`//span[text()='Close Date']/parent::label/following-sibling::div/input`);};
    get stageDropDownBtn() { return $(`//span[text()='Stage']/parent::span/following-sibling::div/div/div/div/a[@class='select']`);};
    stageOptionBtn(stage: string) { return $(`//a[text()='${stage}']/parent::li`);};
    linkToNewOpp(oppName: string){ return $(`//a[@title='${oppName}']`)}

    get newOpportunityBtn(){return $(`//div[contains(@class,'active')]//li[@data-target-selection-name="sfdc:StandardButton.Opportunity.New"]//button[@name="New"]`);};
    get saveBtn(){ return $(`//button[@title="Save"]`)}

    async open(Id: string){
        return await super.open(`lightning/r/Contact/${Id}/view`);
    }

    async createNewOpportunity(opportunity: Opportunity){
        await (await this.newOpportunityBtn).click();
        await (await this.oppNameInput).setValue(opportunity.opportunityName);
        await (await this.closeDateInput).setValue(opportunity.closeDate.toLocaleDateString());
        await (await this.stageDropDownBtn).click();
        await (await this.stageOptionBtn(opportunity.stage)).click();
        await (await this.saveBtn).click()
        await browser.pause(5000);
    }
}

export default new ContactPage();