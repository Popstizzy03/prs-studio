<script lang="ts">
  let { src, title = "Untitled Session" } = $props();
  
  let audio: HTMLAudioElement;
  let isPlaying = $state(false);
  let progress = $state(0);
  let duration = $state(0);

  function toggle() {
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      isPlaying = true;
    } else {
      audio.pause();
      isPlaying = false;
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
