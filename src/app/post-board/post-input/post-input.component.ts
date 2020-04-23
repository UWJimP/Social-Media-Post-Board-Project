import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../shared/post.model';
import { PostBoardService } from '../post-board.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Profile } from 'src/app/shared/profile.model';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.css']
})
export class PostInputComponent implements OnInit {

  //message: string;
  postForm: FormGroup;
  formTouched = false;
  //defaultMessage = "Please enter a post message."
  profile: Profile;

  constructor(private postService: PostBoardService, private authService: AuthService) { }

  ngOnInit() {
    this.initialForm();
    this.profile = this.authService.profile.getValue();
  }

  /**
   * Initialize the message box.
   */
  private initialForm() {
    //this.message = "";
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
/*     const post = new Post(this.profile.first_name, this.profile.last_name,
      this.profile.imagePath, this.postForm.value.message); */
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
