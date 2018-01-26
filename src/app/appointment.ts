import { User } from './user';

export class Appointment {
    _id: string;
    appointDate: string;
    appointTime: string;
    appointDateTime: string;
    user: User;
    complain: string;
    isOwnedByUser: boolean;
    isMoreThanOneDayEarly: boolean;
    constructor(){ }
}
