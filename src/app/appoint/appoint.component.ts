import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { AppointmentService } from './../appointment.service';

import { Appointment } from './../appointment';

@Component({
  selector: 'app-appoint',
  templateUrl: './appoint.component.html',
  styleUrls: ['./appoint.component.css']
})
export class AppointComponent implements OnInit {

  appointments: Appointment[] = [];
  tempAppointments: Appointment[] = [];
  fullAppointments: Appointment[] = [];
  searchTerm: string;

  constructor( private _userService: UserService, private _appointmentService: AppointmentService ) { }

  ngOnInit() {
    this._appointmentService.getAppointment()
	    .subscribe(
	        appointments => {
	            this.appointments = appointments
	            this.fullAppointments = appointments
	            for(let a of this.appointments)
	            {
	              if( a.user._id === this._userService.logged_in_user._id)
	              {
	                a.isOwnedByUser = true;
	              }
	              	let tempDate = new Date(a.appointDateTime);
              	  	let currentDate = new Date();
					let now = new Date();
					let diff = tempDate.getTime() - currentDate.getTime();
					let days = Math.floor(diff / (1000 * 60 * 60 * 24));
	              	if( days >= 0)
	              	{
	              	 a.isMoreThanOneDayEarly = true;
	              	}
	            }
	        }
	    );
  }

  deleteAppoint(appoint_to_delete:Appointment){
	  console.log("Delete Me!!");
	  this._appointmentService.deleteAppoint(appoint_to_delete)
	    .subscribe(
	      appointment => {
	          console.log('Delete Appointment', appointment);
	          this.appointments.splice(this.appointments.indexOf(appoint_to_delete), 1);
	        },
	        errorResponse => {
	          console.log('error', errorResponse);
	        }
	        );
  }

  search(event: Event){
	event.preventDefault();
	  console.log('Search!', this.searchTerm);
	  if(this.searchTerm === null || this.searchTerm === "" || this.searchTerm === undefined)
	  {
	    this.appointments = this.fullAppointments;
	  }
	  else
	  {
	    this.appointments = this.appointments.filter(appointment => appointment.complain.toLowerCase().includes(this.searchTerm.toLowerCase()) )
	    if(this.appointments.length === 0){
	        this.appointments = null;
	    }
	  }
    }


  logout(event: Event){
	event.preventDefault();
	console.log('log out')
	this._userService.logout();
  }


}
