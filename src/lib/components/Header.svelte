<script lang="ts">
  import Icon from "@iconify/svelte";
  import { menuItems, authMenuItems } from "$lib/types/Menu";
  import Cookie from "js-cookie";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  export let title: string = "Svelte Kit Movies";
  let isMenuOpen = false;
  let selectedUrl = "/";
  let user: any | null = null;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function selectMenuItem(url: string) {
    selectedUrl = url;
    isMenuOpen = false; // Close the menu on selection (for mobile)
  }

  const handleLogOut = () => {
    Cookie.remove("user");
    user = null;
    console.log("User logged out");
    goto("/login");
  };

  // check if user is logged in
  onMount(() => {
    const userData = Cookie.get("user");
    if (userData) {
      try {
        user = JSON.parse(userData);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        user = null;
      }
    } else {
      user = null;
    }
    console.log("User data:", user);
  });
</script>

<header class="bg-tertiary text-accent border-b border-gray-700">
  <div class="container mx-auto flex items-center justify-between px-6 py-4">
    <button
      class="lg:hidden text-white focus:outline-none"
      on:click={toggleMenu}
      aria-label="Toggle menu"
    >
      <Icon icon="mdi:menu" class="text-3xl" />
    </button>
    <h1 class="text-3xl">{title}</h1>
    <nav class="hidden lg:block">
      <ul class="flex items-center">
        {#if user}
          <div class="text-xl text-white font-bold">
            Welcome, {user.name}!
          </div>
        {/if}
        {#each user ? authMenuItems : menuItems as item}
          <li class="relative group">
            <a
              href={item.url}
              data-sveltekit-prefetch
              class="py-2 px-4 border-2 rounded-full transition-all duration-300 ease-in-out group-hover:bg-bermuda group-hover:scale-105 group-hover:shadow-lg mx-2 {selectedUrl ===
              item.url
                ? 'bg-accent text-black'
                : 'text-white'}"
              on:click={() => selectMenuItem(item.url)}
            >
              {item.name}
            </a>
          </li>
        {/each}
        {#if user}
          <button
            on:click={handleLogOut}
            class="mx-2 flex items-center"
            aria-label="Log out"
          >
            <Icon icon="mdi:logout" class="text-xl mr-1" />
            Log out
          </button>
        {/if}
      </ul>
    </nav>
  </div>

  <!-- Mobile Menu -->
  <div
    class="fixed top-0 right-0 bg-primary text-white z-50 h-full w-1/2 transform transition-transform duration-300 ease-in-out"
    class:translate-x-0={isMenuOpen}
    class:translate-x-full={!isMenuOpen}
  >
    <div class="flex justify-end p-4">
      <button
        class="text-white focus:outline-none"
        on:click={toggleMenu}
        aria-label="Close menu"
      >
        <Icon icon="mdi:close" class="text-3xl" />
      </button>
    </div>
    {#if user}
      <div class="px-6 py-4 text-2xl text-center text-white font-bold">
        Welcome, {user.name}!
      </div>
    {/if}
    <ul class="space-y-4 px-6">
      {#each user ? authMenuItems : menuItems as item}
        <li
          class="bg-bermuda text-white px-2 py-3 text-center shadow-xl rounded hover:bg-amber-500 transition-colors duration-300"
        >
          <a
            href={item.url}
            data-sveltekit-prefetch
            class={selectedUrl === item.url ? "text-black" : ""}
            on:click={() => selectMenuItem(item.url)}
          >
            {item.name}
          </a>
        </li>
      {/each}
      {#if user}
        <li
          class="bg-bermuda text-white px-2 py-3 text-center shadow-xl rounded hover:bg-amber-500 transition-colors duration-300"
        >
          <button on:click={handleLogOut} class="" aria-label="Log out">
            Log out
          </button>
        </li>
      {/if}
    </ul>
  </div>
</header>

<style>
  .translate-x-0 {
    transform: translateX(0);
  }
  .translate-x-full {
    transform: translateX(100%);
  }
</style>
