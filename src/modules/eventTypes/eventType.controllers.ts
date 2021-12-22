import { Request, Response } from 'express';
import { urlJustGivingApi } from '@/constants';
import HttpClient from '@/_utils/HttpClient';
import eventTypeModal from './eventType.model';
import { DBEventType } from '@/_utils/types';

export const syncApiTypes = async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await HttpClient.getRequest(urlJustGivingApi, {
      'Content-Type': 'application/json',
    });
    if (response.status >= 400 || !response.data)
      return res.status(500).send({
        message: 'Ops Somthing went wrong',
      });
    const eventsLength=response.data.eventTypes.length
    if (eventsLength > -1) {
      const localEvents = await eventTypeModal.fetchEvents();
      const eventsMap: Map<number, DBEventType> = new Map();
      response.data.eventTypes.forEach((eventType: any) => {
        eventsMap.set(eventType.id, {
          id: eventType.id,
          externalId: eventType.id,
          name: eventType.name,
          description: eventType.description,
          eventType: eventType.eventType,
        })
      })
      console.log(`Events fetched ${eventsLength}`)
      localEvents.forEach((eventType: DBEventType) => {
        eventsMap.delete(eventType.externalId)
      });
      await eventTypeModal.syncEventsDB(eventsMap);
    }
    return res.send({
      message: 'Events sync successfully',
    });
  } catch {
    return res.status(500).send({
      message: 'Ops Somthing went wrong',
    });
  }
};

export const syncLocalTypes = async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await HttpClient.getRequest(urlJustGivingApi, {
      'Content-Type': 'application/json',
    });
    if (response.status >= 400 || !response.data)
      return res.status(500).send({
        message: 'Ops Somthing went wrong',
      });
    const localEvents = await eventTypeModal.fetchEvents();
    const eventsLength=localEvents.length
    const eventsMap: Map<number, DBEventType> = new Map();
    localEvents.forEach((eventType: any) => {
      eventsMap.set(eventType.externalId, eventType)
    })
    console.log(`Events founded ${eventsLength}`)
    response.data.eventTypes.forEach((eventType: any) => {
      eventsMap.delete(eventType.id)
    });
    await eventTypeModal.syncEventsDB(eventsMap);
    return res.send({
      message: 'Events sync successfully',
    });
  } catch {
    return res.status(500).send({
      message: 'Ops Somthing went wrong',
    });
  }
};
