import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../shared/post.model';
import { PostBoardService } from '../post-board.service';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.css']
})
export class PostInputComponent implements OnInit {

  message: string;
  postForm: FormGroup;
  formTouched = false;
  defaultMessage = "Please enter a post message."

  constructor(private postService: PostBoardService) { }

  ngOnInit() {
    this.initialForm();
  }

  /**
   * Initialize the message box.
   */
  private initialForm() {
    this.message = "";
    this.postForm = new FormGroup({
      message: new FormControl(this.message, Validators.required)
    });
    this.formTouched = false;
  }

  /**
   * Used when the user press enter while entering a message.
   * It will reset the box and send the message to the Post Service.
   */
  onMessageEnter(event) {
    const post = new Post("First", "Last", this.postForm.value.message);
    event.target.blur(); //Remove focus from the text area.
    this.postService.addPost(post);
    this.initialForm();
  }
}
