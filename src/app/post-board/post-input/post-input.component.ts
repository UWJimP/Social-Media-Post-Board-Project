import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.model';
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

  constructor(private postService: PostBoardService) { }

  ngOnInit() {
    this.initialForm();
  }

  formValid() {
    return this.postForm.valid && this.formTouched;
  }

  /**
   * Initialize the message box.
   */
  private initialForm() {
    let message = "Please enter a message."
    this.postForm = new FormGroup({
      message: new FormControl(message, Validators.required)
    });
    this.formTouched = false;
  }

  /**
   * Used when the user clicks in the message box.
   * It will clear the message box.
   */
  onMessageClick() {
    this.message = "";
    this.postForm = new FormGroup({
      message: new FormControl(this.message, Validators.required)
    });
    this.formTouched = true;
  }

  /**
   * Used when the user press enter while entering a message.
   * It will reset the box and send the message to the Post Service.
   */
  onMessageEnter(event) {
    const post = new Post("First", "Last", this.postForm.value.message);
    event.target.blur(); //Remove focus from the text area.
    this.postService.addPost(post);
    //console.log("Enter key was pressed");
    //this.postForm.reset();
    this.initialForm();
  }
}
