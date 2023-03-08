import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';
import { UsersService } from '../user/users.service';
import { User } from '../user/user.model';
import { ThreadService } from '../thread/threads.service';
import { Thread } from '../thread/thread.model';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatWindowComponent } from './chat-window.component';

let fakecurrentThread: Subject<Thread>;
class ThreadServiceStub {
  //fakecurrentThread = new Subject<Thread>();
  currentThreadMessages() {
    return of([
      {
        // author: me,
        // sentAt: moment().subtract(45, 'minutes').toDate(),
        text: 'Yet let me weep for such a feeling loss.',
        // thread: tLadycap,
      },
    ] as Message[]);
  }
  currentThread(): Observable<Thread> {
    fakecurrentThread = new Subject<Thread>();
    return fakecurrentThread;
    // return of({ id: 1, name: 'Thread 1' });
  }
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
  let usersService: jasmine.SpyObj<UsersService>;
  let fakecurrentThread: Subject<Thread>;

  beforeEach(async () => {
    const usersServiceSpy = jasmine.createSpyObj('UsersService', [
      'currentUser',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ChatWindowComponent, ChatMessageComponent],
      providers: [
        { provide: MessagesService, useClass: messagesServiceStub },
        { provide: ThreadService, useClass: ThreadServiceStub },
        { provide: UsersService, useValue: usersServiceSpy },
      ],
    }).compileComponents();

    messagesService = TestBed.inject(
      MessagesService
    ) as jasmine.SpyObj<MessagesService>;
    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowComponent);
    component = fixture.componentInstance;
    component.draftMessage = new Message();
    component.messages = of([]);
    //component.currentThread = new Thread('1', 'Thread 1', '');
    //spyOn(ThreadServiceStub, 'currentThread').and.callThrough();

    // component.currentUser = new User('1', 'User 1');

    fixture.detectChanges();
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
