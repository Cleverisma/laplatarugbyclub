import { component$ } from '@builder.io/qwik';

export interface BoardMemberProps {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
}

const MOCK_BOARD_MEMBERS: BoardMemberProps[] = [
  {
    id: '1',
    name: 'José Manuel Roán',
    role: 'Presidente',
    imageUrl: '/images/board/presidente.jpg'
  },
  {
    id: '2',
    name: 'Nombre Apellido',
    role: 'Vicepresidente',
  },
  {
    id: '3',
    name: 'Nombre Apellido',
    role: 'Secretario',
  },
  {
    id: '4',
    name: 'Nombre Apellido',
    role: 'Tesorero',
  }
];

export const BoardMemberCard = component$<BoardMemberProps>(({ name, role, imageUrl }) => {
  return (
    <div class="flex flex-col items-center text-center group w-full">
      <div class="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-2xl border-4 border-white group-hover:border-yellow-400 transition-colors duration-500 relative">
        {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name} 
              class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out" 
            />
        ) : (
            <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-400 group-hover:bg-blue-50 transition-colors duration-500">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mb-2 opacity-30" viewBox="0 0 20 20" fill="currentColor">
                   <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                 </svg>
            </div>
        )}
        <div class="absolute inset-0 rounded-full ring-inset ring-2 ring-black/5 pointer-events-none"></div>
      </div>
      <h3 class="text-2xl font-black text-blue-950 mb-2 group-hover:text-blue-700 transition-colors">{name}</h3>
      <p class="text-blue-600 font-bold text-sm uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full">{role}</p>
    </div>
  );
});

export const BoardMembers = component$(() => {
  return (
    <section class="py-24 md:py-32 bg-gray-50 relative border-t border-gray-200">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-20">
            <span class="text-yellow-500 font-bold uppercase tracking-widest text-sm mb-4 block">Nuestro Equipo</span>
            <h2 class="text-4xl md:text-6xl font-black text-blue-950 mb-6 tracking-tight">Comisión Directiva</h2>
            <div class="h-1.5 w-24 bg-yellow-400 mx-auto rounded-full mb-8"></div>
            <p class="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              El equipo de trabajo que lidera nuestro club con compromiso y dedicación, velando siempre por el crecimiento institucional y deportivo bajo los valores de LPRC.
            </p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {MOCK_BOARD_MEMBERS.map((member) => (
            <BoardMemberCard key={member.id} {...member} />
          ))}
        </div>
        
        <div class="mt-20 text-center">
            <a href="/institucional" class="inline-block text-blue-900 border-b-2 border-blue-900 pb-1 font-bold text-lg hover:text-yellow-500 hover:border-yellow-500 transition-colors uppercase tracking-wide">
                Ver todos los miembros
            </a>
        </div>
      </div>
    </section>
  );
});
