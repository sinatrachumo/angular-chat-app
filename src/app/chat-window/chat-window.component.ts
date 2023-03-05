import { Component, OnInit, ElementRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';
import { UsersService } from '../user/users.service';
import { User } from '../user/user.model';
import { ThreadService } from '../thread/threads.service';
import { Thread } from '../thread/thread.model';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent implements OnInit {
  messages: Observable<any> | any;
  currentThread: Thread | any;
  draftMessage: Message | any;
  currentUser: User | any;

  constructor(
    public messagesService: MessagesService,
    public threadsService: ThreadService,
    public usersService: UsersService,
    public el: ElementRef
  ) {}
  ngOnInit(): void {
    this.messages = this.threadsService.currentThreadMessages;
    this.threadsService.currentThreadMessages.subscribe();
    this.draftMessage = new Message();
    this.threadsService.currentThread.subscribe(
      (thread) => (this.currentThread = thread)
    );

    this.usersService.currentUser.subscribe(
      (user) => (this.currentUser = user)
    );

    this.messages.subscribe((messages: any) =>
      setTimeout(() => this.scrollToBottom())
    );
  }
  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }
  sendMessage(): void {
    const message: Message = this.draftMessage;
    message.author = this.currentUser;
    message.thread = this.currentThread;
    message.isRead = true;
    this.messagesService.addMessage(message);
    this.draftMessage = new Message();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector(
      '.msg-container-base'
    );
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }
}
