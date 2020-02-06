import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  signupForm: FormGroup;
  errorForm: {first: boolean, last: boolean, email: boolean, password: boolean};

  constructor() { }

  ngOnInit() {
    this.initializeForm();
  }

  /**
   * Initializes the form and the error platform ahead of time.
   */
  private initializeForm() {
    this.signupForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,16}$/)])
    });
    this.errorForm = {first: true, last: true, email: true, password: true};
  }

  /**
   * When the form is submitted, checks for errors.
   */
  onSubmit() {
    //console.log("Submitted");
    if(this.signupForm.valid) {
      //Navigate to the form to the main page upon logging in.
    } else {
      //Display an error message.
      let controls = this.signupForm.controls;
      this.errorForm = {first: controls.first_name.valid, last: controls.last_name.valid,
      email: controls.email.valid, password: controls.password.valid};
    }
    //console.log(this.signupForm.controls.email.valid);
  }

  clickReset() {
    //this.initializeForm();
    this.signupForm.reset();
    this.errorForm = {first: true, last: true, email: true, password: true};
  }
}
