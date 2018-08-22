import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostsService } from "./services/posts.service";
import { PostsComponent } from './components/posts/posts.component';
import { CommentsService } from "./services/comments.service";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule}  from "@angular/forms";
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }