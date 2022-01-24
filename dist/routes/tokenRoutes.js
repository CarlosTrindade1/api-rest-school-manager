"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');

var _TokenController = require('../controllers/TokenController');

const route = new (0, _express.Router)();

route.post('/', new (0, _TokenController.TokenController)().store);

exports. default = route;
