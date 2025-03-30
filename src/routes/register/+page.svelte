<script lang="ts">
  import { fly } from "svelte/transition";
  import { goto } from "$app/navigation";
  import HeaderComponent from "$lib/components/Header.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import { isLoading } from "$lib/store";
  import Icon from "@iconify/svelte";

  let name = "";
  let email = "";
  let password = "";

  const register = async () => {
    try {
      isLoading.set(true);
      // Simulate an API call for registration
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
      isLoading.set(false);

      // Mock registration validation
      if (name && email && password) {
        alert("Registration successful!");
        goto("/dashboard"); // Redirect to a dashboard or home page
      } else {
        alert("Please fill in all fields.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      isLoading.set(false);
    }
  };
</script>

<svelte:head>
  <title>Register - Svelte Movies</title>
  <meta name="description" content="Register to create your account" />
</svelte:head>

<HeaderComponent title="Register" />

<section
  class="relative bg-cover bg-center h-[500px]"
  style="background-image: url('https://musicart.xboxlive.com/7/13f75000-0000-0000-0000-000000000002/504/image.jpg');"
>
  <div
    class="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="w-1/2 mx-auto">
      <div
        class="bg-white p-6 rounded-lg lg:w-1/2 shadow-lg mx-auto"
        in:fly={{ x: 200, duration: 500 }}
      >
        <h1 class="text-center md:text-4xl font-bold mb-4">Register</h1>

        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div class="relative mt-1">
            <input
              type="text"
              id="name"
              bind:value={name}
              placeholder="Enter your name"
              class="w-full p-2 pl-10 border text-black border-gray-300 rounded"
            />
            <Icon
              icon="mdi:account-outline"
              class="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
              width="20"
              height="20"
            />
          </div>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div class="relative mt-1">
            <input
              type="email"
              id="email"
              bind:value={email}
              placeholder="Enter your email"
              class="w-full p-2 pl-10 border text-black border-gray-300 rounded"
            />
            <Icon
              icon="mdi:email-outline"
              class="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
              width="20"
              height="20"
            />
          </div>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="relative mt-1">
            <input
              type="password"
              id="password"
              bind:value={password}
              placeholder="Enter your password"
              class="w-full p-2 pl-10 border text-black border-gray-300 rounded"
            />
            <Icon
              icon="mdi:lock-outline"
              class="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
              width="20"
              height="20"
            />
          </div>
        </div>

        <button
          type="button"
          class="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition-colors duration-150"
          on:click={register}
          aria-label="Register"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</section>

{#if $isLoading}
  <Loader />
{/if}
