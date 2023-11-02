import { Given, Then, When } from '@wdio/cucumber-framework';
import { browser } from '@wdio/globals';
import { accountEdit } from '../data/account.data';
import accountPage from '../pageobjects/account.page';
import contactPage from '../pageobjects/contact.page';
import homePage from '../pageobjects/home.page';
import LoginPage from '../pageobjects/login.page';
import searchResultPage from '../pageobjects/searchResult.page';
import setupPage from '../pageobjects/setup.page';
import tabPage from '../pageobjects/tab.page';

const { expect } = require('chai')

const pages = {
    login: LoginPage,
    home: homePage,
    contact: contactPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open();
    browser.waitUntil(() => browser.execute(
        () => document.readyState === 'complete'),
        {
          timeout: 60 * 1000, // 60 seconds
          timeoutMsg: 'Page hasn\'t been loaded.'
        }
    );
});

Then(/^title of page is equal "(.*)"$/, async (title) => {
    await browser.waitUntil(async () => {
        return await browser.getTitle() === (title);
    })
    expect(await browser.getTitle()).equals(title);
});

Then(/^"(.*)" application is visible$/, async app => {
    await (await setupPage.actualApplicationName(app)).waitForDisplayed();
    expect(await (await setupPage.actualApplicationName(app)).isDisplayed()).equals(true);
});

Given(/I am in (.*) application$/, async (applicationName: string) => {
    await homePage.goToAppUsingAppLauncher(applicationName);
})

Given(/I am on Accounts page$/, async () => {
    let accData = accountEdit;

    await homePage.goToTab('Accounts');
    await tabPage.changeListView('All Accounts');
    await tabPage.goToRecordFromLV(accData.accountName)
    await (await accountPage.recordNameHeader(accData.accountName)).waitForDisplayed()

})


Then(/(.*) named "(.*)" can be found by Gloabl Search$/, async (objectType: string, name: string) => {
    
    await homePage.searchInGlobal(name, objectType);
    await browser.waitUntil(async () => {
        return (await searchResultPage.searchResultsHeader).isDisplayed();
    })
    await expect(await (await searchResultPage.resultsGlobalSearch(name)).getText()).equals(name)
})


When(`I log out`, async () => {
    await homePage.logOut();
})

// Given(/I am on object ".*" with Id ".*"/, async (objectType: string, Id: string) => {
//     await pages[objectType].open(Id);
//     browser.waitUntil(() => browser.execute(
//         () => document.readyState === 'complete'),
//         {
//           timeout: 60 * 1000, // 60 seconds
//           timeoutMsg: 'Page hasn\'t been loaded.'
//         }
//     );
// })

