import { $ } from '@wdio/globals';
import Page from './page';


class GlobalSearchResultPage extends Page { 

    async resultsGlobalSearch(object: string) { return await $(`//div[contains(@class,'windowViewMode-normal')]//th[not(@scope="col")]//a[@title='${object}']`)}
    get searchResultsHeader() { return $(`//div[contains(@class,'windowViewMode-normal')]//table`)}
    

}

export default new GlobalSearchResultPage();