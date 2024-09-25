import React from 'react';

type VideoFrameProps = {
  imdb_Id?: string | number;
  tmdb_Id?: string | number;
};

const VideoFrame: React.FC<VideoFrameProps> = ({ imdb_Id, tmdb_Id }) => {
  let src = process.env.BASE_MOVIE_URL!;

  if (tmdb_Id) {
    src += `video_id=${tmdb_Id}&tmdb=1`;
  } else if (imdb_Id) {
    src += `video_id=${imdb_Id}`;
  }

  return (
    <div className='w-full h-[90dvh]'>
      <iframe
        src={src}
        allowFullScreen
        className='w-full h-full object-cover'
        title='Movie Trailer'
      />
    </div>
  );
};

export default VideoFrame;
