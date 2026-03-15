import { Slot, component$ } from '@builder.io/qwik';
import { Link, useLocation, type LinkProps } from '@builder.io/qwik-city';

type NavLinkProps = LinkProps & { activeClass?: string };

export const NavLink = component$(({ activeClass, ...props }: NavLinkProps) => {
  const location = useLocation();
  const toPathname = props.href ?? '';
  const locationPathname = location.url.pathname;

  // Cleanup both paths: remove trailing slash (unless it's exactly '/')
  const cleanToPath = toPathname.split('?')[0].split('#')[0];
  const normLoc = locationPathname.endsWith('/') && locationPathname.length > 1 
    ? locationPathname.slice(0, -1) 
    : locationPathname;
  const normTo = cleanToPath.endsWith('/') && cleanToPath.length > 1 
    ? cleanToPath.slice(0, -1) 
    : cleanToPath;

  let isActive = normLoc === normTo;
  
  // Also check hash bounds
  if (toPathname.includes('#')) {
    const hash = toPathname.substring(toPathname.indexOf('#'));
    isActive = normLoc === normTo && location.url.hash === hash;
  }

  return (
    <Link
      {...props}
      class={[props.class, isActive ? activeClass : '']}
    >
      <Slot />
    </Link>
  );
});
