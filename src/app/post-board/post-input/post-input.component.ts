import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../shared/post.model';
import { PostBoardService } from '../post-board.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Profile } from 'src/app/shared/profile.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.css']
})
export class PostInputComponent implements OnInit {

  postForm: FormGroup;
  formTouched = false;
  profile: Profile;
  profileSub:Subscription;
  defaultMessage: string;

  constructor(private postService: PostBoardService, private authService: AuthService) { }

  ngOnInit() {
    this.initialForm();
    //this.profile = this.authService.profile.getValue();
    //this.pro
    this.profileSub = this.authService.profile.subscribe(profile => 
    {
      this.profile = profile;
    });
    this.defaultMessage = "Enter a message";
  }

  /**
   * Initialize the message box.
   */
  private initialForm() {
    this.postForm = new FormGroup({
      message: new FormControl("", Validators.required)
    });
    this.formTouched = false;
  }

  /**
   * Used when the user press enter while entering a message.
   * It will reset the box and send the message to the Post Service.
   */
  onMessageEnter(event) {
    const post = new Post(this.profile.username,
      this.profile.first_name,
      this.profile.last_name, 
      this.profile.imagePath, 
      this.postForm.value.message
    );
    event.target.blur(); //Remove focus from the text area.
    this.postService.addPost(post);
    this.initialForm();
  }
}
