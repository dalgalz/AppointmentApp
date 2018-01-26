import { Appointment } from './appointment';

export class User {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    appointments: Appointment[];
    constructor(){ }
}