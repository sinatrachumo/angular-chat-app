// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ThreadService } from '../thread/threads.service';
// import { Thread } from '../thread/thread.model';
// import { BehaviorSubject } from 'rxjs';
// import { ChatThreadsComponent } from '../chat-threads/chat-threads.component';

// @Component({
//   selector: 'app-chat-thread',
//   templateUrl: './chat-thread.component.html',
//   styleUrls: ['./chat-thread.component.css'],
// })
// export class ChatThreadComponent implements OnInit {
//   @Input()
//   thread!: Thread;
//   selected = false;

//   constructor(public threadService: ThreadService) {}
//   ngOnInit(): any {
//     if (this.threadService.currentThread instanceof BehaviorSubject) {
//       this.threadService.currentThread.subscribe((currentThread: Thread) => {
//         this.selected =
//           currentThread && this.thread && currentThread.id === this.thread.id;
//       });
//     }
//   }

//   clicked(event: any): void {
//     this.threadService.setCurrentThread(this.thread);
//     event.preventDefault();
//   }
// }
import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThreadService } from '../thread/threads.service';
import { Thread } from '../thread/thread.model';

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
    if (this.threadService.currentThread instanceof BehaviorSubject) {
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
