"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User');

 class TokenController {
  async store(request, response) {
    const { email = '', password = '' } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        errors: ['Credenciais inválidas.'],
      });
    }

    try {
      const user = await _User.User.findOne({ where: { email } });

      if (!user) {
        return response.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      if (!(await user.passwordIsValid(password))) {
        return response.status(400).json({
          errors: ['Senha inválida'],
        });
      }

      const { id } = user;

      const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return response.json({ token });
    } catch (e) {
      console.log(e);
      return response.status(400).json(e);
    }
  }
} exports.TokenController = TokenController;
