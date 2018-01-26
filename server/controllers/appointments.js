const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');
const User = mongoose.model('User')

module.exports = {

    create: (request, response) => {
        console.log('About to make new Poll');
        let newAppointment = request.body;
        newAppointment._user = request.body.user._id
        newAppointment.appointDateTime = new Date(request.body.appointDate + " " + request.body.appointTime);
        console.log(newAppointment);
        console.log("This is Datetime ng" + request.body.appointDate + request.body.appointTime);
        console.log("This is app Datetime" + newAppointment.appointDateTime);
        Appointment.create(newAppointment)
            .then( (appointment) => {
                User.findById({_id: request.body.user._id})
                    .then((user) => {
                        user.appointments.push(appointment)
                        user.save();
                    })
                response.json(appointment);
                console.log('new appointment!', appointment);
            })
            .catch(error => console.log(error))
    },
   show: (request, response) => {
        let currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        Appointment.find({ appointDateTime: { $gte: currentDate }}).sort( { appointDateTime: 1 } ).populate('user').exec()
            .then( (appointments) => {
                response.json(appointments);
            })
            .catch(error => console.log(error))
    },
    destroy: (request, response) => {
        console.log('--- about to delete appointment ---');
        console.log(request.params.id);
        Appointment.findByIdAndRemove(request.params.id)
            .then(appointment => {
                User.findById({_id: appointment.user})
                    .then((user) => {
                        user.appointments.splice(user.appointments.indexOf(appointment.id), 1);
                        user.save();
                    })
                response.json(appointment)

            })
            .catch(error => console.log(error))
    }
};