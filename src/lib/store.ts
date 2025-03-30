// store.ts
import { writable, derived } from 'svelte/store';
import type { Category, Glass, Ingredient, Cocktail } from "$lib/types/Cocktail";
import type { Movie } from "$lib/types/Movie";

export const count = writable<number>(0);
export const name = writable<string>('Guest');
export const isLoading = writable<boolean>(false);
export const movie = writable<Movie | null>(null);
export const movies = writable<Movie[]>([]);
export const categories = writable<Category[]>([]);
export const glasses = writable<Glass[]>([]);
export const ingredients = writable<Ingredient[]>([]);

