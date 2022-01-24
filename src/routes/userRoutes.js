import { Router } from 'express';

import { UserController } from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const route = new Router();

// route.get('/', loginRequired, new UserController().index);
// route.get('/:id', loginRequired, new UserController().show);

route.post('/', new UserController().store);
route.put('/', loginRequired, new UserController().update);
route.delete('/', loginRequired, new UserController().delete);

export default route;
