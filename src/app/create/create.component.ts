import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Appointment } from './../appointment';

import { UserService } from './../user.service';
import { AppointmentService } from './../appointment.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Output() addAppoint = new EventEmitter();

  appointment: Appointment = new Appointment();
  minDate: string;
  isDateAvailable: boolean;
  appointList: Appointment[] = [];


  constructor( private _userService: UserService, private _appointmentService: AppointmentService, private _router: Router ) { }

  ngOnInit() {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate()+1);
    currentDate.setHours(0,0,0,0);
  	this.minDate = currentDate.toISOString().slice(0,10);
  	this.isDateAvailable = true;

	this._appointmentService.getAppointment()
    	.subscribe(
	        appointments => {
	        this.appointList = appointments; 
        }
    );

  }

  newAppoint(event: Event, form: NgForm): void{
	event.preventDefault();
	console.log('create a new appointment', event);
	this.appointment.user = this._userService.logged_in_user;
	this._appointmentService.createAppointment(this.appointment)
	  .subscribe(
	    appointment => {
	      console.log('About to emit', appointment);
	      this.addAppoint.emit(appointment);
	      error => console.log(error);
	    }
	    );
	  this.appointment = new Appointment();
	  this._router.navigateByUrl('dashboard');
  }

  verifyDate(){
      let tempAppointList;
  	  tempAppointList = this.appointList.filter(appointDate => appointDate.appointDateTime.slice(0,10) == this.appointment.appointDate);
	    if(tempAppointList.length >= 3){
	        console.log("More than one!")
	        this.isDateAvailable = false;
	    }
	    else
	    {
	    	this.isDateAvailable = true;
	    }
      console.log("This is date: " + this.appointment.appointDate);
  }

}
