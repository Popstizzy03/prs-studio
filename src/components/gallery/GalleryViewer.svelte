<script lang="ts">
  import { fade, scale } from 'svelte/transition';

  let { images } = $props();
  
  let pageSize = 6;
  let visibleCount = $state(pageSize);
  let selectedImage = $state<string | null>(null);
  
  let visibleImages = $derived(images.slice(0, visibleCount));
  let hasMore = $derived(visibleCount < images.length);

  // Chunk images for mobile "stacked carousels"
  let mobileChunks = $derived.by(() => {
    const chunks = [];
    for (let i = 0; i < visibleImages.length; i += 3) {
      chunks.push(visibleImages.slice(i, i + 3));
    }
    return chunks;
  });

  function loadMore() {
    visibleCount += pageSize;
  }

  function openImage(src: string) {
    selectedImage = src;
  }

  function closeImage() {
    selectedImage = null;
  }
</script>

<div class="space-y-12">
  
  <!-- MOBILE VIEW: Stacked Carousel Sliders -->
  <div class="md:hidden space-y-8">
    {#each mobileChunks as chunk, i}
      <div class="space-y-2">
        <div class="font-mono text-[10px] uppercase tracking-widest text-zinc-400 px-1">
          Collection {i + 1}
        </div>
        <!-- Horizontal Slider -->
        <div class="flex gap-4 overflow-x-auto pb-4 px-1 snap-x snap-mandatory scrollbar-hide">
          {#each chunk as src}
            <button 
              onclick={() => openImage(src)}
              class="snap-center shrink-0 w-[85vw] sm:w-[60vw] aspect-[4/5] relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-left p-0"
            >
              <img 
                {src} 
                alt="Gallery" 
                loading="lazy"
                class="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-all duration-500"
              />
            </button>
          {/each}
        </div>
        
        <!-- Swipe Indicator (Dots) -->
        <div class="flex justify-center gap-2">
           <div class="w-2 h-2 rounded-full bg-zinc-800 dark:bg-zinc-200 opacity-50"></div>
           <div class="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
           <div class="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
        </div>
      </div>
    {/each}
  </div>

  <!-- DESKTOP VIEW: Masonry / Grid -->
  <div class="hidden md:grid grid-cols-3 gap-6">
    {#each visibleImages as src, i}
      <button 
        onclick={() => openImage(src)}
        class="relative aspect-[4/5] rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 group cursor-pointer text-left p-0 w-full"
        in:fade={{ duration: 300, delay: i * 50 }}
      >
        <img 
          {src} 
          alt="Gallery" 
          class="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700"
        />
        
        <!-- Overlay Info -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
      </button>
    {/each}
  </div>

  <!-- Load More Button -->
  {#if hasMore}
    <div class="flex justify-center pt-12">
      <button 
        onclick={loadMore}
        class="group relative px-8 py-3 overflow-hidden rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-mono text-xs uppercase tracking-widest hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors shadow-lg"
      >
        <span class="relative z-10">See More</span>
      </button>
    </div>
  {/if}
  
  <!-- Lightbox Modal -->
  {#if selectedImage}
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" transition:fade={{ duration: 200 }} onclick={closeImage}>
      <!-- Close Button (Top Right) -->
      <button onclick={closeImage} class="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div class="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center" onclick={(e) => e.stopPropagation()}>
         <img 
            src={selectedImage} 
            alt="Full view" 
            class="max-w-full max-h-[85vh] object-contain rounded shadow-2xl" 
            transition:scale={{ start: 0.95, duration: 200 }} 
         />
      </div>
    </div>
  {/if}

</div>

<style>
  /* Hide scrollbar for chrome/safari/opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
</style>