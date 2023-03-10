import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThreadService } from '../thread/threads.service';
import { Thread } from '../thread/thread.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css'],
})
export class ChatThreadComponent implements OnInit {
  @Input() thread!: Thread;
  selected = false;

  constructor(private threadService: ThreadService) {}

  ngOnInit(): void {
    console.log(
      'constructor',
      this.threadService.currentThread.constructor.name
    );
    if (this.threadService.currentThread instanceof BehaviorSubject<string>) {
      this.threadService.currentThread.subscribe((currentThread: Thread) => {
        this.selected =
          currentThread && this.thread && currentThread.id === this.thread.id;
      });
    }
  }

  clicked(event: Event): void {
    this.threadService.setCurrentThread(this.thread);
    event.preventDefault();
  }
}
