"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _UserController = require('../controllers/UserController');

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const route = new (0, _express.Router)();

// route.get('/', loginRequired, new UserController().index);
// route.get('/:id', loginRequired, new UserController().show);

route.post('/', new (0, _UserController.UserController)().store);
route.put('/', _loginRequired2.default, new (0, _UserController.UserController)().update);
route.delete('/', _loginRequired2.default, new (0, _UserController.UserController)().delete);

exports. default = route;
