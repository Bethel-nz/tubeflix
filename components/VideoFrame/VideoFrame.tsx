import React from 'react';

type VideoFrameProps = {
  imdb_Id?: string | number;
  tmdb_Id?: string | number;
};

const VideoFrame: React.FC<VideoFrameProps> = ({ imdb_Id, tmdb_Id }) => {
  let src = 'https://multiembed.mov/?';

  if (tmdb_Id) {
    src += `video_id=${tmdb_Id}&tmdb=1`;
  } else if (imdb_Id) {
    src += `video_id=${imdb_Id}`;
  }

  return (
    <div className='relative w-full pt-[56.25%] overflow-hidden rounded-lg shadow-lg'>
      <iframe
        src={src}
        allowFullScreen
        className='absolute inset-0 w-full h-full'
        title='Movie Trailer'
      />
    </div>
  );
};

export default VideoFrame;
