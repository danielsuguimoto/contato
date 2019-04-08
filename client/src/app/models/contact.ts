export class Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    twitter: string;
    skype: string;
    photo: any;

    constructor() {
        this.firstName =
        this.lastName =
        this.email =
        this.phoneNumber =
        this.twitter =
        this.skype = '';
    }
}
