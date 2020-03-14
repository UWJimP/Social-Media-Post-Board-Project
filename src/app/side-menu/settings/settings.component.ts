import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  privateForm: FormGroup;
  settingMessage: string;
  private resetForm: {'first_name': string, 'last_name': string, 'imagePath': string};

  constructor(private authService: AuthService) { }

  ngOnInit() {
    //console.log("Settings Loaded");
    const authProfile = this.authService.profile.getValue();

    this.profileForm = new FormGroup({
      'first_name': new FormControl(authProfile.first_name, Validators.required),
      'imagePath': new FormControl(authProfile.imagePath, Validators.required),
      'last_name': new FormControl(authProfile.last_name, Validators.required)
    });
    this.settingMessage = null;
  }

  ngOnDestroy() {
    this.settingMessage = null;
    this.profileForm = null;
  }

  updateProfile() {
    const message: string = this.authService.updateUserProfile(this.profileForm.get('first_name').value, 
    this.profileForm.get('last_name').value, 
    this.profileForm.get('imagePath').value, 
    this.authService.user.getValue().id);
    if(message == "no error") {
      this.settingMessage = "Your profile was updated successfully!";
    } else {
      this.settingMessage = message;
    }
  }

  onCloseAlert() {
    this.settingMessage = null;
  }
}
