import { $ } from '@wdio/globals';
import Page from './page';

export default class ObjectPage extends Page { 

    // Name of record
    async recordNameHeader(name: string) { return $(`//lightning-formatted-text[text()='${name}']`)}
    
    // Account in "Edit mode"
    // dropdown fields
    async dropdownButton(fieldName: string){ return $(`//button[contains(@aria-label, "${fieldName}")]/parent::div`)}
    async dropdownOption(option: string){ return $(`//lightning-base-combobox-item[@data-value="${option}"]`)}
    // input fields
    async inputField(fieldName: string){ return $(`//input[@name="${fieldName}"]`)}
    // input lookup fields
    async inputLookupField(fieldName: string){ return $(`//label[text()='${fieldName}']/following-sibling::div//input`)}
    async optionLookup(option: string) { return await $(`//lightning-base-combobox-formatted-text[@title="${option}"]/parent::span/parent::span/parent::lightning-base-combobox-item/parent::li`)}
    get clearLookupSelection() { return $(`//button[@title="Clear Selection"]`)}


    // edit Acc button on header
    get editObjBtn() { return $(`//li[contains(@data-target-selection-name,".Edit")]`)}
    // save changes on form
    get saveEdit() { return $(`//button[@name="SaveEdit"]`)}
    // success message of editing account, creating contatc etc.
    get successMessage() { return $(`//span[contains(@class, 'toastMessage')]`)}


    // tabs on Account object
    get detailsTab() { return $(`//div[contains(@class,"windowViewMode-normal")]//a[@id='detailTab__item']`)}
    get relatedTab() { return $(`//div[contains(@class,"windowViewMode-normal")]//a[@id='relatedListsTab__item']`)}


    // content of fields in details tab
    async detailFieldnameOut(fieldName: string) { return $(`//span[text()='${fieldName}']/parent::div/following-sibling::div/span/slot[@name='outputField']/*[@data-output-element-id="output-field"]`)}
    async detailLookupfieldOut(fieldName: string) { return $(`//span[text()='${fieldName}']/parent::div/following-sibling::div/span/slot[@name='outputField']//span[not(@class)]`)}


}
