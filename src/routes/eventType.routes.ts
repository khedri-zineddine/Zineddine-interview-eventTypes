import { Router } from 'express';
import { syncApiTypes,syncLocalTypes } from '@/modules/eventTypes/eventType.controllers';

const eventTypeRoutes = Router();

eventTypeRoutes.get('/sync-api-events', syncApiTypes);
eventTypeRoutes.get('/sync-local-events', syncLocalTypes);

export default eventTypeRoutes;
