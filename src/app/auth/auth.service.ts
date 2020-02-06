
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

export class AuthService {

    /**
     * Sends a http request to sign up the user.
     * 
     * @param first_name The first name of the user.
     * @param last_name The last name of the user.
     * @param email 
     * @param password 
     */
    signup(first_name: string, last_name: string, email: string, password: string) {

    }
}
