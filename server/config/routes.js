const userController = require('../controllers/users.js');
const appointmentController = require('../controllers/appointments.js');

module.exports = function(app) {

  app.post('/users', userController.create);
  app.post('/login', userController.login);

  app.post('/appointment', appointmentController.create);
  app.get('/appointment', appointmentController.show);
  app.delete('/appointment/:id', appointmentController.destroy);

  app.all("*", (request, response) => { response.sendFile(path.resolve('dist', 'index.html')) });
}