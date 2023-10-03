import { Then, When } from '@wdio/cucumber-framework';
const { expect } = require('chai')

import { default as LoginPage, default as loginPage } from '../pageobjects/login.page';


When('I login with username', async () => {

    let username = process.env.USERNAME_LOGIN
    let password = process.env.PASSWORD_LOGIN
    
    if(username !== undefined && password !== undefined){
        await LoginPage.login(username, password)
    } else {
        throw new Error(`Check if username and password are set in .env file.`)
    }
    
});


Then(`login page is displayed`, async ()=> {
    await (await loginPage.inputUsername).waitForDisplayed()
    expect(await (await loginPage.inputUsername).isDisplayed()).equals(true);
    expect(await (await loginPage.inputPassword).isDisplayed()).equals(true);
})