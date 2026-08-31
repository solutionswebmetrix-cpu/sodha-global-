import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

interface RouterContextValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function getHashPath(): string {
  const hash = window.location.hash.slice(1);
  if (!hash || hash === '/') return '/';
  return hash.startsWith('/') ? hash : '/' + hash;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<string>(getHashPath());

  useEffect(() => {
    const handler = () => {
      setPath(getHashPath());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', handler);
    if (!window.location.hash) {
      window.location.hash = '/';
    }
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = useCallback((to: string) => {
    const target = to.startsWith('/') ? to : '/' + to;
    if (getHashPath() === target) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = target;
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}

export function Link({
  to,
  children,
  className,
  onClick,
  ...rest
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: unknown;
}) {
  const { navigate } = useRouter();
  return (
    <a
      href={'#' + (to.startsWith('/') ? to : '/' + to)}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
