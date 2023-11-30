import { Given, Then, When } from "@wdio/cucumber-framework";
import { browser } from '@wdio/globals';
import { order } from '../data/order.data';
import { quote } from "../data/quote.data";
import { user } from "../data/user.data";
import orderPage from "../pageobjects/order.page";
const { expect } = require('chai');

let activationDate: string;

Then(`I am redirected to Order Page`, async () => {
    await (await orderPage.activateOrderBtn).waitForDisplayed();
    await expect(await browser.getUrl()).contains('/r/Order');
    let currentUrl = await browser.getUrl();
    order.orderId = currentUrl.slice(-23, -5);
})

Then(`all details are correctly filled`, async () => {
    await (await orderPage.detailsTab).click();

    await expect(await (await orderPage.detailFieldnameOut('Order Amount')).getText()).equals(order.orderAmount);
    await expect(await (await orderPage.detailFieldnameOut('Status')).getText()).equals(order.status);
    await expect(await (await orderPage.detailFieldnameOut('Order Start Date')).getText()).equals(order.orderStartDate);
    await expect(await (await orderPage.detailFieldnameOut('Order Type')).getText()).equals(order.orderType);
    await expect(await (await orderPage.detailFieldnameOut('Order Number')).getText()).to.match(/^[0-9]{8}$/);
    order.orderNumber = await (await orderPage.detailFieldnameOut('Order Number')).getText();

    await expect(await (await orderPage.detailLookupfieldOut('Account Name')).getText()).equals(order.accountName);
    await expect(await (await orderPage.detailLookupfieldOut('Opportunity')).getText()).equals(order.opportunityName);
    await expect(await (await orderPage.detailLookupfieldOut('Quote')).getText()).to.match(/^Q-[0-9]{5}$/);
    order.quoteNumber = await (await orderPage.detailLookupfieldOut('Quote')).getText()

})

Given(`I am on Order`, async () => {
    await orderPage.open(order.orderId);
})

When(`I add products from Quote to Order`, async () => {
    await orderPage.addProductsToOrder();
    order.products = quote.products;
})

Then(`order amount is changed`, async () => { 
    await (await orderPage.detailsTab).click();
    await (await orderPage.detailFieldnameOut('Order Amount')).waitForDisplayed();
    await expect(await (await orderPage.detailFieldnameOut('Order Amount')).getText()).equals(order.orderAmount);
})

Then(`all products are listed in related list on Order`, async () => { 
    await (await orderPage.relatedTab).click();

    let products = await orderPage.getAllOrderedProducts();

    await expect(products).to.be.an('array');
    await expect(products).to.have.lengthOf(order.products.length);

    for(let prod of order.products){
        await expect(prod.productName).to.be.oneOf(products);
    }
})

When(`activate an Order`, async () => { 
    await orderPage.activateOrder();
    activationDate = new Date().toLocaleString();

})

Then(`Order details are updated after activation`, async () => {

    await (await orderPage.detailsTab).click();

    await (await orderPage.successMessage).waitForDisplayed();
    await expect(await (await orderPage.successMessage).getText()).equals(`Order "${order.orderNumber}" was activated.`);

    await browser.waitUntil(async () => 
        {return await (await orderPage.detailFieldnameOut('Status')).getText() === 'Activated'}
    );

    await (await orderPage.detailFieldnameOut('Status')).waitForDisplayed();
    await expect(await (await orderPage.detailFieldnameOut('Status')).getText()).equals('Activated');
    await expect(await (await orderPage.detailFieldnameOut('Activated Date')).getText()).equals(activationDate.slice(0, activationDate.length-3));
    await expect(await (await orderPage.detailLookupfieldOut('Activated By')).getText()).equals(user.username);

})

