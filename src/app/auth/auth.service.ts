import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    first_name: string;
    last_name: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTime: any;

    constructor(private http: HttpClient) {}

    /**
     * Sends a http request to sign up the user.
     * 
     * @param first_name The first name of the user.
     * @param last_name The last name of the user.
     * @param email The email of the user. Must not already exist.
     * @param password The password of the user.
     * @param imagePath The image URL of the user's image.
     */
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpDn3RoNJ2oHuZwB0KQB29D1QC53u-6jw',
            {email: email, password: password, returnSecureToken: true});
    }

    updateUserProfile(first_name: string, last_name: string, imagePath: string, userId: string) {
        const requestLink = "https://social-media-post-board-data.firebaseio.com/" +
        userId + "/profile.json";
        return this.http.put(requestLink, 
            {
                "first_name": first_name,
                "last_name": last_name,
                "imagePath": imagePath,
            });
    }

    updateUserPrivate(email: string, password: string) {
        
    }
}
