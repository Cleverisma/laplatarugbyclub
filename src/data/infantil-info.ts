export interface InfantilCategory {
  id: string;
  name: string;
  entrenadores: string[];
  manager: string;
  responsable: string;
}

export interface InfantilStaff {
  subcomision: string[];
  areaTecnica: string[];
}

export const infantilCategories: InfantilCategory[] = [
  {
    id: 'm14',
    name: 'M14',
    entrenadores: [
      'Fer', 'A.Festa',
      'Javi', 'F. Scarpinelli',
      'Bebi', 'Hernan',
      'Foca'
    ],
    manager: 'Cocol',
    responsable: 'Fefo Caffaso'
  },
  {
    id: 'm13',
    name: 'M13',
    entrenadores: [
      'Augusto', 'N.Tobias',
      'Jose Guliano', 'M. Barandiara',
      'Pablo Armisén', 'Joaquin',
      'Paloma'
    ],
    manager: 'Lucho Dilucca',
    responsable: 'Vaca Manuele'
  },
  {
    id: 'm12',
    name: 'M12',
    entrenadores: [
      'Laucha Gomila', 'Negro Mathie',
      'Piturro', 'A. Ondarcuhu',
      'Fede Raggio', 'E. Michelet',
      'Turco MQ'
    ],
    manager: 'Mati Zuccheri',
    responsable: 'Mario Morelli'
  },
  {
    id: 'm11',
    name: 'M11',
    entrenadores: [
      'German Brole', 'Patota',
      'Batata', 'Juan Grossi',
      'Colo F', 'T.Sorarrain',
      'Ruso DS'
    ],
    manager: 'M.Avalos',
    responsable: 'Chavo Merz'
  },
  {
    id: 'm10',
    name: 'M10',
    entrenadores: [
      'Cacha', 'G. Haidar',
      'Pilo Defe', 'H Napoli',
      'P. Toma', 'Nico Defetlito',
      'Pablo defelitto'
    ],
    manager: 'Toncho',
    responsable: 'Wen Odrio'
  },
  {
    id: 'm9',
    name: 'M9',
    entrenadores: [
      'Mosca', 'Pablo Di Giano',
      'A. Dambre', 'Diego R.P.',
      'Juanfri', 'José Roan',
      'Piri Sciarreta'
    ],
    manager: 'Ale Caino',
    responsable: 'Negro Pena'
  },
  {
    id: 'm8',
    name: 'M8',
    entrenadores: [
      'Fer Piovano', 'Manu Elica',
      'Borne', 'E.Gomila',
      'Agus L.Ruff', 'Manu Elicabe',
      'Luli Garcia M'
    ],
    manager: 'morelli oct.',
    responsable: 'Emi Grossi'
  },
  {
    id: 'm7',
    name: 'M7',
    entrenadores: [
      'Muralla', 'Juan Muñoz',
      'Sette', 'F.Ulibarrie',
      'Pipe G.Arzac'
    ],
    manager: '...',
    responsable: 'Chula Angelino'
  },
  {
    id: 'm6',
    name: 'M6',
    entrenadores: [
      'Santi Larrain', 'Vago Scia.',
      'Salvatico F.', 'F. Bibiloni',
      'Diego Calonje', 'Seb. Fuertes',
      'Vasco Liseda'
    ],
    manager: '...',
    responsable: 'Larry'
  },
  {
    id: 'escuelita',
    name: 'ESCUELITA',
    entrenadores: [
      'V.Bordalecu', '...',
      'Nano Arias'
    ],
    manager: '...',
    responsable: 'Edu A'
  }
];

export const infantilStaff: InfantilStaff = {
  subcomision: [
    'Patricio De Maestri',
    'Eugenio Addiechi',
    'Esteban Durante'
  ],
  areaTecnica: [
    'Francisco Scarpinelli',
    'M. Barandiaran',
    'A. Ondarcuhu',
    'Juan Grossi',
    'H Napoli',
    'Diego R.P.',
    'E.Gomila',
    'F. Bibiloni'
  ]
};
