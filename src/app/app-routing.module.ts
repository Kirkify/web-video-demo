import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component';
import {MediaElementComponent} from './media-element/media-element.component';
import {Lost404Component} from './lost-404/lost-404.component';
import {JsmpegComponent} from './jsmpeg/jsmpeg.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'media-element',
    component: MediaElementComponent
  },
  {
    path: 'jsmpeg',
    component: JsmpegComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: Lost404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
