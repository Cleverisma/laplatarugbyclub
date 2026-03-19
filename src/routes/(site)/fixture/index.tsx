import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { matches } from '~/db/schema';
import { asc } from 'drizzle-orm';
import { getClubLogoPath } from '~/components/home/match-center/match-center';
import bgImage from '~/media/3.jpeg';
import urbaLogo from '~/media/urba.png';

export const useFixtureLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  
  const allMatches = await db.query.matches.findMany({
    orderBy: [asc(matches.matchDate)],
  });

  // Datos simulados (mock) para la Tabla de Posiciones, dado que no hay tabla en DB
  const mockStandings = [
    { pos: 1, team: 'Newman', pts: 45, pld: 12, w: 10, d: 0, l: 2 },
    { pos: 2, team: 'SIC', pts: 42, pld: 12, w: 9, d: 1, l: 2 },
    { pos: 3, team: 'Alumni', pts: 40, pld: 12, w: 8, d: 1, l: 3 },
    { pos: 4, team: 'Belgrano Athletic', pts: 38, pld: 12, w: 8, d: 0, l: 4 },
    { pos: 5, team: 'CASI', pts: 35, pld: 12, w: 7, d: 1, l: 4 },
    { pos: 6, team: 'LPRC', pts: 33, pld: 12, w: 7, d: 0, l: 5 },
    { pos: 7, team: 'Hindu', pts: 28, pld: 12, w: 6, d: 0, l: 6 },
    { pos: 8, team: 'CUBA', pts: 25, pld: 12, w: 5, d: 1, l: 6 },
    { pos: 9, team: 'Regatas Bella Vista', pts: 22, pld: 12, w: 4, d: 1, l: 7 },
    { pos: 10, team: 'Buenos Aires C&RC', pts: 18, pld: 12, w: 3, d: 0, l: 9 },
    { pos: 11, team: 'Los Tilos', pts: 15, pld: 12, w: 2, d: 1, l: 9 },
    { pos: 12, team: 'Champagnat', pts: 10, pld: 12, w: 1, d: 0, l: 11 },
  ];

  return { allMatches, standings: mockStandings };
});

export const head: DocumentHead = {
  title: 'Fixture y Posiciones | La Plata Rugby Club',
  meta: [
    {
      name: 'description',
      content: 'Fixture oficial de los partidos del Plantel Superior y tabla de posiciones del torneo.',
    },
  ],
};

