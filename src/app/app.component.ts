import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { Profile } from './shared/profile.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  title = 'social-media-post-board';
  isAuthenicated = false;
  profileData: Profile = null;
  userSub: Subscription;
  profileSub: Subscription;

  constructor(private authService: AuthService){}

  ngOnInit() {
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenicated = !user ? false: true;
    });
    this.profileSub = this.authService.profile.subscribe(profile => 
    {
      this.profileData = profile;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
