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
import { HttpClientModule } from '@angular/common/http';
import { FrontPageComponent } from './front-page/front-page.component';
import { DropdownDirective } from 'src/shared/dropdown.directive';
import { AppRoutingModule } from 'src/app-routing.module';

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
    LoginHeaderComponent,
    FrontPageComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [PostBoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
