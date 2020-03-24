const express = require('express');

const routes = express.Router();

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.listAll);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.listAll);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.listAll);

module.exports = routes;
