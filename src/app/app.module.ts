import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
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
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { FormsModule } from '@angular/forms';
import { FromNowPipe } from './pipes/from-now.pipe';
import { ChatPageComponent } from './chat-page/chat-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatThreadComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    ChatMessageComponent,
    FromNowPipe,
    ChatPageComponent,
    ChatNavBarComponent,
    FromNowPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    UsersService,

    userServiceInjectables,
    MessagesService,
    ThreadService,
  ],
  exports: [ChatNavBarComponent, FromNowPipe, ChatPageComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
