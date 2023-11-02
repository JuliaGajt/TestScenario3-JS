import { $, browser } from '@wdio/globals';


class LoginPage {

    public get inputUsername () { return $('#username');}

    public get inputPassword () { return $('#password');}
    
    public get btnSubmit () { return $('#Login');}

    
    public async login (username: string | undefined, password: string | undefined) {

        if(username !== undefined && password !== undefined){
            await (await this.inputUsername).setValue(username);
            await (await this.inputPassword).setValue(password);
            await (await this.btnSubmit).click();
        } else {
            throw new Error(`Check if username and password are set in .env file.`)
        }
    }

    public open () {
        return browser.url(`https://login.salesforce.com/`)
    }
}

export default new LoginPage();
