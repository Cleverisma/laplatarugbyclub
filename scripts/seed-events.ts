import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';
import { events } from '../src/db/schema';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error('TURSO_DATABASE_URL is missing. Set it as env var.');
  process.exit(1);
}

const client = createClient({ url, authToken });
const db = drizzle(client);

async function seed() {
  console.log('Seeding events...');

  await db.insert(events).values([
    {
      title: 'Sunset en LPRC',
      datetime: 'Sábado 14 de Marzo, 15:30 hs',
      description: 'Estimados socios y familias de LPRC,\n\nEste sábado, después del partido de la Primera División (15:30), los invitamos a quedarse en el club para disfrutar juntos de nuestro Sunset en LPRC.\n\nHabrá música, barra de tragos y un lindo espacio para encontrarnos, charlar y seguir viviendo el club entre amigos y en familia.\nLos esperamos para cerrar el día en el club.',
      imageUrl: null,
      displayOrder: 1,
    },
    {
      title: 'Juegos Recreativos Infantiles',
      datetime: 'Sábado post 3er tiempo',
      description: '🏉 Este sábado, después del tercer tiempo! \n\nAl finalizar el tercer tiempo de Infantiles y Preinfantiles, entrenadores y entrenadoras del club van a organizar juegos recreativos para los chicos.\n\nLa idea es compartir un rato más en el club, que los chicos sigan jugando y que las familias se queden a disfrutar la tarde.\n\nA las 15:30 comienza el partido de la Primera, ¡así que los invitamos a quedarse y alentar juntos!\n\nLos esperamos para seguir viviendo el club en familia. 💛',
      imageUrl: null,
      displayOrder: 2,
    },
    {
      title: 'Ingreso Sábados',
      datetime: 'Partidos Plantel Superior',
      description: 'ESTACIONAMIENTO:\nSocios: $7.000\nNo Socios: $15.000\n\nACCESO:\nNo Socios: $10.000',
      imageUrl: null,
      displayOrder: 3,
    },
  ]);

  console.log('✅ 3 events seeded successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
