<script lang="ts">
    import { fly } from "svelte/transition";
    import httpClient from "$lib/plugins/interceptor";
    import { isLoading, movie } from "$lib/store";
    import HeaderComponent from "$lib/components/Header.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import Icon from "@iconify/svelte";
    let displayedText = "Welcome to Svelte Cocktails";
    let searchQuery = "";
  
    const searchMovie = async () => {
      try {
        const response = await httpClient.get(
          `http://www.omdbapi.com/?t=${searchQuery}&apikey=`
        );
        if (response.status === 200) {
          movie.set(response.data);
          isLoading.set(false);
        } else {
          console.error("Error fetching movie data:", response.statusText);
          isLoading.set(true);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
        isLoading.set(true);
      } finally {
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
    {#if $movie?.Title}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-lg overflow-hidden">
      <!-- First Column: Movie Poster -->
      <div class="flex justify-center items-center p-4">
        <img alt={$movie.Title} class="w-full h-auto max-h-96 object-contain" src={$movie.Poster} />
      </div>
  
      <!-- Second Column: Movie Details -->
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">{$movie.Title}</h2>
        <p class="text-gray-700 mb-2"><strong>Year:</strong> {$movie.Year}</p>
        <p class="text-gray-700 mb-2"><strong>Genre:</strong> {$movie.Genre}</p>
        <p class="text-gray-700 mb-2"><strong>Director:</strong> {$movie.Director}</p>
        <p class="text-gray-700 mb-2"><strong>Actors:</strong> {$movie.Actors}</p>
        <p class="text-gray-700 mb-2"><strong>Language:</strong> {$movie.Language}</p>
        <p class="text-gray-700 mb-2"><strong>Country:</strong> {$movie.Country}</p>
        <p class="text-gray-700 mb-2"><strong>Awards:</strong> {$movie.Awards}</p>
        <p class="text-gray-700 mb-2"><strong>IMDB Rating:</strong> {$movie.imdbRating}</p>
        <p class="text-gray-700 mb-2"><strong>IMDB Votes:</strong> {$movie.imdbVotes}</p>
        <p class="text-gray-700 mb-2"><strong>IMDB ID:</strong> {$movie.imdbID}</p>
        <p class="text-gray-700 mb-2"><strong>Type:</strong> {$movie.Type}</p>
        <p class="text-gray-700"><strong>Plot:</strong> {$movie.Plot}</p>
      </div>
    </div>
  {:else}
    <p class="text-gray-500">
      No movie data available. Search for a movie above.
    </p>
  {/if}
  </section>
  