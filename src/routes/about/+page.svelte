<script lang="ts">
    import { fly } from "svelte/transition";
    import HeaderComponent from "$lib/components/Header.svelte";
  
    let text = "Welcome to Svelte Movies";
    let displayedText = "";
    let index = 0;
    let error: string | null = null;
  
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
  </script>
  
  <svelte:head>
    <title>Svelte Movies - About</title>
    <meta
      name="description"
      content="Sevlte Movies is a movie database application built with Svelte. It uses Omdb API to fetch movie data and display it in a user-friendly interface."
    />
  </svelte:head>
  
  <HeaderComponent title="About Svelte Movies" />
  
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
          in:fly={{ y: 50, duration: 500 }}
        >
          {displayedText}
        </h1>
        <p
          class="text-lg md:text-xl mb-6"
          in:fly={{ y: 50, duration: 500, delay: 200 }}
        >
          Discover your favorite cocktails, glasses, ingredients and more
        </p>
        <button
          class="px-6 py-3 bg-tertiary hover:bg-primary transition-colors duration-150 text-white font-semibold rounded-lg"
          in:fly={{ y: 50, duration: 500, delay: 400 }}
        >
          Get Started
        </button>
      </div>
    </div>
  </section>