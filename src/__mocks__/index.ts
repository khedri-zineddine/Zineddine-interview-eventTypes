import { EventTypes } from '@/_utils/types';

export * from './eventType.mockData';

export const eventTypesMockDBQuery = (eventTypes: EventTypes): Promise<EventTypes> => {
  return Promise.resolve(eventTypes);
};
