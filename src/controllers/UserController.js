import { User } from '../models/User';

export class UserController {
  async store(request, response) {
    try {
      const novoUser = await User.create(request.body);

      const { id, nome, email } = novoUser;

      return response.json({ id, nome, email });
    } catch (e) {
      console.log(e);
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(request, response) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });

      return response.json(users);
    } catch (e) {
      return response.json(null);
    }
  }

  async show(request, response) {
    try {
      const user = await User.findByPk(request.params.id);

      const { id, nome, email } = user;

      return response.json({ id, nome, email });
    } catch (e) {
      return response.json(null);
    }
  }

  async update(request, response) {
    try {
      const user = await User.findByPk(request.userId);

      if (!user) {
        return response.status(400).json({
          erros: ['Usuário não existe'],
        });
      }

      const novosDados = await user.update(request.body);

      const { id, nome, email } = novosDados;

      return response.json({ id, nome, email });
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(request, response) {
    try {
      const user = await User.findByPk(request.userId);

      if (!user) {
        return response.status(400).json({
          erros: ['Usuário não existe'],
        });
      }

      user.destroy();

      return response.json(null);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
}
