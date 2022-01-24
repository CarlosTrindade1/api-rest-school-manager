"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);

var _Foto = require('../models/Foto');

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('foto');

 class FotoController {
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
        const foto = await _Foto.Foto.create({ originalname, filename, aluno_id });

        return response.json(foto);
      } catch (e) {
        return response.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
} exports.FotoController = FotoController;
