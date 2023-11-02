import { $, browser } from '@wdio/globals';
import { Key } from 'webdriverio';


export default class Page {

    // APP LAUNCHER locators
    get appLauncher() { return $(`button[class*="salesforceIdentityAppLauncherHeader"]`);}
    get inputSearchApps() { return $(`//input[@placeholder="Search apps and items..."]`)}
    async appOptionInAppLaucher(appName: string){ return $(`//a[@role="option" and @data-label='${appName}']/parent::*`)}
    

    // locator of tab "tabName"
    async tab(tabName: string) { return $(`//a[@title="${tabName}"]/parent::one-app-nav-bar-item-root`)}
    // return span with text of current app
    async actualApplicationName(appName: string) { return await $(`//span[@title="${appName}"]`)}
    

    // locators related to global search
    get globalSearchBtn() {return $(`//button[@aria-label="Search"]`)}
    get globalSearchInput() { return $(`//input[@placeholder="Search..."]`)}
    get globalSearchAreaBtn(){ return $(`//input[@data-value="Search: All"]`)}
    async globalSearchArea(objectType: string) { return $(`//lightning-base-combobox-item[@data-value="FILTER:${objectType}:${objectType}s"]/parent::li`)}

    
    // locators related to user's options 
    get userOptionsBtn() { return $(`//img[@title="User"]/parent::span`)}
    get logOutBtn() { return $(`//a[@href="/secur/logout.jsp"]`)}
    
    
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open (path: string, Id: string = '') {
        return browser.url(`${browser.options.baseUrl}${path}${Id}`)
    }

    /**
     * Goes to specific app
     * @param appName
     */
    async goToAppUsingAppLauncher(appName: string){
        await (await this.appLauncher).click();
        await (await this.inputSearchApps).setValue(appName);
        await (await this.appOptionInAppLaucher(appName)).click();
        await browser.waitUntil(async () => {
            return await (await this.actualApplicationName(appName)).isDisplayed();
            }
        )
    }

    /**
     * Goes to specific tab ex.: Accounts, Contacts etc.
     * @param tabName
     */
    async goToTab(tabName: string) { 
        await( await this.tab(tabName)).click();
    }

    /**
     * Search "term" in global search in specific "area"
     * @param term
     * @param area
     */
    async searchInGlobal(term: string, area: string) { 
        await (await this.globalSearchBtn).click();
        await (await this.globalSearchAreaBtn).click();
        await (await this.globalSearchArea(area)).click();
        await (await this.globalSearchInput).setValue(term);
        await browser.keys(Key.Enter);
        
    }

    /**
     * logout user using options in right up corner of the page
     */
    async logOut() { 
        await (await this.userOptionsBtn).click();
        await (await this.logOutBtn).click();
        
    }


}
