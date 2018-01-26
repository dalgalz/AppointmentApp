
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { HttpModule } from '@angular/http'; // <-- Import HttpModule

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppointComponent } from './appoint/appoint.component';
import { CreateComponent } from './create/create.component';

import { UserService } from './user.service';
import { AppointmentService } from './appointment.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppointComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- Include module in our AppModules
	HttpModule, // <-- Include module in our AppModules
	AppRoutingModule
  ],
  providers: [UserService, AppointmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
