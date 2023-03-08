// import { User } from '../user/user.model';
// import { Thread } from '../thread/thread.model';
// import { Message } from './message.model';
// import { MessagesService } from './messages.service';

// describe('MessagesService', () => {
//   it('should test', () => {
//     const user: User = new User('Nate', '');
//     const thread: Thread = new Thread('t1', 'Nate', '');

//     const m1: Message = new Message({
//       author: user,
//       text: 'Hi!',
//       thread: thread,
//     });

//     const m2: Message = new Message({
//       author: user,
//       text: 'Bye!',
//       thread: thread,
//     });

//     const service: MessagesService = new MessagesService();
//     service.newMessages.subscribe((message) =>
//       console.log('=> newMessages: ' + message.text)
//     );
//     service.messages.subscribe((messages: Message[]) =>
//       console.log('=> messages: ' + messages.length)
//     );

//     service.addMessage(m1);
//     service.addMessage(m2);
//   });
// });

import { MessagesService } from './messages.service';
import { Message } from './message.model';
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { Subject } from 'rxjs';
import { NgModule } from '@angular/core';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(() => {
    service = new MessagesService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addMessage', () => {
    it('should add a message to the messages stream', () => {
      const message = new Message({
        author: new User('1', 'John'),
        text: 'Hello, World!',
        thread: new Thread('1', 'Thread 1'),
      });

      service.addMessage(message);

      service.messages.subscribe((messages) => {
        expect(messages.length).toBe(1);
        expect(messages[0]).toEqual(message);
      });
    });
  });

  describe('messagesForThreadUser', () => {
    it('should filter out messages authored by the current user', () => {
      const thread = new Thread('1', 'Thread 1');
      const currentUser = new User('1', 'John');
      const otherUser = new User('2', 'Jane');

      const message1 = new Message({
        author: currentUser,
        text: 'Hello, World!',
        thread: thread,
      });

      const message2 = new Message({
        author: otherUser,
        text: 'Hi, John!',
        thread: thread,
      });

      // add both messages to the service
      service.addMessage(message1);
      service.addMessage(message2);

      // get the messages for the thread and user
      service
        .messagesForThreadUser(thread, currentUser)
        .subscribe((message) => {
          expect(message.author.id).not.toBe(currentUser.id);
        });
    });
  });
});
