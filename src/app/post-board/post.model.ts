import { User } from '../auth/user.model';

export class Post {

    message: string;
    first_name: string;
    last_name: string;
    
    constructor(first: string, last: string, message: string) {
        this.message = message;
        this.first_name = first;
        this.last_name = last;
    }
}