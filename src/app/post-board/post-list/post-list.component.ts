import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
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
    this.posts = this.postService.getPosts();
    this.postSub = this.postService.getSubscription().subscribe((posts: Post[]) =>{
      //console.log(posts);
      this.posts = posts.slice();
    });
    //console.log(this.posts);
  }

  ngOnDestroy() {
    //Unsubscribe when no longer necessary.
    this.postSub.unsubscribe();
  }

}
