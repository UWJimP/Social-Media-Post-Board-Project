import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map, tap } from 'rxjs/operators';

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

    getLatestPosts(amount: number) {
        this.http.get('https://social-media-post-board-data.firebaseio.com/posts.json')
        .subscribe(resData => {
            console.log(resData);
        });
    }

    public fetchLatestPosts() {
/*         return this.http.get<Post[]>
        ('https://social-media-post-board-data.firebaseio.com/posts.json').pipe(
            map(posts => {
                console.log(posts);
                return posts.map(posts => {
                    return 
                });
            }),
            tap(posts => {
                console.log(posts);
            })
        ); */
        return this.http.get<Post[]>
        ('https://social-media-post-board-data.firebaseio.com/posts.json').pipe(
            map(posts => {
                console.log(posts);
                return posts;
            }),
            tap(posts => {
                
            })
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