
export class Contact {
    firstName: string;
    lastName: string;
    homePhone: string;
    mobile: string;
    otherPhone: string;
    email: string;
    assistant: string;
    asstPhone: string;
    title: string;
    department: string;
    birthdate: string;
    salutation: string;
    reportsTo: string;
    leadSource: string;

    constructor(    
        firstName: string,
        lastName: string,
        homePhone: string,
        mobile: string,
        otherPhone: string,
        email: string,
        assistant: string,
        asstPhone: string,
        title: string,
        department: string,
        birthdate: string,
        salutation: string,
        reportsTo: string,
        leadSource: string){
            this.firstName= firstName;
            this.lastName= lastName;
            this.homePhone= homePhone;
            this.mobile= mobile;
            this.otherPhone= otherPhone;
            this.email= email;
            this.assistant= assistant;
            this.asstPhone= asstPhone;
            this.title= title;
            this.department= department;
            this.birthdate= birthdate;
            this.salutation= salutation;
            this.reportsTo= reportsTo;
            this.leadSource= leadSource;
        }
}

export default new Contact(
    'test',
    'auto',
    '123123123',
    '234234234',
    '345345345',
    'test@gmail.com',
    'person',
    '456456456',
    'title',
    'deprartment',
    '11.11.1991',
    'Ms.',
    'Jack Rogers',
    'Web');