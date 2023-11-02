import { Given, Then, When } from "@wdio/cucumber-framework";
import { accountEdit } from "../data/account.data";
import { contact } from "../data/contact.data";

import accountPage from "../pageobjects/account.page";
const { expect } = require('chai')


When(`I edit Account`, async () => {
    let accData = accountEdit;
    await accountPage.editAccount(accData.rating, accData.phone, accData.parentAccount);

})

Then(`Success edit Account message is displayed`, async () => {
    expect(await (await accountPage.successMessage).getText()).equals(`Account "${accountEdit.accountName}" was saved.`)
})

Then(`Account changes are visible in Details Tab`, async () => {

    await (await accountPage.detailsTab).click();
    expect(await (await accountPage.detailFieldnameOut('Rating')).getText()).equals(accountEdit.rating);
    expect(await (await accountPage.detailFieldnameOut('Phone')).getText()).equals(accountEdit.phone);
    expect(await (await accountPage.detailLookupfieldOut('Parent Account')).getText()).equals(accountEdit.parentAccount);
})

Given(`I am in related tab`, async () => {
    await (await accountPage.relatedTab).click();
})

When(`I create Contact`, async () => {
    await accountPage.createContact(contact);
})

Then(`Success create Contact message is displayed`, async () => {
    expect(await (await accountPage.successMessage).getText()).equals(`Contact "${contact.salutation} ${contact.lastName} ${contact.firstName}" was created.`)
})

