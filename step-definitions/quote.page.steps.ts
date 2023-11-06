import { Given, Then, When } from "@wdio/cucumber-framework";
import { opp } from '../data/opportunity.data';
import { quote } from '../data/quote.data';
import opportuityPage from "../pageobjects/opportuity.page";
import quotePage from '../pageobjects/quote.page';
const { expect } = require('chai');

Given(`I am on a Quote`, async () => {
    await quotePage.open(quote.quoteId);
    // await quotePage.open('a0q0600000hvkarAAA');
})

When(`I add Products to Quote`, async () => {
    await quotePage.addProductsToQuote(quote.products);
    opp.products = quote.products;
})

Then(`all products are visible in Quote Lines related list`, async () => {

    await (await quotePage.relatedTab).click();
    
    let products = await quotePage.getAllProductsNamesFromQuoteLines();
    
    await expect(products).to.be.an('array');
    await expect(products).to.have.lengthOf(quote.products.length);

    for(let prod of quote.products){
        await expect(prod.productName).to.be.oneOf(products);
    }

    await opportuityPage.open(opp.opportunityId);

    products = await opportuityPage.getProductsNames();

    for(let prod of opp.products){
        await expect(prod.productName).to.be.oneOf(products);
    }
    
})

When(`I create an Order`, async () => { 
    await quotePage.createAnOrder();
})