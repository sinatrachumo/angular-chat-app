import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatNavBarComponent } from '../chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from '../chat-threads/chat-threads.component';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { MessagesService } from '../message/messages.service';
import { UsersService } from '../user/users.service';
//import { mockComponent } from '../utils/mock-component';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChatPageComponent } from './chat-page.component';

describe('ChatPageComponent', () => {
  let component: ChatPageComponent;
  let fixture: ComponentFixture<ChatPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        // mockComponent(ChatNavBarComponent),
        ChatPageComponent,
        ChatNavBarComponent,
        ChatThreadsComponent,
        ChatWindowComponent,
      ],
      providers: [MessagesService, UsersService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
