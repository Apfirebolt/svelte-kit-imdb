<script lang="ts">
  import { fly } from "svelte/transition";
  import httpClient from "$lib/plugins/interceptor";
  import Cookie from "js-cookie";
  import { onMount } from "svelte";
  import { isLoading, movies } from "$lib/store";
  import { goto } from "$app/navigation";
  import type { User, UserResponse } from "$lib/types/User";
  import HeaderComponent from "$lib/components/Header.svelte";
  import type { Movies } from "$lib/types/Movie";
  import Loader from "$lib/components/Loader.svelte";
  import Icon from "@iconify/svelte";
  let displayedText = "";
  let searchQuery = "";
  let users: User[] = [];
  let index = 0;
  const text = "Welcome to Dashboard";

  // Typewriter effect logic
  const typeWriter = () => {
    if (index < text.length) {
      displayedText += text[index];
      index++;
      setTimeout(typeWriter, 100); // Adjust speed here
    }
  };

  // Start the typewriter effect when the component is mounted
  typeWriter();

  const getUsers = async () => {
    try {
      isLoading.set(true);
      let user = Cookie.get("user");
      if (user) {
        user = JSON.parse(user);
      } else {
        user = null;
      }
      const response = await httpClient.get<UserResponse>(
        "http://localhost:8080/api/user",
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200 && response.data) {
        users = response.data.users || [];
        isLoading.set(false);
      } else {
        console.error("Error fetching user data:", response.statusText);
        users = [];
        isLoading.set(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      users = [];
      isLoading.set(false);
    }
  };

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

  const goToMovieDetails = (movieId: string) => {
    // Use Svelte's goto function for navigation
    goto(`/movies/${movieId}`);
  };

  onMount(() => {
    getUsers();
  });
</script>

<svelte:head>
  <title>Svelte Movie - Dashboard</title>
  <meta name="description" content="" />
</svelte:head>

<HeaderComponent title="Dashboard" />

<section
  class="relative bg-cover bg-center h-[500px]"
  style="background-image: url('https://heroichollywood.com/wp-content/uploads/2019/03/Avengers-Endgame-Marvel-Studios-MCU-Captain-Marvel.jpg');"
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
        Discover users and your saved movies!
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
  {#if users.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each users as user, i}
        <div
          class="text-center p-4 bg-white shadow-lg rounded-lg"
          in:fly={{ y: 50, duration: 500, delay: i * 100 }}
        >
          <h3 class="text-lg font-semibold mt-4">{user?.name}</h3>
          <p class="text-sm text-gray-600 mt-2">{user?.email}</p>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-center text-gray-600">No users found.</p>
  {/if}
</section>
