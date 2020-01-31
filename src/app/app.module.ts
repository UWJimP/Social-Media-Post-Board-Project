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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginHeaderComponent } from './login-header/login-header.component';

@NgModule({
  declarations: [
    AppComponent,
    PostBoardComponent,
    PostItemComponent,
    PostInputComponent,
    SideMenuComponent,
    HeaderComponent,
    AuthComponent,
    PostListComponent,
    LoginHeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [PostBoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
