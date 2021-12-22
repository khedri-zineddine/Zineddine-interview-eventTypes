import { Router } from 'express';
import eventTypeRoutes from './eventType.routes';

const appRoutes = Router();
appRoutes.use('/eventsType', eventTypeRoutes);
export default appRoutes;
