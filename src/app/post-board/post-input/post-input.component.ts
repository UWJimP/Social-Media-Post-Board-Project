import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.css']
})
export class PostInputComponent implements OnInit {

  message: string;
  postForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initialForm();
  }

  /**
   * Initialize the message box.
   */
  private initialForm() {
    let message = "Please enter a message."
    this.postForm = new FormGroup({
      message: new FormControl(message)
    });
  }

  /**
   * Used when the user clicks in the message box.
   * It will clear the message box.
   */
  onMessageClick() {
    this.message = "";
    this.postForm = new FormGroup({
      message: new FormControl(this.message)
    });
  }
}
