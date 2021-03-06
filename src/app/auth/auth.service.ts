import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Profile } from 'src/app/shared/profile.model';

/**
 * The interface of the Authentication Response Data to be used.
 */
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

    /**
     * User data
     */
    user = new BehaviorSubject<User>(null);

    /**
     * Profile data
     */
    profile = new BehaviorSubject<Profile>(null);

    /**
     * The timer used to tell when the tokne expires.
     */
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
        //const checkDuplicate = this.http.get
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
                const profileData = new Profile(resData.first_name, 
                    resData.last_name, 
                    resData.imagePath,
                    resData.username);
                this.profile.next(profileData);
                //console.log(profileData);
            }, error => {
                 console.log("Error in loginProfile(): " + error);
            }
        );
    }

    /**
     * Logs the user out of their account.
     */
    logout() {
        this.user.next(null);
        this.profile.next(null);
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
            this.logout();}, 
            expirationDuration
        );
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
            last_name:string,
            username: string
        } = JSON.parse(localStorage.getItem('userProfile'));


        const loadedUser = new User(userData.email,
            userData.id, 
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        //console.log(testData);

        let loadedProfile: Profile;
        if(userProfile !== null) {
            console.log("Loaded userProfile")
            loadedProfile = new Profile(userProfile.first_name, 
                userProfile.last_name, userProfile.imagePath, userProfile.username);
            
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
     * @param username User's username. Must be unique.
     * @param userId The user's id.
     */
    updateUserProfile(first_name: string, 
        last_name: string, 
        imagePath: string,
        username: string,
        userId: string) {
        
        const requestLink = "https://social-media-post-board-data.firebaseio.com/users/" +
        userId + "/profile.json";
        //console.log(requestLink);
        const profileData = new Profile(first_name, last_name, imagePath, username);
        let errorMessage: string = "no error";
        this.http.put(requestLink, profileData).subscribe(response => {
                //console.log(response);
                this.profile.next(profileData);
                console.log(this.profile.getValue());
                localStorage.setItem('userProfile', JSON.stringify(profileData));
            }, error => {
                console.log("Error in updateUserProfile");
                console.log(error);
                errorMessage = error;
            }
        );

        return errorMessage;
    }

    /**
     * Add the unique username to the Firebase database.
     * 
     * @param username The username of the user.
     * @param user_id The user id to be stored.
     */
    addUserName(username: string, user_id: string) {
        const requestLink = "https://social-media-post-board-data.firebaseio.com/usernames/"
        + username + ".json";
        const data: {user_id: string} = {user_id: user_id};
        //console.log("Adding user: ");
        //console.log(requestLink);
        //console.log(data);
        this.http.put(requestLink, data).subscribe();
    }

/*     updateUsername(old_username: string, new_username: string, user_id: string) {
        const oldNameLink = "https://social-media-post-board-data.firebaseio.com/usernames/"
        + old_username + ".json";
        const newNameLink = "https://social-media-post-board-data.firebaseio.com/usernames/"
        + new_username + ".json";
        this.http.delete(oldNameLink).subscribe(resData => {

        },
        error => {
            console.log(error);
        });
        this.http.post(newNameLink, user_id).subscribe(resData => {

        },
        error => {
            console.log(error);
        });
    } */

    getUser(username: string) {
        const requestLink = "https://social-media-post-board-data.firebaseio.com/usernames/"
        + username + ".json";
        return this.http.get<{user_id: string}>(requestLink);
    }

    getUserProfile(data: string) {
        const requestLink = "https://social-media-post-board-data.firebaseio.com/users/"
        + data + "/profile.json";
        return this.http.get<Profile>(requestLink);
    }

    /**
     * Checks if the username already exist.
     * 
     * @param username The username needed to be checked.
     * @returns A Promise to return a boolean.
     */
    async checkDuplicateUsername(username: string) {
        const requestlink = "https://social-media-post-board-data.firebaseio.com/usernames/"
        + username + ".json";
        //console.log(requestlink);
        let duplicateFound: boolean = false;

        let test = await this.http.get(requestlink).pipe(tap(resData => {
            //console.log(resData);
            if(resData !== null) {
                duplicateFound = true;
                return true;
            }
            return false;
        }, error => {
            console.log(error);
        })).toPromise();

        //console.log(test);
        //console.log(duplicateFound);
        return duplicateFound;
    }

    /**
     * Handles the authentication.
     * 
     * @param email The email of the user.
     * @param userId The user token id.
     * @param token The session token id.
     * @param expiresIn How long the session last.
     */
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

    /**
     * Handles the http error.
     * 
     * @param errorRes The error response received.
     */
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
