import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from '../user/users.service';
import { ThreadService } from '../thread/threads.service';
import { MessagesService } from '../message/messages.service';
import { combineLatest } from 'rxjs/operators';
import * as _ from 'lodash';

import { Thread } from '../thread/thread.model';
import { Message } from '../message/message.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.css'],
})
export class ChatNavBarComponent implements OnInit {
  unreadMessagesCount: number | any;

  constructor(
    public messagesService: MessagesService,
    public threadsService: ThreadService,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.messagesService.messages
      .pipe(
        combineLatest(
          this.threadsService.currentThread,
          (messages, currentThread) => [currentThread, messages]
        )
      )
      // .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
      .subscribe(([currentThread, messages]: any) => {
        this.unreadMessagesCount = _.reduce(
          messages,
          (sum, message) => {
            const messageIsInCurrentThread: boolean =
              message.thread &&
              currentThread &&
              currentThread.id === message.thread.id;

            if (message && !message.isRead && !messageIsInCurrentThread) {
              sum++;
            }
            return sum;
          },
          0
        );
      });
  }
}
