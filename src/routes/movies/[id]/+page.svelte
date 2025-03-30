<script lang="ts">
    import { fly } from "svelte/transition";
    import httpClient from "$lib/plugins/interceptor";
    import { isLoading, movie } from "$lib/store";
    import type { Movie } from "$lib/types/Movie";
    import HeaderComponent from "$lib/components/Header.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    let movieDetails: any = null;
    let movieId: string | null = null;

    // Get the `id` from the route parameters
    $: movieId = $page.params.id;

    const fetchMovieDetails = async () => {
        try {
            isLoading.set(true);
            const response = await httpClient.get(
                `http://www.omdbapi.com/?i=${movieId}&apikey=`
            );
            if (response.status === 200 && response.data) {
                movieDetails = response.data;
                isLoading.set(false);
            } else {
                console.error("Error fetching movie details:", response.statusText);
                isLoading.set(false);
            }
        } catch (error) {
            console.error("Error fetching movie details:", error);
            isLoading.set(false);
        }
    };

    onMount(() => {
        if (movieId) {
            fetchMovieDetails();
        }
    });
</script>

<svelte:head>
    <title>Svelte Movie - Details</title>
    <meta name="description" content="Movie details page" />
</svelte:head>

<HeaderComponent title="Movie Details" />

<section class="p-6">
    {#if $isLoading}
        <Loader />
    {:else if movieDetails}
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row">
                <img
                    src={movieDetails.Poster}
                    alt={movieDetails.Title}
                    class="w-full md:w-1/3 object-cover"
                />
                <div class="p-6">
                    <h1 class="text-2xl font-bold mb-4">{movieDetails.Title}</h1>
                    <p class="text-gray-600 mb-2"><strong>Year:</strong> {movieDetails.Year}</p>
                    <p class="text-gray-600 mb-2"><strong>Genre:</strong> {movieDetails.Genre}</p>
                    <p class="text-gray-600 mb-2"><strong>Director:</strong> {movieDetails.Director}</p>
                    <p class="text-gray-600 mb-2"><strong>Actors:</strong> {movieDetails.Actors}</p>
                    <p class="text-gray-600 mb-2"><strong>Plot:</strong> {movieDetails.Plot}</p>
                    <p class="text-gray-600 mb-2"><strong>IMDB Rating:</strong> {movieDetails.imdbRating}</p>
                </div>
            </div>
        </div>
    {:else}
        <p class="text-center text-gray-600">Movie details not found.</p>
    {/if}
</section>
