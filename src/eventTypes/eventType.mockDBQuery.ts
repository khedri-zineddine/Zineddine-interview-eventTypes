import { EventTypes } from '../_utils/types';

export const eventTypesMockDBQuery = (eventTypes: EventTypes): Promise<EventTypes> => {
  return Promise.resolve(eventTypes);
};
