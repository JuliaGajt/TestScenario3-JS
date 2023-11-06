import { Product } from "./quote.data";

type Order = { 
    orderNumber: string,
    accountName: string,
    orderAmount: string,
    activatedDate: string,
    activatedBy: string,
    status: string,
    orderStartDate: string,
    orderEndDate: string,
    orderType: string,
    opportunityName: string,
    quoteNumber: string,
    orderId: string,
    products: Array<Product>

}


export let order: Order = { 
    orderNumber: '',
    accountName: 'Burlington Textiles Corp of America',
    orderAmount:'0,00 zł',
    activatedDate: '',
    activatedBy: '',
    status: 'Draft',
    orderStartDate: new Date().toLocaleDateString(),
    orderEndDate: '',
    orderType: 'New',
    opportunityName: 'Test Opp',
    quoteNumber: '',
    orderId: '',
    products: []
    
}

export default Order;