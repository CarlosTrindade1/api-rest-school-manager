import multer from 'multer';

import multerConfig from '../config/multerConfig';

import { Foto } from '../models/Foto';

const upload = multer(multerConfig).single('foto');

export class FotoController {
  store(request, response) {
    return upload(request, response, async (error) => {
      if (error) {
        return response.status(400).json({
          errors: [error],
        });
      }

      const { originalname, filename } = request.file;
      const { aluno_id } = request.body;

      try {
        const foto = await Foto.create({ originalname, filename, aluno_id });

        return response.json(foto);
      } catch (e) {
        return response.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}
