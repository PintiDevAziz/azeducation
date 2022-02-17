import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import VideoBox from '../components/VideoBox';
import cantfindAnimationData from '../lottie/cant-find.json';
import Lottie from 'react-lottie';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import Link from 'next/link';
import Loading from '../components/Loading';
import { AwesomeButton } from 'react-awesome-button';
const VideoLessons = ({ data }) => {
  //user
  const [user, userLoading, userError] = useAuthState(auth);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { items } = data;
  //! Router
  const router = useRouter();

  useEffect(() => {
    router.push(`/video-lessons?search=${searchQuery}`);
  }, [searchQuery]);
  useEffect(() => {
    if (!input) {
      setSearchQuery('');
    }
  }, [input]);

  //! cant find animation
  const cantFindAnimtionOptions = {
    loop: true,
    autoplay: true,
    animationData: cantfindAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="flex h-[calc(100vh-5rem)] w-full flex-col px-20">
      <div className="glassorism my-6 flex h-20 items-center border-b-4 px-6 py-1">
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          className=" h-12 flex-1 rounded  border-2 px-2 outline-none transition-all focus-within:border-indigo-500"
          placeholder="Dərslər arasında axtarış"
        />
        <div className="ml-4">
          <AwesomeButton
            type="primary"
            size={'large'}
            ripple={true}
            action={() => {
              if (input) {
                setSearchQuery(input);
              }
            }}
          >
            Axtar
          </AwesomeButton>
        </div>
      </div>
      {items && items.length ? (
        <div className="flex  flex-wrap gap-7">
          {items?.length ? (
            <>
              {items?.map((video, key) => (
                <>
                  {video.etag !== 'oVbvL0aVWTTcFUznHKKHXJdscfM' ? (
                    <VideoBox video={video} key={key} />
                  ) : null}
                </>
              ))}
            </>
          ) : (
            <div className="flex h-[calc(100vh-11rem)] w-full flex-col items-center justify-center ">
              <div className="mb-16 w-[15rem]">
                <Lottie
                  options={cantFindAnimtionOptions}
                  isClickToPauseDisabled={true}
                />
              </div>
              <div className=" text-3xl font-semibold">
                Bu axtarışla bağlı video tapılmadı{' '}
                <span className="italic underline decoration-sky-500">
                  {searchQuery}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto mt-10">
          <Loading />
        </div>
      )}
    </div>
  );
};
export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCpERt5A7SNd7s5XNAj2mGmw&maxResults=10&order=date&q=${query.search}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
export default VideoLessons;
