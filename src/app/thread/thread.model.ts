import { uuid } from '../util/uuid';
import { Message } from '../message/message.model';

export class Thread {
  id?: string | any;
  lastMessage?: Message | any;
  name?: string | any;
  avatarSrc?: string | any;

  constructor(
    avatarSrc: string,
    id?: string,
    name?: string | any
    //lastMessage?: Message
  ) {
    this.id = id || uuid();
    this.name = name;
    this.avatarSrc = avatarSrc;
  }
}
