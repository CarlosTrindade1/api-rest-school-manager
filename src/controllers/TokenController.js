import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export class TokenController {
  async store(request, response) {
    const { email = '', password = '' } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        errors: ['Credenciais inválidas.'],
      });
    }

    try {
      const user = await User.findOne({ where: { email } });

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

      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return response.json({ token, user: { nome: user.nome, id, email } });
    } catch (e) {
      console.log(e);
      return response.status(400).json(e);
    }
  }
}
