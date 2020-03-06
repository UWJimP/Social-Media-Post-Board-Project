import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Profile } from 'src/app/shared/profile.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  profileForm: FormGroup;
  privateForm: FormGroup;
  profileData: Profile;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    const authProfile = this.authService.profile;
    //console.log(authProfile);
    this.profileForm = new FormGroup({
      'first_name': new FormControl(null),
      'imagePath': new FormControl(null),
      'last_name': new FormControl(null)
    });
  }

}
