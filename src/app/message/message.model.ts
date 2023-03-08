import { uuid } from '../util/uuid';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';

export class Message {
  id: string | any;
  sentAt: Date | any;
  isRead: boolean | any;
  author: User | any;
  text: string | any;
  thread: Thread | any;

  constructor(obj?: any) {
    this.id = (obj && obj.id) || uuid();
    this.sentAt = (obj && obj.sentAt) || new Date();
    this.isRead = (obj && obj.isRead) || false;
    this.author = (obj && obj.author) || null;
    this.text = (obj && obj.text) || null;
    this.thread = (obj && obj.thread) || null;
  }
}
