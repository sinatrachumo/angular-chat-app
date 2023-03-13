import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChatThreadComponent } from './chat-thread.component';
import { Thread } from '../thread/thread.model';
import { ThreadService } from '../thread/threads.service';
import { of } from 'rxjs';
import { MessagesService } from '../message/messages.service';

describe('ChatThreadComponent', () => {
  let component: ChatThreadComponent;
  let fixture: ComponentFixture<ChatThreadComponent>;
  //let ThreadServiceStub: Partial<ThreadService>;
  //let threadServiceSpy: jasmine.SpyObj<ThreadService>;

  const testThread: Thread = {
    id: '1',
    name: 'Test Thread',
    avatarSrc: 'test-avatar.png',
    lastMessage: {
      text: 'Test message',
      sentAt: new Date(),
      sender: 'Test User',
    },
  };
  const testUser = {
    id: '1',
    name: 'Test User',
    avatarSrc: 'https://example.com/avatar.png',
  };
  const ThreadServiceStub = {
    currentThread: of(testThread),

    setCurrentThread() {
      // return of(testThread);
      setCurrentThread: jasmine.createSpy('setCurrentThread');
    },
  };

  beforeEach(async () => {
    // const spy = jasmine.createSpyObj('ThreadService', [
    //   'setCurrentThread',
    //   'currentThread',
    // ]);

    await TestBed.configureTestingModule({
      declarations: [ChatThreadComponent],
      providers: [
        { provide: ThreadService, useValue: ThreadServiceStub },
        MessagesService,
      ],
    }).compileComponents();

    // threadServiceSpy = TestBed.inject(
    //   ThreadService
    // ) as jasmine.SpyObj<ThreadService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatThreadComponent);
    component = fixture.componentInstance;
    component.thread = testThread;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the thread name', () => {
    const threadName = fixture.debugElement.query(
      By.css('.media-heading.contact-name')
    ).nativeElement.textContent;
    expect(threadName).toContain(testThread.name);
  });

  it('should display the last message text', () => {
    const messagePreview = fixture.debugElement.query(
      By.css('.message-preview')
    ).nativeElement.textContent;
    expect(messagePreview).toContain(testThread.lastMessage.text);
  });

  it('should set selected to true when current thread is the same as this thread', () => {
    ThreadServiceStub.setCurrentThread;
    fixture.detectChanges();
    expect(component.selected).toBeTrue();
  });

  it('should call setCurrentThread when the Select link is clicked', () => {
    const selectLink = fixture.debugElement.query(By.css('.div-link'));
    component.thread = {
      id: '1',
      name: 'test',
      avatarSrc: 'test-avatar.png',
      lastMessage: { text: 'test', sentAt: new Date(), sender: 'test' },
    };
    spyOn(ThreadServiceStub, 'setCurrentThread');

    selectLink.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(ThreadServiceStub.setCurrentThread).toHaveBeenCalled();
    //expect(ThreadServiceStub.setCurrentThread).toBe(currentThread);
  });
});
