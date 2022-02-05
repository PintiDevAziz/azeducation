import Link from 'next/link';
import React from 'react';
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineYoutube,
} from 'react-icons/ai';
import Typewriter from 'typewriter-effect';

const Footer = () => {
  const socialMenu = [
    {
      icon: <AiOutlineInstagram />,
      href: '/login',
    },
    {
      icon: <AiOutlineFacebook />,
      href: '/login',
    },
    {
      icon: <AiOutlineInstagram />,
      href: '/login',
    },
    {
      icon: <AiOutlineYoutube />,
      href: '/login',
    },
  ];
  return (
    <div className="flex h-20 place-content-center  place-items-center justify-between border-t-2  py-4 px-20">
      <div>
        <Typewriter
          options={{
            strings: [
              '© Butun Haqqlar Qorunur',
              'Developer : Aziz Imranzade',
              'Made by ❤',
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <div className="flex gap-x-4">
        {socialMenu.map((item, key) => (
          <Link href={item.href} key={key}>
            <a
              key={key}
              target={'_blank'}
              className="text-4xl hover:text-indigo-500"
            >
              {item.icon}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
