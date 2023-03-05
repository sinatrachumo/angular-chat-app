import { Component, OnInit, Input, Inject } from '@angular/core';
import { UsersService } from '../user/users.service';
import { ThreadService } from '../thread/threads.service';
import { MessagesService } from '../message/messages.service';
import { Message } from '../message/message.model';
import { User } from '../user/user.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
})
export class ChatMessageComponent implements OnInit {
  @Input()
  message: Message | any;
  currentUser: User | any;
  incoming: boolean | any;

  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.currentUser.subscribe((user) => {
      this.currentUser = user;
      if (this.message.author && user) {
        this.incoming = this.message.author.id !== user.id;
      }
    });
  }
}
