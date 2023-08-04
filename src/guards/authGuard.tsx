// guards/AuthGuard.tsx
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      // Handle loading state
      return;
    }

    if (!session) {
      // Redirect to the login page if the user is not authenticated
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      signIn();
    }
  }, [router, session, status]);

  // Render the children only if authenticated or during the loading state
  return status === 'loading' ? <div>Loading...</div> : <>{children}</>;
};

export default AuthGuard;
