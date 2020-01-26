import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostBoardComponent } from './post-board/post-board.component';
import { PostItemComponent } from './post-board/post-list/post-item/post-item.component';
import { PostInputComponent } from './post-board/post-input/post-input.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { PostListComponent } from './post-board/post-list/post-list.component';
import { PostBoardService } from './post-board/post-board.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PostBoardComponent,
    PostItemComponent,
    PostInputComponent,
    SideMenuComponent,
    HeaderComponent,
    AuthComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  providers: [PostBoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
