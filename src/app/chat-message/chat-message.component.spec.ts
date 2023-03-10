import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { UsersService } from '../user/users.service';
import { ThreadService } from '../thread/threads.service';
import { MessagesService } from '../message/messages.service';
import { Message } from '../message/message.model';
import { User } from '../user/user.model';
import { FromNowPipe } from '../pipes/from-now.pipe';
import { ChatMessageComponent } from './chat-message.component';
import { Observable, Subject } from 'rxjs';

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;
  //let mockUsersService: jasmine.SpyObj<UsersService>;
  let usersService: UsersService;

  const testUser: User = {
    id: '1',
    name: 'Test User',
    avatarSrc: 'https://example.com/avatar.png',
  };
  const testAuthor: User = {
    id: '2',
    name: 'Test Author',
    avatarSrc: 'https://example.com/author-avatar.png',
  };

  const testMessage: Message = {
    id: '1',
    isRead: true,
    text: 'Test Message',
    sentAt: new Date(),
    author: testAuthor,
    thread: { id: '1', name: 'Test Thread' },
  };
  const mockUsersService = {
    currentUser: of({
      id: '1',
      name: 'Test User',
      avatarSrc: 'https://example.com/avatar.png',
    } as User),
  };

  beforeEach(() => {
    // const usersServiceSpy = jasmine.createSpyObj('UsersService', [
    //   'getCurrentUser',
    //   'setCurrentUser',
    // ]);

    TestBed.configureTestingModule({
      declarations: [ChatMessageComponent, FromNowPipe],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        //UsersService,
        ThreadService,
        MessagesService,
      ],
    }).compileComponents();

    // mockUsersService = TestBed.inject(
    //   UsersService
    // ) as jasmine.SpyObj<UsersService>;

    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    component.message = testMessage;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentUser and incoming properties on ngOnInit', () => {
    const testUser = {
      id: '1',
      name: 'Test User',
      avatarSrc: 'https://example.com/avatar.png',
    };
    component.ngOnInit();
    // mockUsersService.setCurrentUser.and.returnValue(testUser);

    expect(component.currentUser).toEqual(testUser);
    //expect(component.incoming).toBeFalse(); // because the testUser is the same as the author of testMessage
  });

  it('should render the message text and sender name', () => {
    const messageEl = fixture.debugElement.query(
      By.css('.messages p:first-child')
    ).nativeElement;
    expect(messageEl.textContent).toContain(testMessage.text);

    const senderEl = fixture.debugElement.query(
      By.css('.messages p:last-child')
    ).nativeElement;
    expect(senderEl.textContent).toContain(testMessage.author.name);
  });

  it('should set incoming to true if the message is from a different user', () => {
    // Set up the component with a message from a different user
    const message = {
      id: 1,
      text: 'Test message',
      author: { id: 2, name: 'Other User' },
    };
    const currentUser = { id: 3, name: 'Current User' };
    component.message = message;
    component.currentUser = currentUser;

    // Call ngOnInit to update the incoming property
    component.ngOnInit();

    // Verify that incoming is true
    expect(component.incoming).toBe(true);
  });

  // it('should set incoming to false if the message is from the current user', () => {
  //   // Set up the component with a message from the current user
  //   const message = {
  //     id: 1,
  //     text: 'Test message',
  //     author: { id: 2, name: 'Current User' },
  //   };
  //   const currentUser = { id: 2, name: 'Current User' };
  //   component.message = message;
  //   component.currentUser = currentUser;

  //   // Call ngOnInit to update the incoming property
  //   component.ngOnInit();

  //   // Verify that incoming is false
  //   expect(component.incoming).toBe(false);
  // });
});
