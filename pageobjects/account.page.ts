import { $ } from '@wdio/globals';
import { Contact } from '../data/contact.data';
import ObjectPage from './object.page';

class AccountPage extends ObjectPage {

    // new Contact button
    get newContactBtn () { return $(`//button[@name="NewContact"]`)}
    // link to Contact (it's name) on related list on Account
    async contactLink(contactFullName: string){ return $(`//span[text()='${contactFullName}']`)}


    /**
     * Edit Account's 3 fields listed below and save changes
     * @param ratingOpt 
     * @param phoneOpt 
     * @param parentAccount 
     */
    async editAccount(ratingOpt: string, phoneOpt: string, parentAccount: string) { 
        
        await (await this.editObjBtn).click();
        await (await this.dropdownButton('Rating')).waitForDisplayed();
        await (await this.dropdownButton('Rating')).click();
        await (await this.dropdownOption(ratingOpt)).click();

        await (await this.inputField('Phone')).setValue(phoneOpt);

        try { 
            await ( await this.clearLookupSelection).click();
        } catch(ex) { 
            console.log('Lookup is empty');
        }

        await (await this.inputLookupField('Parent Account')).setValue(parentAccount);
        await (await this.inputLookupField('Parent Account')).click();
        await (await this.optionLookup(parentAccount)).waitForDisplayed();
        await (await this.optionLookup(parentAccount)).click();
        await (await this.saveEdit).click()
    }


    /**
     * Create Contact with data stored in Contact object
     * @param contact 
     */
    async createContact(contact: Contact){
        
        await (await this.newContactBtn).click()

        await (await this.dropdownButton('Salutation')).click();
        await (await this.dropdownOption(contact.salutation)).click();
        
        await (await this.inputField('firstName')).setValue(contact.lastName);
        await (await this.inputField('lastName')).setValue(contact.firstName);
        await (await this.inputField('HomePhone')).setValue(contact.homePhone);
        await (await this.inputField('MobilePhone')).setValue(contact.mobile);
        await (await this.inputField('OtherPhone')).setValue(contact.otherPhone);
        await (await this.inputField('Email')).setValue(contact.email);
        await (await this.inputField('AssistantName')).setValue(contact.assistant);
        await (await this.inputField('AssistantPhone')).setValue(contact.asstPhone);
        await (await this.inputField('Title')).setValue(contact.title);
        await (await this.inputField('Department')).setValue(contact.department);
        await (await this.inputField('Birthdate')).setValue(contact.birthdate);

        await (await this.inputLookupField('Reports To')).setValue(contact.reportsTo);
        await (await this.inputLookupField('Reports To')).click();
        await (await this.optionLookup(contact.reportsTo)).waitForDisplayed();
        await (await this.optionLookup(contact.reportsTo)).click();

        await (await this.dropdownButton('Lead Source')).click();
        await (await this.dropdownOption(contact.leadSource)).click();

        await (await this.saveEdit).click();

    }

}

export default new AccountPage();