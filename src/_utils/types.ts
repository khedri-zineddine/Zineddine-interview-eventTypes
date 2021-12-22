export type DBEventType = {
  readonly id: string;
  readonly externalId: number;
  readonly name: string;
  readonly description: string;
  readonly eventType: string;
};

export type EventTypes = DBEventType[];

export type ExternalAPIEventType = Omit<DBEventType, 'id' | 'externalId'> & { id: number };

export type ExternalAPIEventTypes = ExternalAPIEventType[];
