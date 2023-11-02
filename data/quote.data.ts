export type Product = { 
    productName: string,
    productCode: string
}

type Quote = { 
    ifPrimary: boolean,
    startDate: string,
    endDate: string,
    priceBookName: string,
    products: Array<Product>,
    quoteId: string
}

let date: Date = new Date();

export let quote: Quote = { 
    ifPrimary: true,
    startDate: date.toLocaleDateString(),
    endDate:  new Date(date.setDate(date.getDate() + 14)).toLocaleDateString(),
    priceBookName: "Standard Price Book",
    products: [
        {productCode: "5KWHBATTERY", productName: '5kWh Battery'},
        {productCode: "ACCIDENTINSURANCE", productName: 'Accidental Damage Insurance'},
        {productCode: "ACTOUSBCADAPTER", productName: 'AC to USB-C Wall Adapter'},
        {productCode: "ADMINHOUR", productName: 'Admin Hour'}
    ],
    quoteId: ''
};


export default Quote;

