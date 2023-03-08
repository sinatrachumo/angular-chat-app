import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from '../app.module';
import { NgModule } from '@angular/core';
import { ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';
import { UsersService } from '../user/users.service';
import { User } from '../user/user.model';
import { ThreadService } from '../thread/threads.service';
import { Thread } from '../thread/thread.model';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatWindowComponent } from './chat-window.component';

class ThreadServiceStub {
  currentThreadMessages: any = {
    subscribe: () => {
      return [
        { id: '1', text: 'Message 1' },
        { id: '2', text: 'Message 2' },
      ];
    },
  };
  currentThread: any = {
    subscribe: () => {},
  };
}

class UserServiceStub {
  currentUser: any = {
    subscribe: () => {},
  };
}

class messagesServiceStub {
  addMessage() {
    return Message;
  }
}

describe('ChatWindowComponent', () => {
  let component: ChatWindowComponent;
  let fixture: ComponentFixture<ChatWindowComponent>;
  let messagesService: jasmine.SpyObj<MessagesService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatWindowComponent, ChatMessageComponent],
      imports: [FormsModule],
      providers: [
        { provide: MessagesService, useClass: messagesServiceStub },
        { provide: ThreadService, useClass: ThreadServiceStub },
        { provide: UsersService, useClass: UserServiceStub },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    fixture.destroy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    component.draftMessage = new Message();
    component.messages = of([]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send message when Send button is clicked', () => {
    const sendButton = fixture.debugElement.query(
      By.css('.input-group-btn')
    ).nativeElement;
    spyOn(component, 'sendMessage');

    sendButton.click();

    expect(component.sendMessage).toHaveBeenCalled();
  });

  it('should add draft message to messages when send message', () => {
    component.draftMessage.text = 'Hello';
    component.sendMessage();

    expect(messagesService.addMessage).toHaveBeenCalledWith(
      jasmine.objectContaining({
        text: 'Hello',
        author: component.currentUser,
        thread: component.currentThread,
        isRead: true,
      })
    );
  });

  it('should scroll to bottom of message container when messages are loaded', () => {
    const scrollPane: any = fixture.debugElement.query(
      By.css('.msg-container-base')
    ).nativeElement;
    spyOn(scrollPane, 'scrollTo');

    component.messages = of([
      { id: '1', text: 'Message 1' },
      { id: '2', text: 'Message 2' },
    ]);
    fixture.detectChanges();

    expect(scrollPane.scrollTo).toHaveBeenCalledWith(
      0,
      scrollPane.scrollHeight
    );
  });
});
