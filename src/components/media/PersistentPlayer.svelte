<script lang="ts">
  import { currentTrack, isPlaying, isMuted, currentTime, duration, showMiniPlayer } from '../../stores/audioStore';

  let audio: HTMLAudioElement = $state();

  // Reactive statement: Control audio playback based on store
  $effect(() => {
    if (!audio) return;
    if ($isPlaying && audio.paused) {
      audio.play().catch(() => isPlaying.set(false));
    } else if (!$isPlaying && !audio.paused) {
      audio.pause();
    }
  });

  // Reactive statement: Mute control
  $effect(() => {
    if (audio) audio.muted = $isMuted;
  });
  
  function handleTimeUpdate() {
    currentTime.set(audio.currentTime);
    duration.set(audio.duration);
  }

  function handleEnded() {
    isPlaying.set(false);
    currentTime.set(0);
  }

  function togglePlay() {
    isPlaying.update(n => !n);
  }

  function closePlayer() {
    isPlaying.set(false);
    showMiniPlayer.set(false);
    currentTrack.set(null);
  }

  function toggleMute() {
    isMuted.update(n => !n);
  }
</script>

<!-- The Global Audio Element -->
{#if $currentTrack}
  <audio
    bind:this={audio}
    src={$currentTrack.src}
    autoplay={$isPlaying}
    ontimeupdate={handleTimeUpdate}
    onloadedmetadata={() => duration.set(audio.duration)}
    onended={handleEnded}
    class="hidden"
  ></audio>
{/if}

<!-- Mini Player UI -->
{#if $showMiniPlayer && $currentTrack}
  <div class="fixed bottom-4 right-4 z-50 w-72 bg-white border border-zinc-200 shadow-xl p-3 flex items-center gap-3 animate-in slide-in-from-bottom-4 fade-in duration-300">
    
    <!-- Cover / Placeholder -->
    <div class="h-12 w-12 bg-zinc-100 flex-shrink-0 overflow-hidden">
      {#if $currentTrack.cover}
        <img src={$currentTrack.cover} alt="Cover" class="h-full w-full object-cover" />
      {:else}
        <div class="h-full w-full flex items-center justify-center bg-zinc-800 text-white text-[8px]">PRS</div>
      {/if}
    </div>

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <div class="text-xs font-bold truncate text-zinc-900">{$currentTrack.title}</div>
      <div class="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mt-1">
        <button onclick={toggleMute} class="hover:text-zinc-900 uppercase">
          {$isMuted ? 'Unmute' : 'Mute'}
        </button>
        <span>•</span>
        <span>{Math.floor($currentTime)}s / {Math.floor($duration)}s</span>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex items-center gap-2">
      <button 
        onclick={togglePlay}
        class="h-8 w-8 flex items-center justify-center bg-zinc-900 text-white hover:bg-orange-600 transition-colors"
      >
        <span class="text-[10px]">{$isPlaying ? '■' : '▶'}</span>
      </button>
      
      <button 
        onclick={closePlayer}
        class="h-8 w-8 flex items-center justify-center text-zinc-400 hover:text-red-600 transition-colors"
        aria-label="Close"
      >
        <span class="text-lg">×</span>
      </button>
    </div>
  </div>
{/if}
