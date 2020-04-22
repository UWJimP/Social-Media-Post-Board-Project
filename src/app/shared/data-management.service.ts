import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class DataManagementService {

    constructor(private http: HttpClient) {}

    storePost(post: Post) {
        this.http.get('https://social-media-post-board-data.firebaseio.com/posts/count_id.json')
        .subscribe(resData => {
            const countId: number = +resData + 1;
            this.http.post('https://social-media-post-board-data.firebaseio.com/posts' 
            + countId + '.json', post);
        });
    }

    getPost(post_id: number) {
        this.http.get('https://social-media-post-board-data.firebaseio.com/posts' 
        + post_id + '.json').subscribe(
            resData => {
                console.log(resData);
            }
        );
    }

    testGetNumberChildren() {
        this.http.get('https://social-media-post-board-data.firebaseio.com/posts/count_id.json')
        .subscribe(resData => {
            console.log(resData);
            const updateCount: number = +resData + 1;
            this.http.put('https://social-media-post-board-data.firebaseio.com/posts/count_id.json', updateCount).subscribe();
            this.http.put('https://social-media-post-board-data.firebaseio.com/posts/' + updateCount + '.json', {'message': "test"}).subscribe();
        });
    }
}