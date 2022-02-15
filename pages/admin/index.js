import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../components/Loading';
import { auth } from '../../firebase/firebase';

const Index = () => {
  const [user, userLoadin, userError] = useAuthState(auth);

  //! router
  const router = useRouter();
  const authAdmin = () => {
    if (user?.email === 'admin@gmail.com') {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (user || !user) {
      if (!authAdmin()) {
        router.push('/');
      }
    }
  }, [user]);
  return (
    <div className="flex h-[calc(100vh-5rem)] items-center justify-center">
      {user ? (
        <div className="h-full w-full">
          {authAdmin() ? (
            <div className="h-full w-full  p-20">
              <AwesomeButton
                type="primary"
                ripple={true}
                href={'/admin/addtest'}
              >
                Yeni Test Əlavə Et
              </AwesomeButton>
            </div>
          ) : null}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Index;
