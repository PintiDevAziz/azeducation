import Link from 'next/link';
import React from 'react';

const VideoBox = ({ video }) => {
  return (
    <Link href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
      <a
        target={'_blank'}
        className="group outline-grya-500 hover:outline-sky-500  relative h-[12rem] w-[20rem]   rounded  outline outline-4 transition-all  hover:border-b-indigo-500"
      >
        <div className="absolute z-20 h-full w-full  bg-black/80 opacity-0    group-hover:opacity-100"></div>
        <div className=" absolute left-1/2 top-1/2 z-50 w-[15rem] -translate-x-1/2 -translate-y-1/2 text-center text-white opacity-0 transition-all group-hover:opacity-100">
          {video.snippet.title}
        </div>
        <img
          alt=""
          src={video.snippet.thumbnails.medium.url}
          className="h-full w-full "
        />
      </a>
    </Link>
  );
};

export default VideoBox;
