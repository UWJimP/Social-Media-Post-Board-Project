import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TestService {

    data: any;

    constructor(private http: HttpClient){}

    testMe2() {
        //let data = null;
        return this.subscription().pipe(tap(resData => {
          this.data = resData;
        }));
        //console.log(data);
    }

    testMe() {
        return this.subscription();
    }

    private subscription() {
        const requestlink = "https://social-media-post-board-data.firebaseio.com/usernames/JimPhan.json";
        return this.http.get(requestlink);
    }
}