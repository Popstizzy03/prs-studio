<script lang="ts">
  import { currentTrack, isPlaying, currentTime, duration, showMiniPlayer } from '../../stores/audioStore';

  let { src, title = "Untitled Session" } = $props();
  
  // Derived state: Is this specific instance the one currently playing?
  let isCurrentTrack = $derived($currentTrack?.src === src);
  let isActivePlaying = $derived(isCurrentTrack && $isPlaying);
  
  // Calculate progress only if this is the current track
  let progress = $derived(isCurrentTrack && $duration > 0 ? ($currentTime / $duration) * 100 : 0);

  function toggle() {
    if (isCurrentTrack) {
      // Toggle play/pause for this track
      isPlaying.update(n => !n);
    } else {
      // Start new track
      currentTrack.set({ src, title });
      isPlaying.set(true);
      showMiniPlayer.set(true);
    }
  }
</script>

<div class="my-8 border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
  <div class="flex items-center gap-4">
    
    <!-- Play Button -->
    <button 
      onclick={toggle}
      class="flex h-10 w-10 items-center justify-center bg-orange-600 text-white hover:bg-zinc-900 transition-colors shadow-sm"
      aria-label={isActivePlaying ? "Pause" : "Play"}
    >
      <span class="text-xs">{isActivePlaying ? '■' : '▶'}</span>
    </button>

    <!-- Track Info -->
    <div class="flex-1 space-y-2">
      <div class="flex justify-between font-mono text-[10px] uppercase tracking-widest text-zinc-500">
        <span>{title}</span>
        <span>{isActivePlaying ? 'Playing...' : '00:00'}</span>
      </div>
      
      <!-- Progress Bar -->
      <div class="h-1 w-full bg-zinc-100 overflow-hidden">
        <div class="h-full bg-zinc-900 transition-all duration-200" style="width: {progress}%"></div>
      </div>
    </div>
  </div>
</div>
