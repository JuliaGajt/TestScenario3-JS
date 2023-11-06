import { Product } from "./quote.data";

type Opportunity = {
    accountName: string,
    accountID: string,
    contactName: string,
    contactID: string,
    opportunityName: string,
    closeDate: Date,
    stage: string,
    probability: string,
    opportunityOwner: string,
    priceBookId: string,
    opportunityId: string,
    products: Array<Product>,
    quoteNumber: string
}

enum Probability {
    "--None--" = "0%",
    "Prospecting" = "10%",
    "Qualification" = "10%",
    "Needs Analysis" = "20%",
    "Value Proposition" = "50%",
    "Id. Decision Makers" = "60%", 
    "Perception Analysis" = "70%",
    "Proposal/Price Quote" = "75%",
    "Negotiation/Review" = "90%",
    "Closed Won" = "100%",
    "Closed Lost" = "0%"
}


let date = new Date();

export let opp: Opportunity = { 
    accountName: 'Burlington Textiles Corp of America',
    accountID: '0010600002Dl77WAAR',
    contactName: 'Jack Rogers',
    contactID: '0030600002ChzXeAAJ',
    opportunityName: "Test Opp",
    closeDate: new Date(date.setDate(date.getDate() + 14)),
    stage: "Qualification",
    probability: Probability["Qualification"],
    opportunityOwner: 'Julia Gajtkowska',
    priceBookId: '01s06000006fOJKAA2',
    opportunityId: "",
    products: [],
    quoteNumber: ''
}



export default Opportunity;
