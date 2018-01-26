const mongoose = require('mongoose');
const User = mongoose.model('User');
var bcrypt = require('bcrypt');

module.exports = {

	//index: (request, response) => {},
	create: (request, response) => {
		let new_user = request.body;
        console.log(new_user);
        new_user.password_hash = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(9));
        User.create(new_user)
            .then( user => {
                response.json(user);
                console.log('new user!', user);
            })
            .catch(error => {
                response.send(400,{error: error})
                console.log(error)
            })
	},
	//show: (request, response) => {},
    login: (request, response) => {
        console.log(request.body);
        User.findOne({ username: request.body.username })
        .then( (user) => {
            if(user === null){
                response.send(400,{error: 'No such user.'})
            }
            console.log('request.body', request.body.password);
            console.log('user.password_hash', user.password_hash);
            if(bcrypt.compareSync(request.body.password, user.password_hash)){
                response.json(user);
            } else {
                response.send(400,{error: 'Incorrect password'})
            }
        })
        .catch(error => console.log(error))
        },
};