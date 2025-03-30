<script lang="ts">
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";
    import { categories, ingredients, glasses } from "$lib/store";
    import HeaderComponent from "$lib/components/Header.svelte";
    import type { Category, Glass, Ingredient } from "$lib/types/Cocktail";
  
    let text = "Welcome to Svelte Cocktails";
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
  
    // Fetch data from the Cocktails API
    async function fetchCocktailData() {
      try {
        const [categoriesRes, ingredientsRes, glassesRes] = await Promise.all([
          fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"),
          fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"),
          fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list"),
        ]);
  
        const categoriesData: { drinks: Category[] } = await categoriesRes.json();
        const ingredientsData: { drinks: Ingredient[] } = await ingredientsRes.json();
        const glassesData: { drinks: Glass[] } = await glassesRes.json();
  
        // write data to stores
        categories.set(categoriesData.drinks);
        ingredients.set(ingredientsData.drinks);
        glasses.set(glassesData.drinks);
      } catch (err) {
        error = "Failed to fetch data from the Cocktails API.";
        console.error(err);
      }
    }
    
    onMount(fetchCocktailData);
  </script>
  
  <svelte:head>
    <title>Cocktails - Explore Categories, Ingredients, and Glasses</title>
    <meta
      name="description"
      content="Discover cocktail categories, ingredients, and glasses with our interactive page powered by the Cocktails API."
    />
  </svelte:head>
  
  <HeaderComponent title="About Svelte Cocktails" />
  
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

  <!-- <section class="py-12 bg-accent">
    <div class="container mx-auto px-6">
      <h2
        class="text-3xl font-bold text-center mb-8"
        in:fly={{ y: 50, duration: 500 }}
      >
        Explore Our Cocktails
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each $cocktails as cocktail, i}
          <div
            class="text-center p-4 bg-white shadow-lg rounded-lg"
            in:fly={{ y: 50, duration: 500, delay: i * 100 }}
          >
            <img
              src={cocktail?.strDrinkThumb}
              alt={cocktail?.strDrink}
              class="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 class="text-lg font-semibold mt-4">{cocktail?.strDrink}</h3>
            <p class="text-sm text-gray-600 mt-2">{cocktail?.strCategory}</p>
          </div>
        {/each}
      </div>
    </div>
  </section> -->
  
  <section class="py-12 bg-accent-dark">
    <div class="container mx-auto px-6">
      <h2
        class="text-3xl font-bold text-center mb-8"
        in:fly={{ y: 50, duration: 500 }}
      >
        Explore Our Ingredients
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each $ingredients as ingredient, i}
          <div
            class="text-center p-2 bg-white shadow-lg rounded-lg"
            in:fly={{ y: 50, duration: 500, delay: i * 100 }}
          >
            <p class="px-2 py-1 bg-primary text-accent my-1">
              {ingredient?.strIngredient1}
            </p>
          </div>
        {/each}
      </div>
    </div>
  
    <div class="container mx-auto px-6 mt-12">
      <h2
        class="text-3xl font-bold text-center mb-8"
        in:fly={{ y: 50, duration: 500 }}
      >
        Explore Our Glasses
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each $glasses as glass, i}
          <div
            class="text-center p-2 bg-white shadow-lg rounded-lg"
            in:fly={{ y: 50, duration: 500, delay: i * 100 }}
          >
            <p class="px-2 py-1 bg-secondary text-accent my-1">{glass?.strGlass}</p>
          </div>
        {/each}
      </div>
    </div>
  
    <div class="container mx-auto px-6 mt-12">
      <h2
        class="text-3xl font-bold text-center mb-8"
        in:fly={{ y: 50, duration: 500 }}
      >
        Explore Our Categories
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each $categories as category, i}
          <div
            class="text-center p-2 bg-white shadow-lg rounded-lg"
            in:fly={{ y: 50, duration: 500, delay: i * 100 }}
          >
            <p class="px-2 py-1 bg-accent-dark text-secondary my-1">
              {category?.strCategory}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>  