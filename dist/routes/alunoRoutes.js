"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _AlunoController = require('../controllers/AlunoController');

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const route = new (0, _express.Router)();

route.post('/', _loginRequired2.default, new (0, _AlunoController.AlunoController)().store);
route.get('/', new (0, _AlunoController.AlunoController)().index);
route.get('/:id', new (0, _AlunoController.AlunoController)().show);
route.put('/:id', _loginRequired2.default, new (0, _AlunoController.AlunoController)().update);
route.delete('/:id', _loginRequired2.default, new (0, _AlunoController.AlunoController)().delete);

exports. default = route;
