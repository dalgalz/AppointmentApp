import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

import { User } from './user';

@Injectable()
export class UserService {

	userError = new BehaviorSubject({});

	logged_in_user: User = new User();
  	logged_in: boolean = false;

  constructor( private _http: Http, private _router: Router ) { }

	register(user: User): Observable<User>{
	return this._http.post('/users', user)
	    .map((response) => {
	        console.log('Reg Response', response);
	        return response.json();
	    })
	    .catch((error) => {
	        if(error.json().error.code === 11000){
	            console.log('User with user already exists!');
	            this.userError.next({error:'User with this username already exists!'});
	        }
	        return Observable.throw(error);
	    })
	  }

	  login(user: User){
	    console.log('in login func');
	    this.logged_in_user = user;
	    this._router.navigateByUrl('dashboard');
	    localStorage.setItem('id', this.logged_in_user._id);
	  }

	  login_attempt(user: User): Observable<User>{
	    console.log('sending login request');
	    return this._http.post('/login', user)
	        .map((response) => {
	            console.log('logged in!')
	            return response.json();
	        })
	        .catch((error) => {
	            console.log('log in error', error);
	            return Observable.throw(error);
	        })
      }

	  logout(){
	    console.log('in log out func');
	    this.logged_in_user = new User();
	    localStorage.setItem('id', undefined);
	  }

}
