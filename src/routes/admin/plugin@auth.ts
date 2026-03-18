import type { RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = async ({ url, cookie, redirect, cacheControl }) => {
    // Prevent caching of any admin route!
    cacheControl({
        noCache: true,
        private: true,
        staleWhileRevalidate: 0,
    });

    const publicRoutes = ["/admin/login"];
    const isPublic = publicRoutes.some((path) => url.pathname.startsWith(path));

    // Verificar sesión (soportamos 'lprc_admin_auth' y 'admin_session' por retrocompatibilidad)
    const sessionCookie = cookie.get("lprc_admin_auth") || cookie.get("admin_session");
    const isAuthenticated = !!sessionCookie?.value;

    if (!isPublic && !isAuthenticated) {
        throw redirect(302, "/admin/login/");
    }
};
