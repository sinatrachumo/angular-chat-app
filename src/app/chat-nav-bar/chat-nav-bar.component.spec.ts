// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ChatNavBarComponent } from './chat-nav-bar.component';

// describe('ChatNavBarComponent', () => {
//   let component: ChatNavBarComponent;
//   let fixture: ComponentFixture<ChatNavBarComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ChatNavBarComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ChatNavBarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChatNavBarComponent } from './chat-nav-bar.component';
import { UsersService } from '../user/users.service';
import { ThreadService } from '../thread/threads.service';
import { MessagesService } from '../message/messages.service';
import { Thread } from '../thread/thread.model';
import { Message } from '../message/message.model';
import { of } from 'rxjs';

describe('ChatNavBarComponent', () => {
  let component: ChatNavBarComponent;
  let fixture: ComponentFixture<ChatNavBarComponent>;

  const mockMessagesService = {
    messages: of([
      { text: 'Hello', isRead: true },
      { text: 'Hi', isRead: false },
      { text: 'How are you?', isRead: false },
    ]),
  };

  const mockThreadService = {
    currentThread: of({ id: 1, name: 'Thread 1' } as Thread),
  };

  const mockUsersService = {
    currentUser: { id: 1, name: 'John' },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatNavBarComponent],
      providers: [
        { provide: MessagesService, useValue: mockMessagesService },
        { provide: ThreadService, useValue: mockThreadService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the number of unread messages', () => {
    const badge = fixture.debugElement.query(By.css('.badge')).nativeElement;
    expect(badge.textContent.trim()).toBe('2');
  });
});
