
export class Post {

    //id: number;
    message: string;
    first_name: string;
    last_name: string;
    imagePath: string;
    username: string;
    
/*     constructor(first: string, last: string, imagePath: string, message: string) {
        this.message = message;
        this.first_name = first;
        this.last_name = last;
        this.imagePath = imagePath;
    } */

    constructor(username: string, first: string, last: string, 
        imagePath: string, message: string) 
        {
        //this.id = id;
        this.username = username;
        this.message = message;
        this.first_name = first;
        this.last_name = last;
        this.imagePath = imagePath;
    }
}