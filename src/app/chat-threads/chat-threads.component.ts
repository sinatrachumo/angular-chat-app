import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Thread } from '../thread/thread.model';
import { ThreadService } from '../thread/threads.service';
import { ChatThreadComponent } from '../chat-thread/chat-thread.component';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css'],
})
export class ChatThreadsComponent {
  threads: Observable<any>;

  constructor(public threadsService: ThreadService) {
    this.threads = threadsService.orderedThreads;
  }
}
