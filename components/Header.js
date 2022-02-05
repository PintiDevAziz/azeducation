import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import LoginButton from '../components/LoginButton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import LogOutButton from '../components/LogOutButton';
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
    <div className=" flex h-[5rem] w-full items-center justify-between px-20 glassorism">
      <div className="italic text-indigo-500 font-semibold tracking-wider  text-2xl">AzEducation</div>
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
        {user ? <LogOutButton /> : <LoginButton />}
      </ul>
    </div>
  );
};

export default Header;
