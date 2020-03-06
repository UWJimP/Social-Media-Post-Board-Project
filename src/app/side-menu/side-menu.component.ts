import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onGoHome() {
    this.router.navigate(['/home']);
  }

  onGoSettings() {
    this.router.navigate(['/settings']);
  }

  onLogout() {
    this.authService.logout();
  }

}
