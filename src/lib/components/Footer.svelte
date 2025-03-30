<script lang="ts">
    export let year: number = new Date().getFullYear();
    let menuItems = [
		{ name: 'Home', url: '/' },
		{ name: 'About', url: '/about' },
		{ name: 'Contact', url: '/contact' },
        { name: 'Filter', url: '/filters' },
	];
</script>

<footer class="bg-tertiary text-white py-6 border-t border-gray-700">
    <div class="container mx-auto text-center space-y-4 pb-8">
        <nav class="flex justify-center space-x-6">
            {#each menuItems as item}
                <a href={item.url} class="hover:underline hover:underline-offset-4 mx-4 hover:scale-150 transition-transform duration-200">
                    {item.name}
                </a>
            {/each}
        </nav>
        <p class="text-xl">
            &copy; {year} Sveltekit Cocktails. All rights reserved.
        </p>
    </div>
</footer>