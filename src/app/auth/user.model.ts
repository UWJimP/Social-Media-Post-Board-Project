export class User {

    constructor(public first: string,
        public last: string, 
        public email: string, 
        public img_path: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date) {
    }

    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}
