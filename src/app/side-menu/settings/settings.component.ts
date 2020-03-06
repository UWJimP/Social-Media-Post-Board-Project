import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Profile } from 'src/app/shared/profile.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  profileForm: FormGroup;
  privateForm: FormGroup;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    const authProfile = this.authService.profile.getValue();
    this.profileForm = new FormGroup({
      'first_name': new FormControl(authProfile.first_name, Validators.required),
      'imagePath': new FormControl(authProfile.imagePath, Validators.required),
      'last_name': new FormControl(authProfile.last_name, Validators.required)
    });
  }

  updateProfile(first_name: string, last_name: string, imagePath: string, userId: string) {
    this.authService.updateUserProfile(first_name, last_name, imagePath, userId);
  }
}
