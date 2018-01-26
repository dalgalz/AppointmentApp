import { Component, OnInit } from '@angular/core';
import { User } from './../user';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  password: string;
  confirm_password: string;

  error: string = null;
  userError: any = {};

  constructor( private _userService: UserService ) { }

  ngOnInit() {

  }

  register(event:Event){
    event.preventDefault();
    console.log('register', this.user);
    this.user.password = this.password;
    this._userService.register(this.user).subscribe(
        (user: any) => {
            console.log('in subscribe user')
            this._userService.login(user);
        },
        errorResponse => {
            console.log('in subscribe email')
            this.userError = errorResponse.json();
        }
    );
  }

  onLogin( event: Event){
	event.preventDefault();
	console.log('login attempt');
	this._userService.login_attempt(this.user)
	        .subscribe(
	            user => this._userService.login(user),
	            errorResponse => this.error = errorResponse.json()
	        );
  }  
}
