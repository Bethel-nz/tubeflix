import create from 'zustand';

interface GenreState {
  selectedGenres: string[];
  toggleGenre: (genre: string) => void;
}

const useGenreStore = create<GenreState>((set) => ({
  selectedGenres: [],
  toggleGenre: (genre) =>
    set((state) => {
      const isSelected = state.selectedGenres.includes(genre);
      return {
        selectedGenres: isSelected
          ? state.selectedGenres.filter((g) => g !== genre)
          : [...state.selectedGenres, genre],
      };
    }),
}));

export default useGenreStore;
