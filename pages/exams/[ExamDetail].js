import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Link from 'next/link';
const ExamDetailPage = () => {
  const router = useRouter();

  const { ExamDetail } = router.query;
  const [examsArray, setExamsArray] = useState([]);
  const colRef = collection(db, 'exams');
  useEffect(() => {
    onSnapshot(colRef, (snap) => {
      setExamsArray(snap.docs.map((d) => d.data()));
    });
  }, []);
  const final = examsArray.filter((item) => item.category === ExamDetail);
  return (
    <div className="min-h-[calc(100vh-5rem)] p-10">
      <div className="flex flex-wrap gap-6 px-24">
        {final &&
          final.map((item, key) => (
            <Link href={item.url || ''} key={key}>
              <a
                target={'_blank'}
                className="glassorism group  flex h-[10rem] w-[25rem] items-center justify-center  gap-x-10 rounded-full transition-all hover:scale-105"
              >
                <div className="flex h-[5rem] w-[5rem] flex-col  items-center justify-center rounded-full border-4 text-xl font-semibold transition-all group-hover:border-sky-400">
                  {item.class}
                  <span className="text-sm">Sinif</span>
                </div>
                <div className="h-8 w-[calc(100%-15rem)]  overflow-hidden  text-xl font-semibold  transition-all group-hover:h-auto group-hover:text-sky-500">
                  {item.title}
                </div>
                <div className="absolute bottom-3 right-3 font-semibold italic">
                  {item.author}
                </div>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ExamDetailPage;
