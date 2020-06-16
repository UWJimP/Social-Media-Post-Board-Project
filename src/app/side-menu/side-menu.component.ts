import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  private userSub: Subscription;
  private profileLink: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.profile.subscribe(resData => {
      //console.log(resData);
      this.profileLink = resData.profileLink;
    });
  }

  onGoHome() {
    this.router.navigate(['/home']);
  }

  onHistory() {
    this.router.navigate([this.profileLink]);
  }

  onGoAbout() {
    this.router.navigate(['/about']);
  }

  onGoSettings() {
    this.router.navigate(['/settings']);
  }

  onLogout() {
    this.authService.logout();
  }

}
