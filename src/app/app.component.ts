import { Component } from '@angular/core';
import { UsersService } from './user/users.service';
import { ThreadService } from './thread/threads.service';
import { MessagesService } from './message/messages.service';
import { ChatExampleData } from './chat-example-data/chat-example-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public messagesService: MessagesService,
    public threadsService: ThreadService,
    public usersService: UsersService
  ) {
    ChatExampleData.init(messagesService, threadsService, usersService);
  }
}
