export class Profile {

    public profileLink: string;

    constructor(public first_name: string, public last_name: string, 
        public imagePath: string, public username: string
    ){
        this.profileLink = "/profile/" + username;
    }

}
