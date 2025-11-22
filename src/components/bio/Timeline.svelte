<script lang="ts">
  import TimelineModal from './TimelineModal.svelte';
  
  let { events } = $props();
  
  let selectedEvent = $state(null);

  function openEvent(event) {
    selectedEvent = event;
  }

  function closeEvent() {
    selectedEvent = null;
  }
</script>

<div class="relative border-l border-zinc-200 ml-3 md:ml-6 space-y-12 py-4">
  {#each events as event}
    <div class="relative pl-8 md:pl-12 group">
      
      <!-- Timeline Dot -->
      <button 
        onclick={() => openEvent(event)}
        class="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-zinc-300 border-2 border-[#FAFAF5] group-hover:scale-125 group-hover:bg-orange-600 transition-all z-10"
        aria-label={`View details for ${event.data.title}`}
      ></button>

      <!-- Date Label -->
      <div class="font-mono text-xs text-zinc-400 mb-1">
        {event.data.year}
      </div>

      <!-- Card Content -->
      <button 
        onclick={() => openEvent(event)}
        class="text-left group-hover:translate-x-1 transition-transform duration-300"
      >
        <h3 class="font-sans text-xl font-bold text-zinc-900 mb-2 group-hover:text-orange-600 transition-colors">
          {event.data.title}
        </h3>
        <div class="prose prose-zinc prose-sm line-clamp-2 text-zinc-600">
          {event.excerpt || "Click to read more..."}
        </div>
      </button>

    </div>
  {/each}
</div>

<TimelineModal 
  isOpen={!!selectedEvent} 
  event={selectedEvent} 
  onClose={closeEvent} 
/>
