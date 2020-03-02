export class User {

    public first_name: string;
    public last_name: string;
    public img_path: string;

    constructor(
        public email: string, 
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date) {
    }

    setProfile(first: string, last: string, image: string){
        this.first_name = first;
        this.last_name = last;
        this.img_path = image;
    }

    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}
