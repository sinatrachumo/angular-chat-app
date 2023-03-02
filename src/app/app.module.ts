import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesService } from './message/messages.service';
import { ThreadService } from './thread/threads.service';
import { userServiceInjectables, UsersService } from './user/users.service';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatExampleData } from './chat-example-data/chat-example-data';

@NgModule({
  declarations: [AppComponent, ChatThreadComponent, ChatThreadsComponent],
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
