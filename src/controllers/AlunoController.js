import { Aluno } from '../models/Aluno';
import { Foto } from '../models/Foto';

export class AlunoController {
  async index(request, response) {
    try {
      const alunos = await Aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'ASC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });

      return response.json(alunos);
    } catch (e) {
      return response.json(e);
    }
  }

  async store(request, response) {
    try {
      const aluno = await Aluno.create(request.body);

      return response.json(aluno);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'ASC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) {
        return response.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      return response.json(aluno);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return response.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      await aluno.destroy();

      return response.json({
        apagado: true,
      });
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return response.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      const alunoAtualizado = await aluno.update(request.body);

      return response.json(alunoAtualizado);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
}
