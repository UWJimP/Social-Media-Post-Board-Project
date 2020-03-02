import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { Profile } from 'src/shared/profile.model';


export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    /**
     * Sends a http request to sign up the user.
     * 
     * @param email The email of the user. Must not already exist.
     * @param password The password of the user.
     * @returns An observable with information of the user signed up.
     */
    signup(email: string, password: string) {
        const data = this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpDn3RoNJ2oHuZwB0KQB29D1QC53u-6jw',
            {email: email, password: password, returnSecureToken: true})
        .pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, 
                resData.idToken, +resData.expiresIn);
        }));
        console.log(data);
        return data;
    }

    /**
     * Logging into an account.
     * 
     * @param email The email of the user.
     * @param password The password of the user.
     */
    login(email: string, password: string) {
        const data = this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpDn3RoNJ2oHuZwB0KQB29D1QC53u-6jw',
        {
            email: email, 
            password: password, 
            returnSecureToken: true
            
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, 
                resData.localId, resData.idToken, +resData.expiresIn);
        }));
        console.log(data);
        return data;
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/welcome']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    updateUserProfile(first_name: string, 
        last_name: string, 
        imagePath: string, userId: string) {
        
        const requestLink = "https://social-media-post-board-data.firebaseio.com/users/" +
        userId + "/profile.json";
        console.log(requestLink);
        this.http.put(requestLink, 
            new Profile(first_name,
                last_name,
                imagePath)).subscribe(response => {
                console.log(response);
            });
/*             this.http.put(requestLink, new TestData(first_name, last_name, imagePath)
                ).subscribe(response => {
                    console.log(response);
                }); */
    }

    updateUserPrivate(email: string, password: string) {
        
    }

    private handleAuthentication(email: string, userId: string, 
        token: string, expiresIn: number) {
            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            const user = new User(email, userId, token, expirationDate);
            //console.log(user);
            this.user.next(user);
            this.autoLogout(expiresIn * 1000);
            localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "Unknown Error occurred";
        console.log(errorRes.error);
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "This email already exists";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "This email does not exist";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "Invalid Password";
                break;
        }
        return throwError(errorMessage);
    }
}
