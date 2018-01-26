import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';

import { Appointment } from './appointment';

@Injectable()
export class AppointmentService {

  constructor( private _http: Http ) { }

  createAppointment(appointment:Appointment): Observable<Appointment[]>{
	  return this._http.post('/appointment', appointment)
	  .map((response)=>{
	      console.log(response);
	      return response.json();
	  })
	  .catch((error)=> Observable.throw(error))
  }

  getAppointment(): Observable<Appointment[]>{
	return this._http.get('/appointment')
	  .map((response)=>{
	      console.log(response);
	      return response.json();
	  })
	   .catch((error)=> Observable.throw(error))
  }

  deleteAppoint(appointment: Appointment): Observable<Appointment>{
	    return this._http.delete('/appointment/' + appointment._id )
	        .map( response => response.json())
	        .catch((error)=> Observable.throw(error))
  }

}
