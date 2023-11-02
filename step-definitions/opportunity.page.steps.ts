import { Given, Then, When } from "@wdio/cucumber-framework";
import { opp } from "../data/opportunity.data";
import { quote } from "../data/quote.data";
import contactPage from "../pageobjects/contact.page";
import opportunityPage from "../pageobjects/opportuity.page";
import quotePage from "../pageobjects/quote.page";
const { expect } = require('chai');

Then(`all Opportunity credentials in details are correct`, async () => { 
    await (await contactPage.linkToNewOpp(opp.opportunityName)).click();

    expect(await (await opportunityPage.detailFieldnameOut('Opportunity Name')).getText()).equals(opp.opportunityName);
    expect(await (await opportunityPage.detailFieldnameOut('Close Date')).getText()).equals(opp.closeDate.toLocaleDateString());
    expect(await (await opportunityPage.detailFieldnameOut('Stage')).getText()).equals(opp.stage);
    expect(await (await opportunityPage.detailLookupfieldOut('Account Name')).getText()).equals(opp.accountName);
    expect(await (await opportunityPage.detailLookupfieldOut('Opportunity Owner')).getText()).equals(opp.opportunityOwner);
    expect(await (await opportunityPage.detailFieldnameOut('Probability (%)')).getText()).equals(opp.probability);
    // expect(await (await opportunityPage.detailFieldnameOut('Quote Pricebook Id')).getText()).equals(opp.priceBookId);

    await browser.action('wheel').scroll({
        deltaX: 0,
        deltaY: 500,
        duration: 200
    }).perform();

    await expect(await (await opportunityPage.contactRoleName(opp.contactID)).getText()).equals(opp.contactName);

    let currentUrl = await browser.getUrl();
    opp.opportunityId = currentUrl.slice(-23, -5);
})

Given(`I am on Opportunity`, async () => {
    await opportunityPage.open(opp.opportunityId);
})

When(`I create new Quote`, async () => {
    await opportunityPage.createQuote(quote);
})

Then(`new Quote is visible on related list`, async () => {
    expect(await opportunityPage.quantityOfRelatedQuotes(1)); 
    expect(await (await opportunityPage.linkToRelatedQuote).getText()).not.equals("");
    expect(await (await opportunityPage.linkToRelatedQuote).getText()).contains("Q-");
})

Then(`all credentials in Quote's details tab are correct`, async () => {
    await (await opportunityPage.linkToRelatedQuote).click();

    expect(await (await quotePage.ifPrimary).getAttribute('checked')).equals(quote.ifPrimary? 'true': null);
    expect(await (await quotePage.detailFieldnameOut('Status')).getText()).equals('Draft');
    expect(await (await quotePage.detailLookupfieldOut('Account')).getText()).equals(opp.accountName);
    expect(await (await quotePage.detailLookupfieldOut('Opportunity')).getText()).equals(opp.opportunityName);
    expect(await (await quotePage.detailLookupfieldOut('Primary Contact')).getText()).equals(opp.contactName);
    expect(await (await quotePage.detailFieldnameOut('Start Date')).getText()).equals(quote.startDate);
    expect(await (await quotePage.detailFieldnameOut('End Date')).getText()).equals(quote.endDate);
    expect(await (await quotePage.detailLookupfieldOut('Price Book')).getText()).equals(quote.priceBookName);

    let currentUrl = await browser.getUrl();
    quote.quoteId = currentUrl.slice(-23, -5);
})

When(`set Price Book Id for Quote on Opportunity`, async () => {
    await opportunityPage.setPriceBookId(opp.priceBookId);
})
