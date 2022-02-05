import React from 'react';
import Link from 'next/link';
const LoginButton = () => {
  return (
    <Link href={'/login'}>
      <a className="flex h-10 w-32 items-center justify-center rounded bg-indigo-600 text-[17px] text-white transition-all hover:bg-indigo-500">
        Daxil Ol
      </a>
    </Link>
  );
};

export default LoginButton;
