import member1Img from '~/media/10.jpeg';
import member2Img from '~/media/11.jpeg';
import member3Img from '~/media/12.jpeg';
import member4Img from '~/media/13.jpeg';

import coach1Img from '~/media/14.jpeg';
import coach2Img from '~/media/15.jpeg';
import coach3Img from '~/media/16.jpeg';

export interface BoardMember {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
}

export interface Coach {
  id: string;
  category: string;
  headCoach: string;
  assistants: string[];
  manager?: string;
  imageUrl?: string;
}

export const boardMembers: BoardMember[] = [
  {
    id: '1',
    name: 'José Manuel Roán',
    role: 'Presidente',
    imageUrl: member1Img
  },
  {
    id: '2',
    name: 'Sebastián Addiechi',
    role: 'Vicepresidente',
    imageUrl: member2Img
  },
  {
    id: '3',
    name: 'Matías Di Rago',
    role: 'Secretario',
    imageUrl: member3Img
  },
  {
    id: '4',
    name: 'Martín Diez',
    role: 'Tesorero',
    imageUrl: member4Img
  }
];

export const coachesStaff: Coach[] = [
  {
    id: 'c1',
    category: 'M14',
    headCoach: 'Juan Pérez',
    assistants: ['Carlos Gómez', 'Miguel Díaz'],
    manager: 'Roberto García',
    imageUrl: coach1Img
  },
  {
    id: 'c2',
    category: 'M13',
    headCoach: 'Diego López',
    assistants: ['Martín Sánchez', 'Leo Fernández'],
    imageUrl: coach2Img
  },
  {
    id: 'c3',
    category: 'M12',
    headCoach: 'Pablo Rodríguez',
    assistants: ['Andrés Rivas', 'Tomás Aguilar'],
    manager: 'Emilio Ruiz',
    imageUrl: coach3Img
  }
];
