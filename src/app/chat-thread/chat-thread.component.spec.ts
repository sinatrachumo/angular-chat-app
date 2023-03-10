import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChatThreadComponent } from './chat-thread.component';
import { Thread } from '../thread/thread.model';
import { ThreadService } from '../thread/threads.service';
import { of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

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
  //newTestThread: of({ currentThread: testThread });

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
  //   // Set up the component and thread service
  //   const thread = { id: 1 };
  //   component.thread = thread;
  //   const currentThread = new Thread('1', 'Test Thread', 'test-avatar.png');
  //   threadServiceSpy.currentThread = new BehaviorSubject<Thread>(currentThread);

  //   //threadServiceSpy.currentThread = of(currentThread);

  //   // Trigger change detection to update the component
  //   fixture.detectChanges();

  //   // Expect selected to be true
  //   expect(component.selected).toBe(true);
  // });

  it('should set selected to true when current thread is the same as this thread', () => {
    // const thread = { id: 1 };
    // component.thread = thread;
    // const currentThread = { id: 1 };

    threadServiceSpy.setCurrentThread.and.returnValue(of(component.thread));
    fixture.detectChanges();
    //console.log(component.selected);
    expect(component.selected).toBe(true);
  });
  // it('should set selected to false when currentThread id does not match thread id', () => {
  //   const thread = { id: 1 };
  //   component.thread = thread;
  //   const currentThread = { id: 2 };
  //   threadServiceSpy.currentThread.and.returnValue(of(currentThread));

  //   expect(component.selected).toBeFalse();
  // });

  it('should call setCurrentThread when the Select link is clicked', () => {
    const selectLink = fixture.debugElement.query(By.css('.div-link'));
    selectLink.triggerEventHandler('click', null);
    expect(threadServiceSpy.setCurrentThread).toHaveBeenCalledWith(testThread);
  });
});
