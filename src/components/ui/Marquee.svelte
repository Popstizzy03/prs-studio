<script lang="ts">
  let isVisible = $state(true);

  function close() {
    isVisible = false;
  }
</script>

{#if isVisible}
  <div class="relative bg-zinc-900 text-white overflow-hidden h-8 flex items-center z-50 transition-all duration-300">
    <!-- The Scrolling Text -->
    <div class="marquee-track flex whitespace-nowrap font-mono text-[10px] uppercase tracking-widest">
      <span class="mx-4">Built by Rabboni Kabongo | +260973178018 ✦ Roviolt Platforms | kabongorabboni03@gmail.com ✦ Lusaka, ZM</span>
      <span class="mx-4">Built by Rabboni Kabongo | +260973178018 ✦ Roviolt Platforms | kabongorabboni03@gmail.com ✦ Lusaka, ZM</span>
      <span class="mx-4">Built by Rabboni Kabongo | +260973178018 ✦ Roviolt Platforms | kabongorabboni03@gmail.com ✦ Lusaka, ZM</span>
    </div>

    <!-- The Close Button -->
    <button onclick={close} class="absolute right-0 top-0 h-full px-3 bg-zinc-900 hover:bg-zinc-800 border-l border-zinc-700 z-10 flex items-center justify-center">
      ✕
    </button>
  </div>
{/if}

<style>
  .marquee-track {
    animation: scroll 20s linear infinite;
  }
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
</style>