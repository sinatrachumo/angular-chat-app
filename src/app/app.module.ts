import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesService } from './message/messages.service';
import { ThreadService } from './thread/threads.service';
import { userServiceInjectables, UsersService } from './user/users.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    UsersService,
    userServiceInjectables,
    MessagesService,
    ThreadService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
