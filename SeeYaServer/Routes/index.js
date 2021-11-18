import { Router } from 'express';
import Images from './Images';

const BaseRouter = Router();

BaseRouter.use('/images', Images);

export default BaseRouter;