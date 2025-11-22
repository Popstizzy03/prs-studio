<script lang="ts">
  import { currentAudio } from '../../stores/audioStore';
  import { onDestroy } from 'svelte';

  let { src, title = "Untitled Session" } = $props();
  
  let audio: HTMLAudioElement;
  let isPlaying = $state(false);
  let progress = $state(0);
  let duration = $state(0);

  // Subscribe to the store to handle exclusive playback
  const unsubscribe = currentAudio.subscribe(activeAudio => {
    if (activeAudio && activeAudio !== audio && isPlaying) {
      audio.pause();
      isPlaying = false;
    }
  });

  onDestroy(() => {
    unsubscribe();
  });

  function toggle() {
    if (!audio) return;
    
    if (audio.paused) {
      // If another audio is playing, this store update will trigger its subscription to pause it
      currentAudio.set(audio);
      audio.play();
      isPlaying = true;
    } else {
      audio.pause();
      isPlaying = false;
      // Optional: Clear store if we are the active one pausing? 
      // Not strictly necessary for the requirement, but good for state cleanliness.
      // if ($currentAudio === audio) currentAudio.set(null); 
    }
  }

  function handleTimeUpdate() {
    if (audio.duration) {
      progress = (audio.currentTime / audio.duration) * 100;
    }
  }
</script>

<div class="my-8 border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
  <div class="flex items-center gap-4">
    
    <!-- Play Button -->
    <button 
      onclick={toggle}
      class="flex h-10 w-10 items-center justify-center bg-orange-600 text-white hover:bg-zinc-900 transition-colors shadow-sm"
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      <span class="text-xs">{isPlaying ? '■' : '▶'}</span>
    </button>

    <!-- Track Info -->
    <div class="flex-1 space-y-2">
      <div class="flex justify-between font-mono text-[10px] uppercase tracking-widest text-zinc-500">
        <span>{title}</span>
        <span>{isPlaying ? 'Running...' : '00:00'}</span>
      </div>
      
      <!-- Progress Bar -->
      <div class="h-1 w-full bg-zinc-100 overflow-hidden">
        <div class="h-full bg-zinc-900 transition-all duration-200" style="width: {progress}%"></div>
      </div>
    </div>
  </div>

  <audio 
    bind:this={audio} 
    {src} 
    onloadedmetadata={() => duration = audio.duration}
    ontimeupdate={handleTimeUpdate}
    onended={() => isPlaying = false}
    class="hidden"
  ></audio>
</div>
