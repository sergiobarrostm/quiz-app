const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');
const SubjectController = require('./controllers/SubjectController');
const QuestionController = require('./controllers/QuestionController');


const routers = express.Router(); 

routers.get('/users', UserController.index);

routers.post('/user', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    passworld: Joi.string().required(),
    category: Joi.string().required()
  })
}),UserController.create);

routers.get('/subjects', SubjectController.index);

routers.post('/subject', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required()
  })
}) ,SubjectController.create);

routers.delete('/subject/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), SubjectController.delete);

routers.post('/question', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    answer: Joi.string().required(),
    option_a: Joi.string().required(),
    option_b: Joi.string().required(),
    option_c: Joi.string().required(),
    option_d: Joi.string().required(),
  })
}),QuestionController.create);

routers.get('/questions', QuestionController.index);
routers.delete('/question/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), QuestionController.delete);



module.exports = routers;