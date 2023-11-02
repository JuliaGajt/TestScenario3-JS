import { Given, Then, When } from '@wdio/cucumber-framework';
import { browser } from '@wdio/globals';
const { expect } = require('chai')
const pactum = require("pactum");
let username = process.env.USERNAME_LOGIN
let password = process.env.PASSWORD_LOGIN
    
import { default as LoginPage, default as loginPage } from '../pageobjects/login.page';


When('I login with username', async () => {
    await LoginPage.login(username, password)    
});


Then(`login page is displayed`, async ()=> {
    await (await loginPage.inputUsername).waitForDisplayed()
    expect(await (await loginPage.inputUsername).isDisplayed()).equals(true);
    expect(await (await loginPage.inputPassword).isDisplayed()).equals(true);
})


Given("I am logged to Salesforce", async () => {
    await LoginPage.open()
    await LoginPage.login(username, password);
    browser.waitUntil(() => browser.execute(
        () => document.readyState === 'complete'),
        {
          timeout: 60 * 1000, // 60 seconds
          timeoutMsg: 'Page hasn\'t been loaded.'
        }
    );
})
