import { type EnvGetter } from '@builder.io/qwik-city/middleware/request-handler';
import { getDb } from '~/db/client';
import { events } from '~/db/schema';
import { eq, asc } from 'drizzle-orm';

export interface EventData {
  id: number;
  title: string;
  datetime: string;
  description: string;
  imageUrl: string | null;
  displayOrder: number;
}

export async function getEvents(env: EnvGetter): Promise<EventData[]> {
  const db = getDb(env);
  return db.select().from(events).orderBy(asc(events.displayOrder));
}

export async function getEventById(env: EnvGetter, id: number): Promise<EventData | undefined> {
  const db = getDb(env);
  const [event] = await db.select().from(events).where(eq(events.id, id)).limit(1);
  return event;
}
