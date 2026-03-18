import { component$ } from '@builder.io/qwik';

import AlumniLogo from '~/media/clubes/Alumni.png?jsx';
import AtleticoDelRosarioLogo from '~/media/clubes/Atletico Del Rosario.png?jsx';
import BelgranoAthleticLogo from '~/media/clubes/Belgrano Athletic.png?jsx';
import BuenosAiresCRCLogo from '~/media/clubes/Buenos Aires C&RC.png?jsx';
import CASILogo from '~/media/clubes/CASI.png?jsx';
import CUBALogo from '~/media/clubes/CUBA.png?jsx';
import ChampagnatLogo from '~/media/clubes/Champagnat.png?jsx';
import HinduLogo from '~/media/clubes/Hindu.png?jsx';
import LPRCLogo from '~/media/clubes/LPRC.png?jsx';
import LosMatrerosLogo from '~/media/clubes/Los Matreros.png?jsx';
import LosTilosLogo from '~/media/clubes/Los Tilos.png?jsx';
import NewmanLogo from '~/media/clubes/Newman.png?jsx';
import RegatasBellaVistaLogo from '~/media/clubes/Regatas Bella Vista.png?jsx';
import SICLogo from '~/media/clubes/SIC.png?jsx';

const ClubLogos: Record<string, any> = {
  'Alumni': AlumniLogo,
  'Atletico Del Rosario': AtleticoDelRosarioLogo,
  'Belgrano Athletic': BelgranoAthleticLogo,
  'Buenos Aires C&RC': BuenosAiresCRCLogo,
  'CASI': CASILogo,
  'CUBA': CUBALogo,
  'Champagnat': ChampagnatLogo,
  'Hindu': HinduLogo,
  'LPRC': LPRCLogo,
  'Los Matreros': LosMatrerosLogo,
  'Los Tilos': LosTilosLogo,
  'Newman': NewmanLogo,
  'Regatas Bella Vista': RegatasBellaVistaLogo,
  'SIC': SICLogo,
};

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
      class="relative z-20 w-full bg-[#0a1128] -mt-12 md:-mt-24 shadow-2xl"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="bg-[#0a1128] text-white p-6 md:p-10 py-12 md:py-16 flex flex-col justify-center items-center text-center">
          <span class="text-[#FFD700] font-black tracking-widest uppercase mb-6 text-xl md:text-2xl" style={{ fontFamily: "'Oswald', sans-serif" }}>
            Último Resultado
          </span>
          {lastMatch ? (
            <div class="flex items-center justify-center gap-2 md:gap-4 mb-10 w-full">
              {/* Home Team */}
              <div class="flex flex-col items-center justify-center gap-2 flex-1">
                {ClubLogos[lastMatch.homeTeam] ? (
                  <div class="w-14 h-14 md:w-20 md:h-20 flex-shrink-0">
                    {(() => { const Logo = ClubLogos[lastMatch.homeTeam]; return <Logo class="w-full h-full object-contain drop-shadow-lg" loading="lazy" />; })()}
                  </div>
                ) : (
                  <img src={`/clubes/${lastMatch.homeTeam}.png`} alt={lastMatch.homeTeam} width="80" height="80" class="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-lg" loading="lazy" />
                )}
                <span class="text-xs md:text-sm text-gray-400 font-medium uppercase text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {lastMatch.homeTeam}
                </span>
              </div>

              {/* Scoreline */}
              <div class="px-2 md:px-8 text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none whitespace-nowrap" style={{ fontFamily: "'Oswald', sans-serif" }}>
                {lastMatch.homeScore} - {lastMatch.awayScore}
              </div>

              {/* Away Team */}
              <div class="flex flex-col items-center justify-center gap-2 flex-1">
                {ClubLogos[lastMatch.awayTeam] ? (
                  <div class="w-14 h-14 md:w-20 md:h-20 flex-shrink-0">
                    {(() => { const Logo = ClubLogos[lastMatch.awayTeam]; return <Logo class="w-full h-full object-contain drop-shadow-lg" loading="lazy" />; })()}
                  </div>
                ) : (
                  <img src={`/clubes/${lastMatch.awayTeam}.png`} alt={lastMatch.awayTeam} width="80" height="80" class="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-lg" loading="lazy" />
                )}
                <span class="text-xs md:text-sm text-gray-400 font-medium uppercase text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {lastMatch.awayTeam}
                </span>
              </div>
            </div>
          ) : (
            <h2 class="text-[8vw] lg:text-[5vw] font-black uppercase tracking-tighter mb-10 text-gray-600" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Sin resultados recientes
            </h2>
          )}
        </div>
        <div class="bg-[#FFD700] text-[#0a1128] p-6 md:p-10 py-12 md:py-16 flex flex-col justify-center items-center text-center">
          <span class="text-[#0a1128] font-black tracking-widest uppercase mb-6 text-xl md:text-2xl" style={{ fontFamily: "'Oswald', sans-serif" }}>
            Próximo Partido
          </span>
          {nextMatch ? (
            <div class="flex flex-col items-center justify-center mb-6 w-full">
              <div class="flex items-center justify-center gap-2 md:gap-4 mb-4 w-full">
                {/* Home Team */}
                <div class="flex flex-col items-center justify-center gap-2 flex-1">
                  {ClubLogos[nextMatch.homeTeam] ? (
                    <div class="w-14 h-14 md:w-20 md:h-20 flex-shrink-0">
                      {(() => { const Logo = ClubLogos[nextMatch.homeTeam]; return <Logo class="w-full h-full object-contain drop-shadow-xl" loading="lazy" />; })()}
                    </div>
                  ) : (
                    <img src={`/clubes/${nextMatch.homeTeam}.png`} alt={nextMatch.homeTeam} width="80" height="80" class="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-xl" loading="lazy" />
                  )}
                  <span class="text-xs md:text-sm text-[#0a1128]/70 font-medium uppercase text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {nextMatch.homeTeam}
                  </span>
                </div>

                <span class="px-2 md:px-8 text-5xl md:text-7xl font-black text-[#0a1128] uppercase tracking-tighter" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  VS
                </span>

                {/* Away Team */}
                <div class="flex flex-col items-center justify-center gap-2 flex-1">
                  {ClubLogos[nextMatch.awayTeam] ? (
                    <div class="w-14 h-14 md:w-20 md:h-20 flex-shrink-0">
                      {(() => { const Logo = ClubLogos[nextMatch.awayTeam]; return <Logo class="w-full h-full object-contain drop-shadow-xl" loading="lazy" />; })()}
                    </div>
                  ) : (
                    <img src={`/clubes/${nextMatch.awayTeam}.png`} alt={nextMatch.awayTeam} width="80" height="80" class="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-xl" loading="lazy" />
                  )}
                  <span class="text-xs md:text-sm text-[#0a1128]/70 font-medium uppercase text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {nextMatch.awayTeam}
                  </span>
                </div>
              </div>

              <div class="bg-[#0a1128] text-[#FFD700] px-6 py-2 rounded-lg mt-4 w-full md:w-auto">
                <p class="text-sm font-bold uppercase tracking-widest text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {
                    (typeof nextMatch.matchDate === 'string'
                      ? new Date(nextMatch.matchDate.replace(' ', 'T'))
                      : new Date(nextMatch.matchDate)
                    ).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', hour12: false })
                  } HS
                  {nextMatch.location && ` | ${nextMatch.location}`}
                </p>
              </div>
            </div>
          ) : (
            <h2 class="text-[8vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-none mb-6 text-[#0a1128]/50" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Pronto...
            </h2>
          )}
        </div>
      </div>

      {/* Centered "Ver Fixture" button */}
      <div class="flex justify-center -mt-5 relative z-10">
        <a
          href="/admin/partidos"
          class="inline-flex items-center gap-2 bg-[#0a1128] text-[#FFD700] border-2 border-[#FFD700] px-8 py-3 uppercase tracking-widest text-sm font-black hover:bg-[#FFD700] hover:text-[#0a1128] transition-all duration-300 shadow-lg"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Ver Fixture
        </a>
      </div>
    </section>
  );
});
