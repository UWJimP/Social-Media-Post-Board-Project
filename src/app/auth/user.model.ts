export class User {

    email: string;
    first_name: string;
    last_name: string;
    img_path: string;

    constructor(first: string, last: string, email: string, img_path: string){
        this.first_name = first;
        this.last_name = last;
        this.email = email;
        this.img_path = img_path;
    }
}