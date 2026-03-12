import { component$ } from '@builder.io/qwik';
import { boardMembers, coachesStaff, type BoardMember, type Coach } from '~/data/club-info';

export const BoardMemberCard = component$<{ boardMember: BoardMember }>(({ boardMember }) => {
  return (
    <div class="flex flex-col items-center text-center group w-full">
      <div class="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-2xl border-4 border-white group-hover:border-yellow-400 transition-colors duration-500 relative">
        {boardMember.imageUrl ? (
            <img 
              src={boardMember.imageUrl} 
              alt={boardMember.name} 
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
      <h3 class="text-2xl font-black text-blue-950 mb-2 group-hover:text-blue-700 transition-colors">{boardMember.name}</h3>
      <p class="text-blue-600 font-bold text-sm uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full">{boardMember.role}</p>
    </div>
  );
});


export const CoachCard = component$<{ coach: Coach }>(({ coach }) => {
  return (
    <div class="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group w-full h-full relative overflow-hidden">
        {/* Top accent line */}
        <div class="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
        
        <div class="w-28 h-28 rounded-full overflow-hidden mb-6 shadow-md border-4 border-blue-50 group-hover:border-yellow-400 transition-colors duration-500">
            {coach.imageUrl ? (
                <img src={coach.imageUrl} alt={coach.category} class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
            ) : (
                <div class="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 opacity-30" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                </div>
            )}
        </div>
        
        <h3 class="text-3xl font-black text-blue-950 mb-2 group-hover:text-blue-800 transition-colors">{coach.category}</h3>
        
        <div class="w-full mt-4 flex flex-col items-center space-y-4">
            <div class="w-full">
                <span class="block text-xs text-gray-400 uppercase font-black tracking-widest mb-1.5">Head Coach</span>
                <span class="text-xl font-bold text-blue-900">{coach.headCoach}</span>
            </div>
            
            {coach.assistants.length > 0 && (
                <div class="w-full pt-4 border-t border-gray-100">
                    <span class="block text-xs text-gray-400 uppercase font-black tracking-widest mb-1.5">Entrenadores</span>
                    <span class="text-gray-700 font-medium text-sm leading-relaxed">{coach.assistants.join(' • ')}</span>
                </div>
            )}
            
            {coach.manager && (
                <div class="w-full pt-4 border-t border-gray-100">
                    <span class="block text-xs text-gray-400 uppercase font-black tracking-widest mb-1.5">Manager</span>
                    <span class="text-gray-700 text-sm font-medium">{coach.manager}</span>
                </div>
            )}
        </div>
    </div>
  );
});

export const BoardMembers = component$(() => {
  return (
    <section class="py-24 md:py-32 bg-gray-50 relative border-t border-gray-200">
      <div class="container mx-auto px-4 max-w-7xl">
        {/* Board Members Section */}
        <div class="mb-32">
            <div class="text-center mb-20">
                <span class="text-yellow-500 font-bold uppercase tracking-widest text-sm mb-4 block">Nuestro Equipo</span>
                <h2 class="text-4xl md:text-6xl font-black text-blue-950 mb-6 tracking-tight">Comisión Directiva</h2>
                <div class="h-1.5 w-24 bg-yellow-400 mx-auto rounded-full mb-8"></div>
                <p class="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                  El equipo de trabajo que lidera nuestro club con compromiso y dedicación, velando siempre por el crecimiento institucional y deportivo bajo los valores de LPRC.
                </p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
              {boardMembers.map((member) => (
                <BoardMemberCard key={member.id} boardMember={member} />
              ))}
            </div>
        </div>

        {/* Coaches Staff Section */}
        <div>
            <div class="text-center mb-20">
                <h2 class="text-4xl md:text-5xl font-black text-blue-950 mb-6 tracking-tight">Staff de Entrenadores</h2>
                <div class="h-1.5 w-24 bg-yellow-400 mx-auto rounded-full mb-8"></div>
                <p class="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                  Quienes día a día forman a las nuevas generaciones de jugadores con compromiso, valores y pasión por el rugby.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {coachesStaff.map((coach) => (
                <CoachCard key={coach.id} coach={coach} />
              ))}
            </div>
        </div>
        
        <div class="mt-20 text-center">
            <a href="/institucional" class="inline-block text-blue-900 border-b-2 border-blue-900 pb-1 font-bold text-lg hover:text-yellow-500 hover:border-yellow-500 transition-colors uppercase tracking-wide">
                Ver todo el equipo
            </a>
        </div>
      </div>
    </section>
  );
});
