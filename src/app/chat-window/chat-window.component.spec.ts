import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from '../app.module';
import { NgModule } from '@angular/core';
import { ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { defer, EMPTY, Observable, of, Subject } from 'rxjs';
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
import { MockInstance, MockProvider } from 'ng-mocks';

// const ThreadServiceStub = {
//   currentThreadMessages: () => {
//     return of([
//       { id: '1', text: 'Message 1' },
//       { id: '2', text: 'Message 2' },
//     ]);
//   },
// };

class UserServiceStub {
  currentUser: any = {
    subscribe: () => {},
  };
}

describe('ChatWindowComponent', () => {
  let component: ChatWindowComponent;
  let fixture: ComponentFixture<ChatWindowComponent>;
  // let messagesServiceStub: jasmine.SpyObj<MessagesService>;
  //let fakeNewMessage: Subject<fakeMessage>;
  let mockMessageService: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatWindowComponent, ChatMessageComponent],
      imports: [FormsModule],
      providers: [
        ThreadService,
        MessagesService,
        { provide: UsersService, useClass: UserServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send message when Send button is clicked', () => {
    // fixture.nativeElement.querySelector('button').click();

    spyOn(component, 'sendMessage');
    // fixture.nativeElement.querySelector('button').dispatchEvent(new Event(''));
    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('click', null);

    expect(component.sendMessage).toHaveBeenCalled();
  });

  it('should add draft message to messages when send message', () => {
    component.draftMessage = {
      author: 'Hello',
    };
    spyOn(component, 'draftMessage');
    const fixture = TestBed.createComponent(ChatWindowComponent);
    fixture.detectChanges();
    component.sendMessage();
    expect(component.draftMessage.author).toEqual(null);
  });

  // expect(messagesServiceStub.addMessage).toHaveBeenCalledWith(
  //   jasmine.objectContaining({
  //     text: 'Hello',
  //     author: component.currentUser,
  //     thread: component.currentThread,
  //     isRead: true,
  //   })
  // );

  // it('should add draft message to messages when send message', () => {
  //   component.draftMessage.text = 'Hello';
  //   component.sendMessage();
  //   messagesServiceStub.addMessage();

  //   expect(messagesServiceStub.addMessage).toHaveBeenCalledWith(
  //     jasmine.objectContaining({
  //       text: 'Hello',
  //       author: component.currentUser,
  //       thread: component.currentThread,
  //       isRead: true,
  //     })
  //   );
  // });

  // it('should scroll to bottom of message container when messages are loaded', () => {
  //   const scrollPane: any = fixture.debugElement.query(
  //     By.css('.msg-container-base')
  //   ).nativeElement;
  //   spyOn(component, 'scrollToBottom');

  //   component.messages = of([
  //     { id: '1', text: 'Message 1' },
  //     { id: '2', text: 'Message 2' },
  //   ]);
  //   fixture.detectChanges();
  //   component.scrollToBottom();

  //   expect(component.scrollToBottom).toHaveBeenCalled();
  // });
});
