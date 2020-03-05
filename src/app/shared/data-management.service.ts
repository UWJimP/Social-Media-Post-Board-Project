import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class DataManagementService {

    constructor(private http: HttpClient) {}

    storePost(post: Post) {
        this.http.post('https://social-media-post-board-data.firebaseio.com/public/posts.json', post);
    }
}