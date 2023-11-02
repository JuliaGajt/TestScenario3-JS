
type Contact = {
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
}

export let contact: Contact = {
    firstName: 'test',
    lastName: 'auto',
    homePhone: '123123123',
    mobile: '234234234',
    otherPhone: '345345345',
    email: 'test@gmail.com',
    assistant: 'person',
    asstPhone: '456456456',
    title: 'title',
    department: 'deprartment',
    birthdate: '11.11.1991',
    salutation: 'Ms.',
    reportsTo: 'Jack Rogers',
    leadSource: 'Web'
};

export default Contact;
