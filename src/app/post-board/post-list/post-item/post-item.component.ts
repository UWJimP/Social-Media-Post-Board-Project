import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/shared/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  @Input() post: Post;
  @Input() index: number;

  constructor(private route: Router) {}

  ngOnInit() {
    //this.profileLink = '/profile/' + this.post.username;
  }

  onNameClick() {
    console.log(this.post.first_name + " " + this.post.last_name + " was clicked.");
    const link: string = '/profile/' + this.post.username;
    console.log(link);
    this.route.navigate([link]);
  }

}
