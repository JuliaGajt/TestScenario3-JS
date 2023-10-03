import { $, browser } from '@wdio/globals';


class LoginPage {

    public get inputUsername () { return $('#username');}

    public get inputPassword () { return $('#password');}
    
    public get btnSubmit () { return $('#Login');}

    
    public async login (username: string, password: string) {
        await (await this.inputUsername).setValue(username);
        await (await this.inputPassword).setValue(password);
        await (await this.btnSubmit).click();
    }

    public open () {
        return browser.url(`https://login.salesforce.com/`)
    }
}

export default new LoginPage();
