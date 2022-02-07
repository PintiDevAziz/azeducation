import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { AwesomeButton } from 'react-awesome-button';
import { signOut } from 'firebase/auth';
const Header = () => {
  //! User
  const [user, userLoading, userError] = useAuthState(auth);
  const router = useRouter();
  const menu = [
    {
      title: 'Ev',
      href: '/',
    },
    {
      title: 'Video Dərslər',
      href: '/video-lessons',
    },
    {
      title: 'Online Sınaqlar',
      href: '/exams',
    },
    {
      title: 'Kitabxana',
      href: '/books',
    },
    {
      title: 'Pomodoro Timer',
      href: '/pomodoro-timer',
    },
  ];
  return (
    <div className=" glassorism flex h-[5rem] w-full items-center justify-between px-20">
      <div className="text-2xl font-semibold italic tracking-wider  text-indigo-500">
        AzEducation
      </div>
      <ul className="flex items-center gap-x-6">
        {menu &&
          menu.map((item, key) => (
            <Link href={item.href} key={key}>
              <a
                className={` font-semibold ${
                  item.href === router.asPath
                    ? 'text-indigo-600'
                    : 'text-[#27263B]'
                }  transition-all hover:text-indigo-600 `}
              >
                {item.title}
              </a>
            </Link>
          ))}
        {user ? (
          <AwesomeButton
            type="primary"
            size={'medium'}
            action={() => {
              signOut(auth);
            }}
          >
            Çıxış Et
          </AwesomeButton>
        ) : (
          <AwesomeButton
            type="primary"
            size={'medium'}
            action={() => {
              router.push('/login');
            }}
          >
            Daxil Ol
          </AwesomeButton>
        )}
      </ul>
    </div>
  );
};

export default Header;
