<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  
  let { isOpen, event, onClose } = $props();
  
  let currentSlide = $state(0);
  
  // Combine media and add placeholder logic
  let slides = $derived.by(() => {
    if (!event) return [];
    const media = [
      ...(event.data.images || []).map(src => ({ type: 'image', src })),
      ...(event.data.videos || []).map(src => ({ type: 'video', src }))
    ];
    
    // Requirement: if one image, add placeholder
    if (media.length === 1) {
      media.push({ type: 'placeholder', src: '' });
    }
    
    return media;
  });

  function next() {
    currentSlide = (currentSlide + 1) % slides.length;
  }

  function prev() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  }
</script>

{#if isOpen && event}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" transition:fade={{ duration: 200 }}>
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm" onclick={onClose}></div>

    <!-- Modal -->
    <div 
      class="relative w-full max-w-2xl bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      transition:scale={{ start: 0.95, duration: 200 }}
    >
      
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div class="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">{event.data.year}</div>
          <h3 class="font-sans text-2xl font-bold text-zinc-900 dark:text-zinc-100">{event.data.title}</h3>
        </div>
        <button onclick={onClose} class="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          <span class="text-2xl">×</span>
        </button>
      </div>

      <!-- Carousel (if media exists) -->
      {#if slides.length > 0}
        <div class="relative aspect-video bg-zinc-100 dark:bg-zinc-950 overflow-hidden group">
          {#each [slides[currentSlide]] as slide (currentSlide)}
            <div class="w-full h-full flex items-center justify-center" transition:fade={{ duration: 200 }}>
              {#if slide.type === 'image'}
                <img src={slide.src} alt="Event media" class="w-full h-full object-cover" />
              {:else if slide.type === 'video'}
                <video src={slide.src} controls class="w-full h-full object-cover"></video>
              {:else}
                <div class="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600">
                  <span class="text-4xl mb-2">📷</span>
                  <span class="font-mono text-xs uppercase tracking-widest">More Soon</span>
                </div>
              {/if}
            </div>
          {/each}

          <!-- Controls -->
          {#if slides.length > 1}
            <button onclick={prev} class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black text-zinc-900 dark:text-white h-8 w-8 flex items-center justify-center rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">←</button>
            <button onclick={next} class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black text-zinc-900 dark:text-white h-8 w-8 flex items-center justify-center rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">→</button>
            
            <!-- Dots -->
            <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {#each slides as _, i}
                <div class={`h-1.5 w-1.5 rounded-full transition-colors ${i === currentSlide ? 'bg-white' : 'bg-white/40'}`}></div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- Body Content -->
      <div class="p-6 overflow-y-auto prose prose-zinc dark:prose-invert prose-sm">
        {@html event.body} <!-- Note: We'll pass rendered HTML content -->
      </div>

    </div>
  </div>
{/if}
