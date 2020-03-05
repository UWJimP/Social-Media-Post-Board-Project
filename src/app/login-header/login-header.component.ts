import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.css']
})
export class LoginHeaderComponent implements OnInit {

  loginForm: FormGroup;
  isCollasped = false;
  isLoading = false;
  error:string = null;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  login() {
    //console.log(this.loginForm.get("email").value);
    //console.log(this.loginForm.get("password").value);
    if(this.loginForm.invalid) {
      console.log("Form failed.");
      return;
    }
    const email = this.loginForm.get("email").value;
    const password = this.loginForm.get("password").value;
    
    //let authObservable: Observable<AuthResponseData>;
    this.isLoading = true;
    //authObservable = this.authService.login(email, password);
    this.authService.login(email, password).subscribe(resData => {
      //console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/home']);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    });
  }
}
