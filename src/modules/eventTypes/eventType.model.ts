import { DBEventType,EventTypes } from '@/_utils/types';
import { eventTypes } from '@/__mocks__';

class EventTypeModal {
  fetchEvents(params?: any): Promise<EventTypes> {
    return Promise.resolve(eventTypes);
  }

  async syncEventsDB(Events: Map<number, DBEventType>): Promise<boolean> {
    console.log(`Events to sync ${Events.size}`)
    return true;
  }
}
const eventTypeModal = new EventTypeModal();
export default eventTypeModal;
