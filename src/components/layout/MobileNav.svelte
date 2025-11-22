<script lang="ts">
  let isOpen = $state(false);

  const links = [
    { name: 'Logs', href: '/' },
    { name: 'Music', href: '/music' },
    { name: 'Bio', href: '/bio' },
  ];
</script>

<header class="md:hidden sticky top-0 z-40 border-b border-zinc-200 bg-[#FAFAF5]">
  <div class="flex items-center justify-between px-6 h-14">
    <a href="/" class="font-bold tracking-tighter">PRS.STUDIO</a>
    
    <button onclick={() => isOpen = !isOpen} class="text-xs font-mono uppercase text-zinc-500">
      {isOpen ? 'Close' : 'Menu'}
    </button>
  </div>

  <!-- The Menu Drawer -->
  {#if isOpen}
    <nav class="absolute top-14 left-0 w-full h-[calc(100vh-3.5rem)] bg-[#FAFAF5] p-6 flex flex-col gap-6 border-b border-zinc-200">
      {#each links as link}
        <a 
          href={link.href} 
          class="text-3xl font-sans font-bold text-zinc-900 hover:text-orange-600"
          onclick={() => isOpen = false}
        >
          {link.name}
        </a>
      {/each}
      
      <div class="mt-auto font-mono text-[10px] text-zinc-400 uppercase">
        System Online • Lusaka
      </div>
    </nav>
  {/if}
</header>