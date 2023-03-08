import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsersService } from '../user/users.service';
import { ThreadService } from '../thread/threads.service';
import { MessagesService } from '../message/messages.service';
import { Message } from '../message/message.model';
import { User } from '../user/user.model';
import { FromNowPipe } from '../pipes/from-now.pipe';
import { ChatMessageComponent } from './chat-message.component';

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;
  let mockUsersService: jasmine.SpyObj<UsersService>;
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

  beforeEach(() => {
    const usersServiceSpy = jasmine.createSpyObj('UsersService', [
      'getCurrentUser',
      'setCurrentUser',
    ]);

    TestBed.configureTestingModule({
      declarations: [ChatMessageComponent, FromNowPipe],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        ThreadService,
        MessagesService,
      ],
    }).compileComponents();

    mockUsersService = TestBed.inject(
      UsersService
    ) as jasmine.SpyObj<UsersService>;

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
      avatarSrc: 'https://example.com/avatar2.png',
    };
    mockUsersService.setCurrentUser.and.returnValue(testUser);
    component.ngOnInit();
    expect(component.currentUser).toEqual(testUser);
    expect(component.incoming).toBeFalse(); // because the testUser is the same as the author of testMessage
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
});
