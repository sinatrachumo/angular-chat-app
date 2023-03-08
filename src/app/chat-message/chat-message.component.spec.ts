// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ChatMessageComponent } from './chat-message.component';
// import { UsersService } from '../user/users.service';
// import { Message } from '../message/message.model';
// import { User } from '../user/user.model';
// import { Observable } from 'rxjs';

// describe('ChatMessageComponent', () => {
//   let component: ChatMessageComponent;
//   let fixture: ComponentFixture<ChatMessageComponent>;
//   let usersServiceStub: UsersService;

//   beforeEach(async () => {
//     usersServiceStub = {
//       currentUser: new Observable<User>(),
//     };

//     await TestBed.configureTestingModule({
//       declarations: [ChatMessageComponent],
//       providers: [{ provide: UsersService, useValue: usersServiceStub }],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ChatMessageComponent);
//     component = fixture.componentInstance;
//     component.message = new Message();
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should set incoming to true if the message author is not the current user', () => {
//     const currentUser = new User('jane', 'test.jpg');
//     currentUser.id = '1';
//     component.currentUser = currentUser;

//     const message = new Message();
//     message.author = new User('janet', 'test.jpg');
//     message.author.id = 2;

//     component.message = message;
//     component.ngOnInit();

//     expect(component.incoming).toBeTrue();
//   });

//   it('should set incoming to false if the message author is the current user', () => {
//     const currentUser = new User('jane', 'test.jpg');
//     currentUser.id = '1';
//     component.currentUser = currentUser;

//     const message = new Message();
//     message.author = currentUser;

//     component.message = message;
//     component.ngOnInit();

//     expect(component.incoming).toBeFalse();
//   });
// });
