// import { MessagesService } from './messages.service';
// import { Message } from './message.model';
// import { User } from '../user/user.model';
// import { Thread } from '../thread/thread.model';
// import { Subject } from 'rxjs';
// import { NgModule } from '@angular/core';

// describe('MessagesService', () => {
//   let service: MessagesService;

//   beforeEach(() => {
//     service = new MessagesService();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   describe('addMessage', () => {
//     it('should add a message to the messages stream', () => {
//       const message = new Message({
//         author: new User('1', 'John'),
//         text: 'Hello, World!',
//         thread: new Thread('1', 'Thread 1'),
//       });

//       service.addMessage(message);

//       service.messages.subscribe((messages) => {
//         expect(messages.length).toBe(1);
//         expect(messages[0]).toEqual(message);
//       });
//     });
//   });

//   describe('messagesForThreadUser', () => {
//     it('should filter out messages authored by the current user', () => {
//       const thread = new Thread('1', 'Thread 1');
//       const currentUser = new User('1', 'John');
//       const otherUser = new User('2', 'Jane');

//       const message1 = new Message({
//         author: currentUser,
//         text: 'Hello, World!',
//         thread: thread,
//       });

//       const message2 = new Message({
//         author: otherUser,
//         text: 'Hi, John!',
//         thread: thread,
//       });

//       // add both messages to the service
//       service.addMessage(message1);
//       service.addMessage(message2);

//       // get the messages for the thread and user
//       service
//         .messagesForThreadUser(thread, currentUser)
//         .subscribe((message) => {
//           expect(message.author.id).not.toBe(currentUser.id);
//         });
//     });
//   });
// });

import { Message } from './message.model';
import {
  map,
  Subject,
  BehaviorSubject,
  Observable,
  filter,
  scan,
  publishReplay,
  refCount,
} from 'rxjs';
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { Injectable } from '@angular/core';

const initialMessages: Message[] = [];
type IMessageOperation = (messages: Message[]) => Message[];

@Injectable()
export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>();
  messages: Observable<Message[]>; //emits array of most recent messages
  updates: Subject<any> = new Subject<any>();
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.updates.pipe(
      // watch the updates and accumulate operations on the messages
      scan((messages: Message[], operation: IMessageOperation) => {
        return operation(messages);
      }, initialMessages),
      publishReplay(1),
      refCount()
    );

    this.create
      .pipe(
        //for each Message we receive as input, return an IMessage- Operation that adds this message to the list”
        map((message: Message): IMessageOperation => {
          return (messages: Message[]) => {
            return messages.concat(message);
          };
        })
      )
      .subscribe(this.updates); //subscribing the updates stream to listen to the create stream.

    this.newMessages.subscribe(this.create);

    this.markThreadAsRead
      .pipe(
        map((thread: Thread) => {
          return (messages: Message[]) => {
            return messages.map((message: Message) => {
              // note that we're manipulating `message` directly here. Mutability
              // can be confusing and there are lots of reasons why you might want
              // to, say, copy the Message object or some other 'immutable' here
              if (message.thread.id === thread.id) {
                message.isRead = true;
              }
              return message;
            });
          };
        })
      )
      .subscribe(this.updates);
  }

  /**
   * Adds a new message to the system.
   * @param message The message to add.
   */
  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  /**
   * Returns an observable that emits messages authored by other users in a given thread.
   * @param thread The thread to filter messages by.
   * @param user The user to exclude messages from.
   */
  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    //filters and returns stream of everyone else's messages in thread
    return this.newMessages.pipe(
      filter((message: Message) => {
        //belongs to this thread
        return (
          message.thread.id === thread.id &&
          //and isn't authored by this
          message.author.id !== user.id
        );
      })
    );
  }
}

// Export an array of dependencies that can be used to inject the service.
export const messageServiceInjectables: Array<any> = [MessagesService];
