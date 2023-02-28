import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { userServiceInjectables, UsersService } from './user/users.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [UsersService, userServiceInjectables],
  bootstrap: [AppComponent],
})
export class AppModule {}
