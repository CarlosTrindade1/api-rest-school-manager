import { Router } from 'express';

import { FotoController } from '../controllers/FotoController';

import loginRequired from '../middlewares/loginRequired';

const route = new Router();

route.post('/', loginRequired, new FotoController().store);

export default route;
