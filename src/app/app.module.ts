import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostBoardComponent } from './post-board/post-board.component';
import { PostItemComponent } from './post-board/post-item/post-item.component';
import { PostInputComponent } from './post-board/post-input/post-input.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PostBoardComponent,
    PostItemComponent,
    PostInputComponent,
    SideMenuComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
