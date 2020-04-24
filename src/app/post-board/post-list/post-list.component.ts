import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../shared/post.model';
import { Subscription } from 'rxjs';
import { PostBoardService } from '../post-board.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postSub: Subscription;

  constructor(private postService: PostBoardService) { }

  ngOnInit() {
    //Create a subscription from the post service to gather existing posts.
    //this.posts = this.postService.ge

/*     this.postSub = this.postService.fetchPosts().subscribe(resData => {
      const posts: Post[] = resData;
      posts.reverse();
      this.posts = posts.slice();
    }); */
    this.postSub = this.postService.getSubscription().subscribe(posts => {
      this.posts = posts.slice();
    });
    this.postService.getPosts();
  }

  ngOnDestroy() {
    //Unsubscribe when no longer necessary.
    this.postSub.unsubscribe();
  }

}
