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
		<iframe
			src={src}
			width='100%'
			height='100%'
			allowFullScreen
			className='rounded-sm shadow-lg  h-[60vh] w-fit md:w-screen md:h-screen'
		/>
	);
};

export default VideoFrame;
