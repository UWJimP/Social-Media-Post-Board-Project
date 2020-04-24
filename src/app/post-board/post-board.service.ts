import { Subject, Subscription } from 'rxjs';
import { Post } from '../shared/post.model';
import { OnInit, OnDestroy, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataManagementService } from '../shared/data-management.service';
import { HttpClient } from '@angular/common/http';

interface CountId {
    count_id: number;
}

@Injectable()
export class PostBoardService implements OnInit, OnDestroy {

    private postBoardChanged = new Subject<Post[]>();
    private posts: Post[] = [];
    private dataPosts: Subscription;

    constructor(private dataManage: DataManagementService, private http: HttpClient){}

    ngOnInit() {
        
    }

    ngOnDestroy() {
        this.dataPosts.unsubscribe();
    }

    getPosts() {
        this.http.get<Post[]>
        ('https://social-media-post-board-data.firebaseio.com/posts.json')
        .subscribe(
            resData => {
                const posts: Post[] = resData;
                posts.reverse();
                this.posts = posts;
                this.postBoardChanged.next(this.posts.slice());
            }
        );
    }

    fetchPosts() {
        return this.http.get<Post[]>
        ('https://social-media-post-board-data.firebaseio.com/posts.json');
    }

    addPost(post: Post) {
        //this.posts.unshift(post);
        //this.postBoardChanged.next(this.posts.slice());
        
        this.http.get('https://social-media-post-board-data.firebaseio.com/post_data/count_id.json')
        .subscribe(resData => {
            //console.log(resData);
            const id: number = +resData + 1;
            this.http.put('https://social-media-post-board-data.firebaseio.com/post_data/count_id.json', id)
            .subscribe();
            this.http.put('https://social-media-post-board-data.firebaseio.com/posts/' + id + '.json',
            post).subscribe(resData => {
                this.getPosts();
            });
        });
    }

    public getSubscription() {
        return this.postBoardChanged;
    }
}
