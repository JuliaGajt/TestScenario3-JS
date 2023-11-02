import { Given, Then, When } from "@wdio/cucumber-framework";
import { browser } from '@wdio/globals';
import { contact } from "../data/contact.data";
import { opp } from "../data/opportunity.data";
import accountPage from "../pageobjects/account.page";
import contactPage from '../pageobjects/contact.page';
const { expect } = require('chai')

Then(`Contact details are visible in Details Tab`, async () => {
    
    await (await accountPage.contactLink(`${contact.lastName} ${contact.firstName}`)).moveTo()
    await (await accountPage.contactLink(`${contact.lastName} ${contact.firstName}`)).click()

    await (await contactPage.detailsTab).waitForDisplayed();
    await (await contactPage.detailsTab).click();

    expect(await (await contactPage.detailFieldnameOut('Title')).getText()).equals(contact.title);
    expect(await (await contactPage.detailFieldnameOut('Department')).getText()).equals(contact.department);
    expect(await (await contactPage.detailFieldnameOut('Birthdate')).getText()).equals(contact.birthdate);
    expect(await (await contactPage.detailFieldnameOut('Lead Source')).getText()).equals(contact.leadSource);
    expect(await (await contactPage.detailFieldnameOut('Home Phone')).getText()).equals(contact.homePhone);
    expect(await (await contactPage.detailFieldnameOut('Mobile')).getText()).equals(contact.mobile);
    expect(await (await contactPage.detailFieldnameOut('Other Phone')).getText()).equals(contact.otherPhone);
    expect(await (await contactPage.detailFieldnameOut('Email')).getText()).equals(contact.email);
    expect(await (await contactPage.detailFieldnameOut('Assistant')).getText()).equals(contact.assistant);
    expect(await (await contactPage.detailFieldnameOut('Asst. Phone')).getText()).equals(contact.asstPhone);
    expect(await (await contactPage.detailFieldnameOut('Name')).getText()).equals(`${contact.salutation} ${contact.lastName} ${contact.firstName}`);
    expect(await (await contactPage.detailLookupfieldOut('Reports To')).getText()).equals(contact.reportsTo);
})

Given(/I am on Contact object/, async () => {
    await contactPage.open(opp.contactID);
    browser.waitUntil(() => browser.execute(
        () => document.readyState === 'complete'),
        {
          timeout: 60 * 1000, // 60 seconds
          timeoutMsg: 'Page hasn\'t been loaded.'
        }
    );
})

When(`I create new Opportunity`, async () => {
    await contactPage.createNewOpportunity(opp);
})

Then(`Opportunity is successfully created`, async () => {
    expect(await (await contactPage.successMessage).getText()).equals(`Opportunity "${opp.opportunityName}" was created.`);
})

