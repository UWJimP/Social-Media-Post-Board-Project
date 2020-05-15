import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Profile } from '../shared/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileSub: Subscription;
  private id: string;
  profile: Profile;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.authService.getUser(this.id).subscribe(resData => {
          console.log(resData.user_id);
          this.authService.getUserProfile(resData.user_id).subscribe(resData => {
            console.log(resData);
            this.profile = resData;
          });
        });
      }
    );
  }



}
