import React from 'react';

type VideoFrameProps = {
  imdb_Id?: string | number;
  tmdb_Id?: string | number;
  fallBackId: string | number;
};

const VideoFrame: React.FC<VideoFrameProps> = ({
  imdb_Id,
  tmdb_Id,
  fallBackId,
}) => {
  let src = 'https://multiembed.mov/?';

  if (tmdb_Id) {
    src += `video_id=${tmdb_Id}&tmdb=1`;
  } else if (imdb_Id) {
    src += `video_id=${imdb_Id}`;
  } else {
    src += `video_id=${fallBackId}`;
  }

  return (
    <div className='w-full h-[90dvh]'>
      {src ? (
        <iframe
          src={src}
          allowFullScreen
          className='w-full h-full object-cover'
          title='Movie Trailer'
        />
      ) : (
        <div className='h-full w-full flex items-center justify-center'>
          <p className='text-2xl text-white'>No video found</p>
        </div>
      )}
    </div>
  );
};

export default VideoFrame;
