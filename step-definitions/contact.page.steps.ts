import { Then } from "@wdio/cucumber-framework";
import data from "../data/contact.data";
import accountPage from "../pageobjects/account.page";
import contactPage from '../pageobjects/contact.page';
const { expect } = require('chai')

Then(`Contact details are visible in Details Tab`, async () => {
    
    await (await accountPage.contactLink(`${data.lastName} ${data.firstName}`)).moveTo()
    await (await accountPage.contactLink(`${data.lastName} ${data.firstName}`)).click()

    await (await contactPage.detailsTab).waitForDisplayed();
    await (await contactPage.detailsTab).click();

    expect(await (await contactPage.detailFieldnameOut('Title')).getText()).equals(data.title);
    expect(await (await contactPage.detailFieldnameOut('Department')).getText()).equals(data.department);
    expect(await (await contactPage.detailFieldnameOut('Birthdate')).getText()).equals(data.birthdate);
    expect(await (await contactPage.detailFieldnameOut('Lead Source')).getText()).equals(data.leadSource);
    expect(await (await contactPage.detailFieldnameOut('Home Phone')).getText()).equals(data.homePhone);
    expect(await (await contactPage.detailFieldnameOut('Mobile')).getText()).equals(data.mobile);
    expect(await (await contactPage.detailFieldnameOut('Other Phone')).getText()).equals(data.otherPhone);
    expect(await (await contactPage.detailFieldnameOut('Email')).getText()).equals(data.email);
    expect(await (await contactPage.detailFieldnameOut('Assistant')).getText()).equals(data.assistant);
    expect(await (await contactPage.detailFieldnameOut('Asst. Phone')).getText()).equals(data.asstPhone);
    expect(await (await contactPage.detailFieldnameOut('Name')).getText()).equals(`${data.salutation} ${data.lastName} ${data.firstName}`);
    expect(await (await contactPage.detailLookupfieldOut('Reports To')).getText()).equals(data.reportsTo);

})