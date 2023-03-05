import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  async,
} from '@angular/core/testing';
import { Observable } from 'rxjs';
import { DebugElement, EventEmitter, Component } from '@angular/core';
import { ChatThreadComponent } from './chat-thread.component';
import { ThreadService } from '../thread/threads.service';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Thread } from '../thread/thread.model';
import { OnInit } from '@angular/core';
import { of } from 'rxjs';
import { MessagesService } from '../message/messages.service';

describe('ChatThreadComponent', () => {
  let mockThreadService: jasmine.SpyObj<ThreadService>;
  let component: ChatThreadComponent;
  let fixture: ComponentFixture<ChatThreadComponent>;

  const mockThread: Thread = {
    id: 1,
    lastMessage: null,
    name: 'test thread',
    avatarSrc: 'string',
  };

  beforeEach(async () => {
    mockThreadService = jasmine.createSpyObj('ThreadService', [
      'setcurrentThread',
      'currentThread',
    ]);
    TestBed.configureTestingModule({
      declarations: [ChatThreadComponent],
      providers: [
        {
          provide: ThreadService,
          useValue: mockThreadService,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ChatThreadComponent);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatThreadComponent);
    component = fixture.componentInstance;
    component.thread = mockThread;
    fixture.detectChanges();
    // component.ngOnInit;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should set selected to true if currentThread is set to this thread', () => {
  //   const mockCurrentThread = { ...mockThread };
  //   mockThreadService.currentThread = of(mockCurrentThread);
  //   expect(component.selected).toBe(true);
  // });

  // it('should set selected to false if currentThread is set to another thread', () => {
  //   const mockCurrentThread = { ...mockThread, id: 2 };
  //   mockThreadService.currentThread = of(mockCurrentThread);
  //   expect(component.selected).toBe(false);
  // });

  it('(it should call method to setCurrent thread when clicked)', () => {
    const mockEvent = { preventDefault: () => {} };
    component.clicked(mockEvent);
    expect(mockThreadService.setcurrentThread).toHaveBeenCalledWith(mockThread);
  });
});
