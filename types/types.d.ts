import { AnchorHTMLAttributes, ReactNode } from 'react';

export type Props = {
	children?: ReactNode;
};

export type ButtonLinkProp = Props & {
	path: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export type Movie = {
	backdrop_path: string;
	id: number;
	original_language: string;
	original_title: string;
	poster_path: string;
	release_date: string;
	title: string;
};

export type Cardtype = {
	movie: Movie;
};

export interface MoviesDataResponse {
	page: number;
	data: {
		results: Movie[];
	};
	total_pages: number;
	total_results: number;
}

export type MoviesData = {
	data: {
		page: number;
		results: {
			backdrop_path: string;
			genre_ids: number[];
			id: number;
			original_language: string;
			original_title: string;
			overview: string;
			popularity: number;
			poster_path: string;
			release_date: string;
			title: string;
			video: boolean;
		}[];
		total_pages: number;
		total_results: number;
	};
};

export type MovieData = {
	backdrop_path: string;
	belongs_to_collection?: {
		id: number;
		name: string;
		poster_path: string | null;
		backdrop_path: string | null;
	};
	genres: {
		id: number;
		name: string;
	}[];
	id: number;
	imdb_id: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string;
	revenue: number;
	runtime: number;
	title: string;
	video: boolean;
	videos: {
		results: {
			name: string;
			key: string;
			id: string;
		}[];
	};
};