export default component$(() => {
  const dataLoader = useFixtureLoader();
  const { allMatches, standings } = dataLoader.value;

  return (
    <main class="flex flex-col min-h-screen selection:bg-yellow-400 selection:text-blue-950 bg-[#0a1128]">
      {/* Hero Header */}
      <section 
        class="relative w-full py-32 md:py-48 px-4 flex flex-col items-center justify-center z-10 bg-cover bg-center"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)',
          marginBottom: '-4vw',
          backgroundImage: `linear-gradient(rgba(10, 17, 40, 0.85), rgba(10, 17, 40, 0.95)), url(${bgImage})`
        }}
      >
        <h1 
          class="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter text-center leading-none drop-shadow-lg"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          FIXTURE & <span class="text-yellow-400">POSICIONES</span>
        </h1>
        <div class="h-1 w-24 md:w-32 bg-yellow-400 mt-8 mb-6 mx-auto" />
      </section>

      <section class="pb-24 pt-24 md:pt-32 relative border-t border-white/5 flex-1">
        <div class="container mx-auto px-4 max-w-[95vw] lg:max-w-7xl relative z-30">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-16 items-start">
            
            {/* Left Column: FIXTURE */}
            <div class="lg:col-span-7 space-y-8">
              <div class="flex items-center gap-4 md:gap-6 mb-8">
                <h2 class="text-3xl md:text-4xl font-black text-white uppercase tracking-widest leading-none drop-shadow-sm flex items-center gap-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  Torneo <span class="text-[#FFD700]">URBA</span>
                </h2>
                <img src={urbaLogo} alt="URBA" width="120" height="48" class="h-10 md:h-14 w-auto object-contain drop-shadow-lg" loading="lazy" />
                <div class="h-px flex-1 bg-white/10" />
              </div>

              <div class="flex flex-col gap-4">
                {allMatches?.map((match) => {
                  const dateObj = typeof match.matchDate === 'string'
                    ? new Date(match.matchDate.replace(' ', 'T'))
                    : new Date(match.matchDate);
                  
                  const formattedDate = dateObj.toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  });

                  return (
                    <div key={match.id} class="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-xl overflow-hidden relative group">
                      
                      <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300" />
                      
                      <div class="text-gray-400 text-sm font-bold tracking-widest whitespace-nowrap text-center md:text-left z-10 w-full md:w-32 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {formattedDate} hs
                      </div>

                      <div class="flex items-center justify-center gap-2 md:gap-4 flex-1 w-full z-10">
                        <div class="flex items-center gap-3 md:gap-4 w-[45%] justify-end">
                          <span class="text-white font-bold text-sm md:text-lg text-right uppercase tracking-wider">{match.homeTeam}</span>
                          <img src={getClubLogoPath(match.homeTeam)} alt={match.homeTeam} width="40" height="40" class="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-md" loading="lazy" />
                        </div>

                        <div class="flex-none font-black text-center w-16 md:w-20" style={{ fontFamily: "'Oswald', sans-serif" }}>
                          {match.status === 'played' ? (
                            <span class="text-yellow-400 text-xl md:text-3xl whitespace-nowrap drop-shadow-md">{match.homeScore} - {match.awayScore}</span>
                          ) : (
                            <span class="text-gray-500 text-sm uppercase tracking-widest">vs</span>
                          )}
                        </div>

                        <div class="flex items-center gap-3 md:gap-4 w-[45%] justify-start">
                          <img src={getClubLogoPath(match.awayTeam)} alt={match.awayTeam} width="40" height="40" class="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-md" loading="lazy" />
                          <span class="text-white font-bold text-sm md:text-lg text-left uppercase tracking-wider">{match.awayTeam}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {(!allMatches || allMatches.length === 0) && (
                  <div class="p-12 text-center bg-white/5 border border-white/10 rounded-xl">
                    <p class="text-gray-400 italic font-medium">No hay partidos cargados para la temporada.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: TABLA DE POSICIONES */}
            <div class="lg:col-span-5 relative mt-12 lg:mt-0">
              <div class="sticky top-24 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
                
                <h3 class="text-2xl font-black text-white uppercase tracking-widest mb-6 text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  Tabla de Posiciones
                </h3>
                
                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse min-w-[300px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <thead>
                      <tr class="border-b-2 border-white/10 text-gray-400 uppercase tracking-widest text-[10px] md:text-xs">
                        <th class="py-3 px-2 text-center w-8">Pos</th>
                        <th class="py-3 px-2">Club</th>
                        <th class="py-3 px-2 text-center w-8 text-yellow-400 font-bold">Pts</th>
                        <th class="py-3 px-2 text-center w-8">PJ</th>
                      </tr>
                    </thead>
                    <tbody class="text-sm">
                      {standings.map((row) => {
                        const isLPRC = row.team === 'LPRC';
                        return (
                          <tr 
                            key={row.team} 
                            class={`border-b border-white/5 transition-colors duration-200 ${
                              isLPRC ? 'bg-yellow-400/10' : 'hover:bg-white/5'
                            }`}
                          >
                            <td class={`py-3 px-2 text-center font-bold ${isLPRC ? 'text-yellow-400' : 'text-gray-400'}`}>
                              {row.pos}º
                            </td>
                            <td class="py-3 px-2">
                              <div class="flex items-center gap-3">
                                <img src={getClubLogoPath(row.team)} alt={row.team} width="24" height="24" class="w-5 h-5 md:w-6 md:h-6 object-contain" />
                                <span class={`font-bold uppercase tracking-wide text-xs md:text-sm ${isLPRC ? 'text-yellow-400' : 'text-white'}`}>
                                  {row.team}
                                </span>
                              </div>
                            </td>
                            <td class={`py-3 px-2 text-center font-black ${isLPRC ? 'text-yellow-400' : 'text-white'}`}>
                              {row.pts}
                            </td>
                            <td class="py-3 px-2 text-center text-gray-400 font-mono">
                              {row.pld}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div class="mt-6 text-center text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                  * Datos simulados (Mock) sujetos a actualización oficial.
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
});
