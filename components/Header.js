import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { AwesomeButton } from 'react-awesome-button';
import { signOut } from 'firebase/auth';
const Header = () => {
  //! User
  const [user, userLoading, userError] = useAuthState(auth);
  const router = useRouter();
  const [mousePostion, setMousePostion] = useState({
    x: 708,
    y: 0,
  });
  const [hidden, setHidden] = useState(true);
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
      <ul
        className="relative flex items-center gap-x-6"
        onMouseEnter={() => {
          setHidden(false);
        }}
        onMouseLeave={() => {
          setHidden(true);
        }}
        onMouseMove={(e) => {
          if (!user) {
            if (e.clientX > 708 && e.clientX < 1150) {
              if (e.clientX < 770 || e.clientX < 880) {
                setMousePostion({ x: 800 });
              } else if (e.clientX < 900 || e.clientX < 1030) {
                setMousePostion({ x: 950 });
              } else if (e.clientX < 1050 || e.clientX < 1125) {
                setMousePostion({ x: 1080 });
              } else if (e.clientX < 1150 || e.clientX < 1283) {
                setMousePostion({ x: 1220 });
              }
            }
          }
        }}
      >
        <div
          className={`absolute  top-10 transition-all ${
            user ? 'hidden' : 'block'
          }`}
          style={{
            left: mousePostion.x - 840,
            transform: `scale(${hidden ? '0' : '1'})`,
          }}
        >
          <div className=" relative flex h-14 w-[16rem] animate-pulse items-center justify-center rounded bg-indigo-500 font-semibold  text-white">
            <div className="absolute -top-[0.5px] right-1/2 -z-10 h-10 w-10 translate-x-1/2 rotate-45 bg-indigo-500 "></div>
            Aktiv etmək üçün daxil ol
          </div>
        </div>

        {menu &&
          menu.map((item, key) => (
            <Link href={item.href} key={key}>
              <a
                className={` group relative font-semibold ${
                  item.href === router.asPath
                    ? 'text-indigo-600'
                    : 'text-[#27263B]'
                }  transition-all hover:text-indigo-600 ${
                  user
                    ? null
                    : ' pointer-events-none text-gray-300 first-of-type:pointer-events-auto first-of-type:text-indigo-500'
                } `}
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
