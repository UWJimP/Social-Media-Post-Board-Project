import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Profile } from '../shared/profile.model';
import { Post } from '../shared/post.model';
import { PostBoardService } from '../post-board/post-board.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileSub: Subscription;
  private id: string;
  profile: Profile;
  isLoading: boolean = false;
  posts: Post[];

  constructor(private authService: AuthService, private route: ActivatedRoute,
    private postService: PostBoardService) { }

  ngOnInit() {
    this.posts = [];
    this.initializeProfile();
  }

  private initializeProfile() {
    this.profile = new Profile('', '', '', '');
    this.isLoading = true;
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.authService.getUser(this.id).subscribe(resData => {
          //console.log(resData.user_id);
          this.authService.getUserProfile(resData.user_id).subscribe(resData => {
            //console.log(resData);
            this.profile = resData;
            this.isLoading = false;
          });
          this.initializePosts(this.id);
        });
      }
    );
  }

  private initializePosts(id: string) {
    this.isLoading = true;
    this.postService.fetchPosts().subscribe(resData => 
    {
      const posts: Post[] = resData;
      posts.reverse();
      for(let i = 0; i < posts.length; i++) {
        if(posts[i].username === id) {
          this.posts.push(posts[i]);
        }
      }
      this.isLoading = false;
      console.log(this.posts);
    });
  }



}
