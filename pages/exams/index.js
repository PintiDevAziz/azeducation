import { collection, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import Loading from '../../components/Loading';
const Exams = () => {
  const [exams, setExams] = useState([]);
  const colRef = collection(db, '/exams');

  useEffect(() => {
    onSnapshot(colRef, (snap) => {
      setExams(snap.docs.map((d) => d.data()));
    });
  }, []);
  const categories = [
    {
      title: 'Azərbaycan Dili',
      href: '/az-dili',
    },
    {
      title: 'Riyaziyyat',
      href: '/riyaziyyat',
    },
    {
      title: 'Ingilis Dili',
      href: '/ingilis-dili',
    },
    {
      title: 'Tarix',
      href: '/tarix',
    },
  ];
  return (
    <div className="flex h-[calc(100vh-5rem)] items-center justify-center items-center">
      {exams.length ? (
        <div className="flex h-[calc(100vh-5rem)]  flex-wrap justify-around p-10 ">
          {categories.map((category, key) => (
            <Link href={`/exams/${category.href}`} key={key}>
              <a className="glassorism group flex h-[10rem] w-[25rem] items-center justify-center  gap-x-10 rounded-full transition-all hover:scale-105">
                <div className="flex h-[5rem] w-[5rem] flex-col  items-center justify-center rounded-full border-4 text-xl font-semibold transition-all group-hover:border-sky-400">
                  {
                    exams.filter(
                      (e) => e.category === category.href.replace('/', '')
                    ).length
                  }
                  <span className="text-sm">Eded</span>
                </div>
                <div className="text-2xl font-semibold transition-all  group-hover:text-sky-500">
                  {category.title}
                </div>
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Exams;
