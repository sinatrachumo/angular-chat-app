import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesService } from '../message/messages.service';

import { ChatThreadsComponent } from './chat-threads.component';

describe('ChatThreadsComponent', () => {
  let component: ChatThreadsComponent;
  let fixture: ComponentFixture<ChatThreadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatThreadsComponent],
      providers: [MessagesService],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
