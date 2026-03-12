import { component$ } from '@builder.io/qwik';

export const Institutional = component$(() => {
  return (
    <section id="institucional" class="w-full bg-blue-950 py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/40 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

      <div class="container mx-auto px-4 max-w-7xl relative z-10">
        <div class="flex items-center gap-4 mb-16 md:mb-20">
          <div class="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-yellow-400 border-b-[8px] border-b-transparent"></div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Bienvenidos a La Plata Rugby Club
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 text-blue-100 text-lg md:text-xl leading-relaxed font-light">
          {/* Left Column */}
          <div class="space-y-8">
            <p>
              Somos parte del rugby argentino desde 1934, siendo el primer club de
              rugby de la ciudad.
            </p>
            <p>
              Un grupo de jugadores platenses pensó en fundar una institución para
              disfrutar de este deporte, difundirlo en la ciudad y colaborar en la
              formación de buenas personas. Hoy, sigue siendo ese nuestro foco:{' '}
              <strong class="font-semibold text-white">
                “formar buenas personas que disfruten del rugby”.
              </strong>
            </p>
            <p>
              El Club, como le decimos nosotros, es un espacio abierto a todos. Es el
              lugar que elegimos para hacernos amigos, disfrutar del rugby, aprender y
              enseñar. <strong class="font-semibold text-yellow-400">Es nuestra casa.</strong>
            </p>
          </div>

          {/* Right Column */}
          <div class="space-y-8">
            <p>
              El Club, es el lugar donde nos escuchamos, compartimos muchísimos
              momentos, nos divertimos y pasamos tiempo de valor. Es “ese lugar” donde
              nos guía el pensar en el otro, el ser solidario, humilde y respetuosos.
            </p>
            
            <div class="bg-blue-900/30 p-8 rounded-2xl border border-blue-800/50 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
              <div class="absolute -right-4 -top-4 text-7xl opacity-5 transform group-hover:scale-110 transition-transform duration-500 pointer-events-none">🏆</div>
              <p class="text-3xl mb-4 tracking-widest text-yellow-500">🏆 🏆 🏆</p>
              <p class="text-blue-50">
                Tenemos el honor de contar con 3 campeonatos con nuestra Primera:{' '}
                <span class="font-semibold text-white">en 1995, Campeones de la UAR; en 1998 Copa Federal de Clubes y en 2007 Campeones del Nacional de Clubes.</span>
              </p>
            </div>

            <div class="pt-4 border-t border-blue-900/50">
              <p class="text-white text-xl font-medium mb-6">
                ¡Te invitamos a que nos visites, nos conozcas y seas parte!
              </p>
              <p class="text-base text-blue-200">
                Conocé más sobre nosotros en nuestras redes o comunicate por las vías
                oficiales.
                <br />
                <strong class="font-bold text-white uppercase tracking-wide mt-2 block">Siempre serás bienvenido!</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
