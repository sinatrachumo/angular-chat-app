import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChatThreadComponent } from './chat-thread.component';
import { Thread } from '../thread/thread.model';
import { ThreadService } from '../thread/threads.service';
import { of } from 'rxjs';

describe('ChatThreadComponent', () => {
  let component: ChatThreadComponent;
  let fixture: ComponentFixture<ChatThreadComponent>;
  let threadServiceSpy: jasmine.SpyObj<ThreadService>;

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

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ThreadService', [
      'setCurrentThread',
      'currentThread',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ChatThreadComponent],
      providers: [{ provide: ThreadService, useValue: spy }],
    }).compileComponents();

    threadServiceSpy = TestBed.inject(
      ThreadService
    ) as jasmine.SpyObj<ThreadService>;
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

  // it('should set selected to true when current thread is the same as this thread', () => {
  //   threadServiceSpy.currentThread.and.returnValue(of(testThread));
  //   fixture.detectChanges();
  //   expect(component.selected).toBeTrue();
  // });

  it('should call setCurrentThread when the Select link is clicked', () => {
    const selectLink = fixture.debugElement.query(By.css('.div-link'));
    selectLink.triggerEventHandler('click', null);
    expect(threadServiceSpy.setCurrentThread).toHaveBeenCalledWith(testThread);
  });
});
