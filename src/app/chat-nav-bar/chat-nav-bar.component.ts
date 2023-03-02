import { Component, Inject } from '@angular/core';
import { UsersService } from '../user/users.service';
import { ThreadService } from '../thread/threads.service';
import { MessagesService } from '../message/messages.service';

@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.css'],
})
export class ChatNavBarComponent {}
