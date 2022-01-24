import { Router } from 'express';

import { TokenController } from '../controllers/TokenController';

const route = new Router();

route.post('/', new TokenController().store);

export default route;
