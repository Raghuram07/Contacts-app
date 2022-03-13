export class Contact {
    name! :string;
    phone!:string;
    email!:string;
    _id!:string;
}

export class User {
    userName!:string;
    password!:string;
    confirm!:string;
    contacts!: Contact[]
}