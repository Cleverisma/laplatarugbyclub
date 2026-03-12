import { component$ } from '@builder.io/qwik';
import post1Img from '~/media/4.jpeg';
import post2Img from '~/media/5.jpeg';
import post3Img from '~/media/6.jpeg';
import post4Img from '~/media/7.jpeg';
import post5Img from '~/media/8.jpeg';
import post6Img from '~/media/9.jpeg';

export interface InstagramPostProps {
  id: string;
  imageUrl: string;
  link: string;
  likes: number;
}

const MOCK_POSTS: InstagramPostProps[] = [
  { id: 'post-1', imageUrl: post1Img, link: 'https://instagram.com/laplatarugbyclub', likes: 342 },
  { id: 'post-2', imageUrl: post2Img, link: 'https://instagram.com/laplatarugbyclub', likes: 512 },
  { id: 'post-3', imageUrl: post3Img, link: 'https://instagram.com/laplatarugbyclub', likes: 289 },
  { id: 'post-4', imageUrl: post4Img, link: 'https://instagram.com/laplatarugbyclub', likes: 876 },
  { id: 'post-5', imageUrl: post5Img, link: 'https://instagram.com/laplatarugbyclub', likes: 120 },
  { id: 'post-6', imageUrl: post6Img, link: 'https://instagram.com/laplatarugbyclub', likes: 450 },
];

export const SocialFeed = component$(() => {
  return (
    <section class="py-24 bg-white relative">
      {/* Decorative patterns */}
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
            <span class="text-yellow-500 font-bold uppercase tracking-widest text-sm mb-4 block">Comunidad</span>
            <h2 class="text-4xl md:text-6xl font-black text-blue-950 mb-6 tracking-tight">Seguinos en Instagram</h2>
            <p class="text-gray-500 max-w-2xl mx-auto text-lg">
                Mantenete al día con las últimas novedades, resultados y la vida de nuestro club en 
                <a href="https://instagram.com/laplatarugbyclub" target="_blank" class="text-blue-600 font-bold hover:text-blue-800 ml-1">@laplatarugbyclub</a>
            </p>
        </div>
        
        {/* Changed grid explicitly to 3 cols on md, and 2 cols on mobile for 6 posts */}
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
          {MOCK_POSTS.map((post, i) => (
            <a 
                key={post.id} 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                class={`relative aspect-square bg-gray-100 group overflow-hidden block ${i === 0 ? 'rounded-tl-3xl' : ''} ${i === 2 ? 'md:rounded-tr-3xl' : ''} ${i === 3 ? 'md:rounded-bl-3xl' : ''} ${i === 5 ? 'rounded-br-3xl' : ''} rounded-xl`}
            >
              <img src={post.imageUrl} alt="Instagram Post" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              
              <div class="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex flex-col items-center justify-center">
                  <div class="text-white font-bold flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      <span class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" /></svg>
                        {post.likes}
                      </span>
                  </div>
              </div>
            </a>
          ))}
        </div>
        
        <div class="mt-16 text-center">
             <a href="https://instagram.com/laplatarugbyclub" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-bold py-4 px-10 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Visitar nuestro perfil
            </a>
        </div>
      </div>
    </section>
  );
});
