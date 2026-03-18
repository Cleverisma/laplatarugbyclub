import { component$ } from '@builder.io/qwik';

export const Contact = component$(() => {
  return (
    <section id="contacto" class="w-full bg-blue-950 pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Accents */}
      <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      
      <div class="container mx-auto px-4 max-w-7xl relative z-10">
        <div class="flex items-center gap-4 mb-12">
          <div class="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-yellow-400 border-b-[6px] border-b-transparent"></div>
          <h2 class="text-3xl md:text-5xl font-black text-white tracking-tight">
            Contactate con nosotros!
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Informacion de Contacto y Accesos */}
          <div class="flex flex-col justify-center space-y-10 text-blue-100">
            {/* Ubicacion */}
            <div>
              <p class="text-xl md:text-2xl font-light mb-6 leading-relaxed">
                Camino Parque Centenario entre 495 y 496, B1897 Gonnet, Provincia de Buenos Aires
              </p>
              
              <div class="space-y-4">
                <div class="flex items-center gap-3 bg-blue-900/40 p-4 rounded-xl border border-blue-800/50">
                  <div class="bg-blue-800 p-2 rounded-full text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p class="text-lg"><strong class="font-bold text-white">Acceso Visitantes:</strong> por calle 496</p>
                </div>

                <div class="flex items-center gap-3 bg-blue-900/40 p-4 rounded-xl border border-blue-800/50">
                  <div class="bg-blue-800 p-2 rounded-full text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <p class="text-lg"><strong class="font-bold text-white">Acceso Socios:</strong> por calle 495</p>
                </div>
              </div>
            </div>

            <div class="w-full h-px bg-blue-900/50"></div>

            {/* Teléfonos y Redes */}
            <div class="space-y-6">
              <div class="flex flex-col sm:flex-row gap-4 sm:items-center text-lg">
                <a href="tel:02214840412" class="group flex items-center gap-3 font-semibold text-white hover:text-yellow-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400 group-hover:text-yellow-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  #0221.484.0412
                </a>
                
                <span class="hidden sm:inline-block text-blue-700">|</span>
                
                <a href="https://wa.me/5492216796537" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 text-blue-200 hover:text-green-400 transition-colors font-medium">
                  Envianos un WA! 
                  <span class="font-bold text-white group-hover:text-green-400 transition-colors">+54 9 221 679-6537</span>
                </a>
              </div>

              {/* Botones de Redes Simplificados */}
              <div class="flex items-center gap-6 pt-2">
                <a href="https://facebook.com/laplatarugbyclub" target="_blank" rel="noopener noreferrer" class="text-white hover:text-blue-500 transition-colors" aria-label="Facebook">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="https://twitter.com/laplatarugby" target="_blank" rel="noopener noreferrer" class="text-white hover:text-gray-400 transition-colors" aria-label="X (Twitter)">
                  <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://instagram.com/laplatarugbyclub" target="_blank" rel="noopener noreferrer" class="text-white hover:text-pink-500 transition-colors" aria-label="Instagram">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Mapa Incrustado */}
          <div class="w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/5 relative group">
            <div class="absolute inset-0 bg-blue-900/10 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6546.533883975426!2d-58.02647156993804!3d-34.874642546223704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2dde540f0a8b7%3A0x8e7c182b3e08d5fc!2sLa%20Plata%20Rugby%20Club!5e0!3m2!1ses!2sar!4v1773347544680!5m2!1ses!2sar" 
              width="100%" 
              height="100%" 
              style="border:0;" 
              allowFullscreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              class="filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 h-full object-cover"
              title="Mapa de La Plata Rugby Club"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
});
