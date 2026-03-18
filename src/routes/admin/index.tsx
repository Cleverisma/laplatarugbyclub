import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';

export const useDashboardStats = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);

  const [divisions, boardMembers, matches, eventsCount] = await Promise.all([
    db.query.divisions.findMany({ with: { staffMembers: true } }),
    db.query.boardMembers.findMany(),
    db.query.matches.findMany(),
    db.query.events.findMany(),
  ]);

  const totalStaff = divisions.reduce(
    (sum, div) => sum + div.staffMembers.length,
    0,
  );

  const lastMatch = matches
    .filter((m) => m.status === 'played')
    .sort((a, b) => (a.matchDate < b.matchDate ? 1 : -1))[0];

  const nextMatch = matches
    .filter((m) => m.status === 'upcoming')
    .sort((a, b) => (a.matchDate > b.matchDate ? 1 : -1))[0];

  return {
    totalStaff,
    totalBoardMembers: boardMembers.length,
    totalDivisions: divisions.length,
    totalEvents: eventsCount.length,
    lastMatch: lastMatch
      ? {
          homeTeam: lastMatch.homeTeam,
          awayTeam: lastMatch.awayTeam,
          homeScore: lastMatch.homeScore,
          awayScore: lastMatch.awayScore,
          matchDate: lastMatch.matchDate,
        }
      : null,
    nextMatch: nextMatch
      ? {
          homeTeam: nextMatch.homeTeam,
          awayTeam: nextMatch.awayTeam,
          matchDate: nextMatch.matchDate,
          location: nextMatch.location,
        }
      : null,
  };
});

export const head: DocumentHead = {
  title: 'Dashboard — Admin | La Plata Rugby Club',
};

const StatCard = (props: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  color: string;
  href: string;
}) => (
  <Link href={props.href} class="block group">
    <div
      class={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
            {props.title}
          </p>
          <p class={`text-4xl font-black ${props.color}`}>{props.value}</p>
          {props.subtitle && (
            <p class="text-sm text-gray-500 mt-1">{props.subtitle}</p>
          )}
        </div>
        <div class={`text-3xl opacity-80`}>{props.icon}</div>
      </div>
      <div class="mt-4 flex items-center text-xs text-gray-400 group-hover:text-yellow-500 transition-colors font-medium">
        Ver detalles →
      </div>
    </div>
  </Link>
);

export default component$(() => {
  const stats = useDashboardStats();

  return (
    <div>
      {/* Page header */}
      <div class="mb-8">
        <h1
          class="text-3xl font-black text-gray-900"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Dashboard
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          Bienvenido al panel de administración de La Plata Rugby Club.
        </p>
      </div>

      {/* Stats grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Staff de entrenadores"
          value={stats.value.totalStaff}
          subtitle={`en ${stats.value.totalDivisions} divisiones`}
          icon="👥"
          color="text-[#0a1128]"
          href="/admin/staff"
        />
        <StatCard
          title="Comisión Directiva 2026"
          value={stats.value.totalBoardMembers}
          subtitle="miembros de la comisión"
          icon="🏛️"
          color="text-[#0a1128]"
          href="/admin/autoridades"
        />
        <StatCard
          title="Divisiones"
          value={stats.value.totalDivisions}
          subtitle="registradas"
          icon="📂"
          color="text-[#0a1128]"
          href="/admin/staff"
        />
        <StatCard
          title="Eventos"
          value={stats.value.totalEvents}
          subtitle="en cartelera"
          icon="📅"
          color="text-[#0a1128]"
          href="/admin/eventos"
        />
      </div>

      {/* Match info */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Last match */}
        <div class="bg-white rounded-xl border border-gray-200 p-6">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Último Resultado
          </p>
          {stats.value.lastMatch ? (
            <div class="text-center">
              <p class="text-sm text-gray-500 mb-3">
                {stats.value.lastMatch.matchDate}
              </p>
              <div class="flex items-center justify-center gap-4">
                <span class="font-bold text-gray-800 text-sm">
                  {stats.value.lastMatch.homeTeam}
                </span>
                <div class="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                  <span class="text-2xl font-black text-[#0a1128]">
                    {stats.value.lastMatch.homeScore ?? '-'}
                  </span>
                  <span class="text-gray-400 font-bold">–</span>
                  <span class="text-2xl font-black text-[#0a1128]">
                    {stats.value.lastMatch.awayScore ?? '-'}
                  </span>
                </div>
                <span class="font-bold text-gray-800 text-sm">
                  {stats.value.lastMatch.awayTeam}
                </span>
              </div>
            </div>
          ) : (
            <p class="text-gray-400 text-sm text-center py-4">Sin datos</p>
          )}
          <Link
            href="/admin/partidos"
            class="block mt-4 text-xs text-center text-gray-400 hover:text-yellow-500 transition-colors font-medium"
          >
            Gestionar partidos →
          </Link>
        </div>

        {/* Next match */}
        <div class="bg-white rounded-xl border border-gray-200 p-6">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Próximo Partido
          </p>
          {stats.value.nextMatch ? (
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-gray-800 text-sm">
                  {stats.value.nextMatch.homeTeam}
                </span>
                <span class="text-gray-400 font-bold text-sm">vs</span>
                <span class="font-bold text-gray-800 text-sm">
                  {stats.value.nextMatch.awayTeam}
                </span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500 mt-3">
                <span>📅</span>
                <span>{stats.value.nextMatch.matchDate}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span>📍</span>
                <span>{stats.value.nextMatch.location}</span>
              </div>
            </div>
          ) : (
            <p class="text-gray-400 text-sm text-center py-4">
              Sin próximos partidos cargados
            </p>
          )}
          <Link
            href="/admin/partidos"
            class="block mt-4 text-xs text-center text-gray-400 hover:text-yellow-500 transition-colors font-medium"
          >
            Gestionar partidos →
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <div class="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Acciones Rápidas
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/staff/new"
            class="inline-flex items-center justify-center gap-2 bg-[#0a1128] text-white text-sm font-semibold px-4 py-3 rounded-lg hover:bg-[#0f1d45] transition-colors shadow-sm"
          >
            + Nuevo miembro staff de entrenadores
          </Link>
          <Link
            href="/admin/autoridades/new"
            class="inline-flex items-center justify-center gap-2 bg-white text-[#0a1128] border border-gray-200 text-sm font-semibold px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            + Nueva autoridad comisión directiva 2026
          </Link>
          <Link
            href="/admin/partidos/new"
            class="inline-flex items-center justify-center gap-2 bg-white text-[#0a1128] border border-gray-200 text-sm font-semibold px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            + Nuevo partido
          </Link>
          <Link
            href="/admin/eventos/new"
            class="inline-flex items-center justify-center gap-2 bg-[#FFD700] text-[#0a1128] text-sm font-black px-4 py-3 rounded-lg hover:bg-yellow-400 transition-colors shadow-sm"
          >
            + Nuevo evento
          </Link>
        </div>
      </div>
    </div>
  );
});
