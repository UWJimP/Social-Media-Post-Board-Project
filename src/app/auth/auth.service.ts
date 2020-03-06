import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Profile } from 'src/app/shared/profile.model';


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
    profile = new BehaviorSubject<Profile>(null);
    private tokenExpirationTimer: any;

    //Subscriptions

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
        //console.log(data);
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
        //console.log(data);
        return data;
    }

    loginProfile(userId: string) {
        //let profileData: Profile;
        //console.log("loginning in profile");
        let profileSub = this.http.get<Profile>(
            'https://social-media-post-board-data.firebaseio.com/users/'
             + userId + '/profile.json').subscribe(resData => {
                //console.log(resData);
                localStorage.setItem('userProfile', JSON.stringify(resData));
                const profileData = new Profile(resData.first_name, resData.last_name, resData.imagePath);
                this.profile.next(profileData);
                //console.log(profileData);
            }, error => {
                 console.log("Error in loginProfile(): " + error);
            }
        );
             
        //console.log(profileData);
        
        //profileSub.unsubscribe();
    }

    /**
     * Logs the user out of their account.
     */
    logout() {
        this.user.next(null);
        this.router.navigate(['/welcome']);
        localStorage.removeItem('userData');
        localStorage.removeItem('userProfile');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    /**
     * A function that sets up the app to determine how much time is left on the user's account.
     * 
     * @param expirationDuration The amount of time left in the session.
     */
    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    /**
     * Uses the local storaged data to log back into the server.
     */
    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return;
        }

        let userProfile: {
            first_name: string, 
            imagePath: string, 
            last_name:string
        } = JSON.parse(localStorage.getItem('userProfile'));


        const loadedUser = new User(userData.email,
             userData.id, 
             userData._token,
             new Date(userData._tokenExpirationDate));
        
    
        
        //console.log(testData);
        let loadedProfile: Profile;
        if(userProfile !== null) {
            console.log("Loaded userProfile")
            loadedProfile = new Profile(userProfile.first_name, 
                userProfile.last_name, userProfile.imagePath);
            
            this.profile.next(loadedProfile);
        }
        //console.log(loadedProfile);
    
        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    /**
     * Updates the user's profile information.
     * 
     * @param first_name User's first name.
     * @param last_name User's last name.
     * @param imagePath User's image url.
     * @param userId The user's id.
     */
    updateUserProfile(first_name: string, 
        last_name: string, 
        imagePath: string, userId: string) {
        
        const requestLink = "https://social-media-post-board-data.firebaseio.com/users/" +
        userId + "/profile.json";
        //console.log(requestLink);
        const profileData = new Profile(first_name, last_name, imagePath);
        this.http.put(requestLink, profileData).subscribe(response => {
                //console.log(response);
                this.profile.next(profileData);
                localStorage.setItem('userProfile', JSON.stringify(profileData));
            }, error => {
                console.log("Error in updateUserProfile");
                console.log(error);
            });
    }

    updateUserPrivate(email: string, password: string) {
        
    }

    setUser() {

    }

    private handleAuthentication(email: string, userId: string, 
        token: string, expiresIn: number) {
            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            const user = new User(email, userId, token, expirationDate);
            //console.log(user);
            this.user.next(user);
            //console.log(this.user.getValue());
            this.autoLogout(expiresIn * 1000);
            localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "Unknown Error occurred";
        //console.log(errorRes.error);
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
