import { User } from './user.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
//currentUser: This is the name of the subject that is being created.
//Subject<User>: This specifies the type of the subject, which in this case is User. This means that this subject will emit values of type User.
//new BehaviorSubject<User>(null): This initializes the subject with a new instance of BehaviorSubject, which is a type of subject that has an initial value. In this case, the initial value is null.

@Injectable
export class UsersService {
  currentUser: Subject<User | null> = new BehaviorSubject<User | null>(null); //setting up stream

  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);
  }
}

export const userServiceInjectables: Array<any> = [UsersService];
