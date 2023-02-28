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
export class MessageService {
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
  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

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
export const messageServiceInjectables: Array<any> = [MessageService];
