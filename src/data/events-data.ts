import event1Img from '~/media/2.jpeg?url';
import event2Img from '~/media/3.jpeg?url';

export interface EventData {
  id: string;
  title: string;
  datetime: string;
  description: string;
  imageUrl?: string;
}

export const EVENTS: EventData[] = [
  {
    id: '1',
    title: 'Sunset en LPRC',
    datetime: 'Sábado 14 de Marzo, 15:30 hs',
    description: 'Estimados socios y familias de LPRC,\n\nEste sábado, después del partido de la Primera División (15:30), los invitamos a quedarse en el club para disfrutar juntos de nuestro Sunset en LPRC.\n\nHabrá música, barra de tragos y un lindo espacio para encontrarnos, charlar y seguir viviendo el club entre amigos y en familia.\nLos esperamos para cerrar el día en el club.',
    imageUrl: event1Img
  },
  {
    id: '2',
    title: 'Juegos Recreativos Infantiles',
    datetime: 'Sábado post 3er tiempo',
    description: '🏉 Este sábado, después del tercer tiempo! \n\nAl finalizar el tercer tiempo de Infantiles y Preinfantiles, entrenadores y entrenadoras del club van a organizar juegos recreativos para los chicos.\n\nLa idea es compartir un rato más en el club, que los chicos sigan jugando y que las familias se queden a disfrutar la tarde.\n\nA las 15:30 comienza el partido de la Primera, ¡así que los invitamos a quedarse y alentar juntos!\n\nLos esperamos para seguir viviendo el club en familia. 💛',
    imageUrl: event2Img
  },
  {
    id: '3',
    title: 'Ingreso Sábados',
    datetime: 'Partidos Plantel Superior',
    description: 'ESTACIONAMIENTO:\nSocios: $7.000\nNo Socios: $15.000\n\nACCESO:\nNo Socios: $10.000',
    imageUrl: undefined
  }
];

export function getEventById(id: string): EventData | undefined {
  return EVENTS.find(e => e.id === id);
}
