import type { RequestHandler } from '@builder.io/qwik-city';

// Clears the session cookie and redirects to the login page
export const onGet: RequestHandler = (requestEvent) => {
  requestEvent.cookie.delete('admin_session', { path: '/' });
  throw requestEvent.redirect(302, '/admin/login');
};
