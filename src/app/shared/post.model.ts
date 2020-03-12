
export class Post {

    message: string;
    first_name: string;
    last_name: string;
    imagePath: string;
    
    constructor(first: string, last: string, imagePath: string, message: string) {
        this.message = message;
        this.first_name = first;
        this.last_name = last;
        this.imagePath = imagePath;
    }
}