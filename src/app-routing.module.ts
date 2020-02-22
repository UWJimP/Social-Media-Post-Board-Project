import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { PostBoardComponent } from './app/post-board/post-board.component';
import { AuthGuard } from './app/auth/auth.guard';
import { AuthComponent } from './app/auth/auth.component';
import { FrontPageComponent } from './app/front-page/front-page.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/welcome', pathMatch: 'full'},
    {path: 'welcome', component: FrontPageComponent},
    {path: 'signup', component: AuthComponent},
    {path: 'home', 
    component: PostBoardComponent, 
    canActivate:[AuthGuard]
    },
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
