<script lang="ts">
  export let year: number = new Date().getFullYear();
  import { footerMenuItems } from "$lib/types/Menu";
</script>

<footer class="bg-tertiary text-white py-6 border-t border-gray-700">
  <div class="container mx-auto space-y-8 pb-8">
    <!-- First Row -->
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-4">
        <p class="text-lg font-bold">Sveltekit Movies</p>
        <p class="text-sm">Your go-to platform for movie information. It uses Open IMDB API to get movie details.</p>
      </div>
      <div class="col-span-8">
        <nav class="flex justify-center space-x-6">
          {#each footerMenuItems as item}
            <a
              href={item.url}
              class="hover:underline hover:underline-offset-4 mx-4 hover:scale-150 transition-transform duration-200"
            >
              {item.name}
            </a>
          {/each}
        </nav>
      </div>
    </div>
    <!-- Second Row -->
    <div class="grid grid-cols-3 gap-4 text-center">
      <div>
        <p class="text-sm">Privacy Policy</p>
      </div>
      <div>
        <p class="text-xl">&copy; {year} Sveltekit Movies</p>
      </div>
      <div>
        <p class="text-sm">Contact Us</p>
        <form class="mt-2">
          <input
            type="email"
            placeholder="Enter your email"
            class="px-4 py-2 rounded-md text-black"
            required
          />
          <button
            type="submit"
            class="ml-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </div>
</footer>
