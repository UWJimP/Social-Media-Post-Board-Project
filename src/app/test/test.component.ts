import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { TestService } from './test.service';
import { AuthService } from '../auth/auth.service';
import { DataManagementService } from '../shared/data-management.service';
import { PostBoardService } from '../post-board/post-board.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  private data: any = null;

  constructor(private http: HttpClient, private router: Router, private testService: TestService,
    private authService: AuthService, private dataManagement: DataManagementService,
    private postService: PostBoardService) { }

  ngOnInit() {

  }

  testAuthService() {
    let test:boolean = false;
    const found = this.authService.checkDuplicateUsername("AkariZero").then(resData => {
      console.log(resData);
    });
    
    console.log();
  }

  testMe() {
    console.log("Testing data");
    let dataFound = false;
    const requestlink = "https://social-media-post-board-data.firebaseio.com/usernames/JimPhan.json";
    const data = this.http.get(requestlink).subscribe(resdata => {
      console.log(resdata);
      if(resdata !== null) {
        dataFound = true;
        //console.log(dataFound);
      }
    });
    console.log(dataFound);
    //data.unsubscribe();
    return dataFound;
  }

  async testMe3() {
    let response = null;
    await this.testService.testMe().pipe(tap(resData => {
      response = resData;
    })).toPromise();
    console.log(response);
  }

  testCount() {
    //this.dataManagement.testGetNumberChildren();
    //this.dataManagement.getLatestPosts(100);
    /* this.dataManagement.fetchLatestPosts().subscribe(resData => {
      console.log(resData);
    }); */
    this.postService.getPosts();
  }
}
