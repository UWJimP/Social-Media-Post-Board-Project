import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  signupForm: FormGroup;
  errorForm: {first: boolean, last: boolean, email: boolean, password: boolean, username: boolean};
  isLoading: boolean = false;
  errorMessage: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initializeForm();
  }

  /**
   * Initializes the form and the error platform ahead of time.
   */
  private initializeForm() {
    this.signupForm = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'imagePath': new FormControl("assets/img/j_icon.png", Validators.required),
      'username': new FormControl(null, [Validators.required,
      Validators.pattern(/^\S*$/)]),
      'password': new FormControl(null, [Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,16}$/)])
    });
    this.errorForm = {first: true, last: true, email: true, password: true, username: true};
    //console.log(this.signupForm.controls.imagePath.value);
  }

  /**
   * When the form is submitted, checks for errors.
   */
  onSubmit() {
    //console.log("Submitted");
    if(this.signupForm.valid) {
      //Navigate to the form to the main page upon logging in.
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      this.isLoading = true;
      let duplicateUsername = false;
      this.authService.checkDuplicateUsername(this.signupForm.value.username)
      .then(resData => {
        
        if(resData == null || resData == false) {
          this.authService.signup(email, password).subscribe(resData => {
            this.isLoading = false;
            //console.log(resData);
            this.authService.updateUserProfile(this.signupForm.value.first_name, 
              this.signupForm.value.last_name,
              this.signupForm.value.imagePath,
              this.signupForm.value.username,
              resData.localId
            );
            this.authService.addUserName(this.signupForm.value.username, resData.localId);
            this.router.navigate(['/home']);
          },
          error => {
            console.log("Error signing up: " + error);
            this.errorMessage = error;
            this.isLoading = false;
          });
        } else {
          this.isLoading = false;
          this.errorMessage = "Sorry but, " + this.signupForm.value.username + " is already taken.";
        }

/*         if(resData !== null) {
          duplicateUsername = true;
          //console.log("Username found!");
          if(duplicateUsername){
            this.isLoading = false;
            this.errorMessage = "Sorry but, " + this.signupForm.value.username + " is already taken.";
          }
        } else {
          this.authService.signup(email, password).subscribe(resData => {
            this.isLoading = false;
            //console.log(resData);
            this.authService.updateUserProfile(this.signupForm.value.first_name, 
              this.signupForm.value.last_name,
              this.signupForm.value.imagePath,
              this.signupForm.value.username,
              resData.localId
            );
            this.authService.addUserName(this.signupForm.value.username, resData.localId);
            this.router.navigate(['/home']);
          },
          error => {
            console.log("Error signing up: " + error);
            this.errorMessage = error;
            this.isLoading = false;
          });
        } */
      });
    } else {
      //Display an error message.
      let controls = this.signupForm.controls;
      this.errorForm = {first: controls.first_name.valid, last: controls.last_name.valid,
      email: controls.email.valid, password: controls.password.valid,
      username: controls.username.valid};
      return;
    }
    //console.log(this.signupForm);
  }

  clickReset() {
    //this.initializeForm();
    this.signupForm.reset();
    this.errorForm = {first: true, last: true, email: true, password: true, username: true};
    this.errorMessage = null;
  }

  onCloseAlert() {
    this.errorMessage = null;
  }
}
