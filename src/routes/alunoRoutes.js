import { Router } from 'express';

import { AlunoController } from '../controllers/AlunoController';

import loginRequired from '../middlewares/loginRequired';

const route = new Router();

route.post('/', loginRequired, new AlunoController().store);
route.get('/', new AlunoController().index);
route.get('/:id', new AlunoController().show);
route.put('/:id', loginRequired, new AlunoController().update);
route.delete('/:id', loginRequired, new AlunoController().delete);

export default route;
