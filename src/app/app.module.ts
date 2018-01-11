import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {GoogleMaterialModule} from './google-material/google-material.module';
import { LoginComponent } from './login/login.component';
import {CoreModule} from './core/core.module';
import { MediaElementComponent } from './media-element/media-element.component';
import { Lost404Component } from './lost-404/lost-404.component';
import { JsmpegComponent } from './jsmpeg/jsmpeg.component';
import {JsmpegService} from './jsmpeg/services/jsmpeg.service';
import {HttpClientModule} from '@angular/common/http';
import { NavLinkService } from './services/nav-link.service';
import { MediaElementService } from './media-element/services/media-element.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MediaElementComponent,
    Lost404Component,
    JsmpegComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GoogleMaterialModule,
    CoreModule
  ],
  providers: [ JsmpegService, NavLinkService, MediaElementService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
