import { component$ } from '@builder.io/qwik';
import { Button } from '~/components/ui/button/button';

export interface MatchCenterProps {
  lastMatch?: {
    id: number;
    status: string;
    matchDate: string | Date;
    homeTeam: string;
    awayTeam: string;
    homeScore: number | null;
    awayScore: number | null;
    location: string;
    competition: string | null;
  };
  nextMatch?: {
    id: number;
    status: string;
    matchDate: string | Date;
    homeTeam: string;
    awayTeam: string;
    homeScore: number | null;
    awayScore: number | null;
    location: string;
    competition: string | null;
  };
}

export const MatchCenter = component$(({ lastMatch, nextMatch }: MatchCenterProps) => {
  return (
    <section 
      class="relative z-10 w-full bg-[#0a1128]"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6vw), 0 100%)',
        marginBottom: '-6vw'
      }}
    >
      <div class="grid grid-cols-1 lg:grid-cols-2">
        {/* Last Result */}
        <div class="bg-[#0a1128] text-white pt-[14vw] pb-[10vw] lg:pt-[10vw] lg:pb-[14vw] px-6 md:px-12 flex flex-col justify-center items-center text-center">
          <span class="text-[#FFD700] font-black tracking-widest uppercase mb-6 text-xl md:text-2xl" style={{ fontFamily: "'Oswald', sans-serif" }}>
            Último Resultado
          </span>
          {lastMatch ? (
            <h2 class="text-[18vw] md:text-[14vw] lg:text-[10vw] font-black uppercase tracking-tighter leading-none mb-10 flex items-center justify-center gap-4 md:gap-8" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <span class="flex flex-col items-center">
                 <span class="text-3xl lg:text-5xl text-gray-400 mb-2 truncate max-w-[150px]">{lastMatch.homeTeam}</span>
                 <span class="text-[#FFD700]">{lastMatch.homeScore}</span>
              </span>
              <span class="text-gray-600 text-[12vw] lg:text-[8vw] leading-none mb-4 md:mb-6">-</span>
              <span class="flex flex-col items-center">
                 <span class="text-3xl lg:text-5xl text-gray-400 mb-2 truncate max-w-[150px]">{lastMatch.awayTeam}</span>
                 <span class="text-white">{lastMatch.awayScore}</span>
              </span>
            </h2>
          ) : (
             <h2 class="text-[8vw] lg:text-[5vw] font-black uppercase tracking-tighter mb-10 text-gray-600" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Sin resultados recientes
             </h2>
          )}
          <div class="flex gap-8 items-center mt-auto">
            <div class="w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-full flex items-center justify-center font-black text-xl md:text-3xl text-gray-400">P</div>
            <span class="text-2xl md:text-4xl font-black text-gray-600">VS</span>
            <div class="w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-full flex items-center justify-center font-black text-xl md:text-3xl text-gray-400">S</div>
          </div>
        </div>

        {/* Next Match */}
        <div class="bg-[#FFD700] text-[#0a1128] pt-[10vw] pb-[18vw] lg:pt-[10vw] lg:pb-[14vw] px-6 md:px-12 flex flex-col justify-center items-center text-center">
          <span class="text-[#0a1128] font-black tracking-widest uppercase mb-6 text-xl md:text-2xl" style={{ fontFamily: "'Oswald', sans-serif" }}>
            Próximo Partido
          </span>
          {nextMatch ? (
            <>
              <h2 class="text-[14vw] md:text-[10vw] lg:text-[8vw] font-black uppercase tracking-tighter leading-none mb-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
                VS {nextMatch.awayTeam}
              </h2>
              <p class="text-[6vw] md:text-[4vw] lg:text-[3vw] font-black uppercase tracking-tight mb-12 text-[#0a1128]/80" style={{ fontFamily: "'Oswald', sans-serif" }}>
                {
                  (typeof nextMatch.matchDate === 'string' 
                    ? new Date(nextMatch.matchDate.replace(' ', 'T')) 
                    : new Date(nextMatch.matchDate)
                  ).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute:'2-digit', hour12: false })
                } HS
              </p>
            </>
          ) : (
            <h2 class="text-[8vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-none mb-6 text-[#0a1128]/50" style={{ fontFamily: "'Oswald', sans-serif" }}>
               Pronto...
            </h2>
          )}
          <div class="mt-auto">
            <a href="https://fixture.urba.org.ar/home" target="_blank" rel="noopener noreferrer" class="inline-block">
              <Button
                look="primary"
                size="lg"
                class="rounded-none bg-[#0a1128] text-[#FFD700] border-none hover:bg-white hover:text-[#0a1128] font-black uppercase tracking-widest text-xl transition-all duration-300 px-8 py-6 md:px-16 md:py-8"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                VER FIXTURE
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});
