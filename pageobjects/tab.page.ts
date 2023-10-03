import { $ } from '@wdio/globals';
import Page from './page';


class TabPage extends Page { 

    // locators related to list views 
    get showListViewsBtn(){ return $(`div[data-aura-class="forceListViewPicker"]`)}
    async listViewOption(listViewName: string) { return $(`//span[.='${listViewName}']/parent::a`)}
    
    // record locator with specific name
    async goToRecordFromListViewBtn(recordName: string) { return $(`a[title="${recordName}"]`)}

    /**
     * Change list view to different with specific name
     * @param listViewName 
     */
    async changeListView(listViewName: string){
        await (await this.showListViewsBtn).click();
        await (await this.listViewOption(listViewName)).click();
    }

    /**
     * Goes to specific record from List view
     * @param recordName 
     */
    async goToRecordFromLV(recordName: string){
        await (await this.goToRecordFromListViewBtn(recordName)).click();
        // await (await this.recordNameHeader(recordName)).waitForDisplayed()
    }

}

export default new TabPage();