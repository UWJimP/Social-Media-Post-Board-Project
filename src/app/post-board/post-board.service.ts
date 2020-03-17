import { Subject } from 'rxjs';
import { Post } from '../shared/post.model';

export class PostBoardService {

    private postBoardChanged = new Subject<Post[]>();
    private posts: Post[] = [
        new Post("Jim", "P", "assets/img/j_icon.png", "Test message."),
        new Post("Ja123456", "A12456", "assets/img/j_icon.png", "Test message 2. This is a much longer message to test.")
    ];

    constructor(){}

    getPosts() {
        return this.posts.slice();
    }

    addPost(post: Post) {
        this.posts.unshift(post);
        this.postBoardChanged.next(this.posts.slice());
    }

    public getSubscription() {
        return this.postBoardChanged;
    }
}
