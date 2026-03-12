

import coachImg1 from '~/media/10.jpeg';
import coachImg2 from '~/media/11.jpeg';
import coachImg3 from '~/media/12.jpeg';
import coachImg4 from '~/media/13.jpeg';

export interface BoardMember {
  id: string;
  role: string;
  names: string[];
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
    role: 'Presidente',
    names: ['José Manuel Roán']
  },
  {
    id: '2',
    role: 'Vicepresidente',
    names: ['Sebastián Addiechi']
  },
  {
    id: '3',
    role: 'Secretario',
    names: ['Matías Di Rago']
  },
  {
    id: '4',
    role: 'Prosecretario',
    names: ['Santiago Uranga']
  },
  {
    id: '5',
    role: 'Tesorero',
    names: ['Martín Diez']
  },
  {
    id: '6',
    role: 'Protesorero',
    names: ['Agustín Lopez Ruf']
  },
  {
    id: '7',
    role: 'Capitán General',
    names: ['Dimas Suffern Quirno']
  },
  {
    id: '8',
    role: 'Vocales Titulares',
    names: ['Esteban Durante', 'Federico Bilbao', 'Fernando Cafasso', 'Mauro Franco', 'Maximiliano Suarez Folch']
  },
  {
    id: '9',
    role: 'Vocales Suplentes',
    names: ['Gastón Mendy', 'Gonzalo Perez Albizu', 'Guillermo Raggio', 'Ignacio Sarasqueta']
  },
  {
    id: '10',
    role: 'Miembros Titulares de la Comisión Revisora de Cuentas',
    names: ['Martín Festa', 'Damián Di Menna', 'Ramiro Calonje']
  },
  {
    id: '11',
    role: 'Miembros Suplentes de la Comisión Revisora de Cuentas',
    names: ['Gonzalo Ferreiro', 'Eduardo Featherston']
  }
];

export const coachesStaff: Coach[] = [
  {
    id: 'c1',
    category: 'M19',
    headCoach: 'Bernardo Maiztegui, Justo Maselli',
    assistants: [
      'Juan Ignacio Della Salda',
      'Federico Granillo Fernández',
      'Nicolás Addiechi',
      'Julián Arteche',
      'Juan Martín Sorarrain',
      'Bautista Bertone',
      'Gonzalo Oviedo',
      'Ricardo Villarreal',
      'José Garganta',
      'Lucas de Francesco',
      'Guillermo Poggio',
      'Germán Zuloaga',
      'Nehuen Jauri Rivero',
      'Martín Fontán'
    ],
    manager: 'Adolfo Baridón, Gustavo Bragagnolo, Gustavo Insúa',
    imageUrl: coachImg1
  },
  {
    id: 'c2',
    category: 'M17',
    headCoach: 'Eduardo Crespo',
    assistants: [
      'Luis Salessi',
      'Julio Brolese',
      'Tomas Bernasconi',
      'Manuel Etcheverry',
      'Diego Montoni',
      'Pablo Castro',
      'Francisco Paz Rizzoli',
      'Damián Crispino'
    ],
    manager: 'Santiago Vattuone',
    imageUrl: coachImg2
  },
  {
    id: 'c3',
    category: 'M16',
    headCoach: 'Damián Biancuzzo, Diego Festa',
    assistants: [
      'Carlos Rojas',
      'Juan Pedro Chávez',
      'Martín De la Torre',
      'Federico Etchegoyen',
      'Federico Quintana M.',
      'Aldo Rossi',
      'Germán Chufi',
      'Luciano Barreda',
      'Martín Kneiszl'
    ],
    manager: 'Lucas Alba',
    imageUrl: coachImg3
  },
  {
    id: 'c4',
    category: 'M15',
    headCoach: 'Sebastián Kusich',
    assistants: [
      'Ivan Kucic',
      'Orlando Sosa',
      'Fernando Ferraro',
      'Jero Ferraro',
      'Marcelo Picón',
      'Bautista Picón',
      'Javier Del Tufo',
      'Tomás Del Tufo',
      'Luciano Taiuti',
      'Laureano Fredes',
      'Matías Guillén',
      'Simón Leavi',
      'Francisco Saulnier',
      'Matías Alonso',
      'Francisco Guerrero',
      'Francisco Del Tufo',
      'Gonzalo Pizarro',
      'Nicolás Chapani'
    ],
    manager: 'Claudio Carretino',
    imageUrl: coachImg4
  }
];
