<script lang="ts">
  import { fly } from "svelte/transition";
  import httpClient from "$lib/plugins/interceptor";
  import { isLoading, movie, movies } from "$lib/store";
  import HeaderComponent from "$lib/components/Header.svelte";
  import type { Movies } from "$lib/types/Movie";
  import Loader from "$lib/components/Loader.svelte";
  import Icon from "@iconify/svelte";
  let displayedText = "Welcome to Svelte Cocktails";
  let searchQuery = "";

  const searchMovie = async () => {
    try {
      isLoading.set(true);
      const response = await httpClient.get<Movies>(
        `http://www.omdbapi.com/?s=${searchQuery}&apikey=`
      );
      if (response.status === 200 && response.data) {
        movies.set(response.data.Search || []);
        isLoading.set(false);
      } else {
        console.error("Error fetching movie data:", response.statusText);
        movies.set([]);
        isLoading.set(false);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
      movies.set([]);
      isLoading.set(false);
    }
  };
</script>

<svelte:head>
  <title>Svelte Movie - Home</title>
  <meta name="description" content="" />
</svelte:head>

<HeaderComponent title="Svelte Movies" />

<section
  class="relative bg-cover bg-center h-[500px]"
  style="background-image: url('https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg');"
>
  <div
    class="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="text-center text-white">
      <h1
        class="text-4xl md:text-6xl font-bold mb-4"
        in:fly={{ x: -200, duration: 500 }}
      >
        {displayedText}
      </h1>

      <p
        class="text-lg md:text-xl mb-2"
        in:fly={{ x: -200, duration: 500, delay: 200 }}
      >
        Discover your favorite movies
      </p>

      <div class="flex items-center space-x-2 mb-6">
        <div class="relative w-full">
          <input
            type="text"
            placeholder="Search for a movie..."
            bind:value={searchQuery}
            class="w-full p-2 pl-10 border text-black border-gray-300 rounded"
          />
          <Icon
            icon="mdi:magnify"
            class="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
            width="20"
            height="20"
          />
        </div>
        <div class="flex space-x-4">
          <button
            type="button"
            class="btn bg-primary text-white hover:bg-secondary transition-colors duration-150"
            on:click={searchMovie}
            aria-label="Search for movies"
            in:fly={{ x: 200, duration: 500, delay: 400 }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

{#if $isLoading}
  <Loader />
{/if}
<section class="p-6">
  {#if $movies.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each $movies as movie, i}
        <div
          class="text-center p-4 bg-white shadow-lg rounded-lg"
          in:fly={{ y: 50, duration: 500, delay: i * 100 }}
        >
          <img
            src={movie?.Poster}
            alt={movie?.Title}
            class="w-full h-48 object-cover rounded-t-lg"
          />
          <h3 class="text-lg font-semibold mt-4">{movie?.Title}</h3>
          <p class="text-sm text-gray-600 mt-2">{movie?.Year}</p>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-center text-gray-600">No movies found.</p>
  {/if}
</section>
