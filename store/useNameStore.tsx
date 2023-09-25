import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type User = {
	username: string;
	setUsername: (name: string) => void;
};

export const useNameStore = create<User>()(
	persist(
		(set) => ({
			username: 'hobo-johnson',
			setUsername: (name) =>
				set((state) => ({ username: (state.username = name) })),
		}),
		{
			name: 'tubeFlix-user',
		}
	)
);
