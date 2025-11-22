<script lang="ts">
  import ThemeToggle from '../ui/ThemeToggle.svelte';

  let isOpen = $state(false);

  const links = [
    { name: 'Logs', href: '/' },
    { name: 'Music', href: '/music' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Bio', href: '/bio' },
  ];
</script>

<header class="md:hidden sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 transition-colors">
  <div class="flex items-center justify-between px-6 h-14">
    <a href="/" class="font-bold tracking-tighter text-zinc-900 dark:text-zinc-100">PRS.STUDIO</a>
    
    <button onclick={() => isOpen = !isOpen} class="text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400">
      {isOpen ? 'Close' : 'Menu'}
    </button>
  </div>

  <!-- The Menu Drawer -->
  {#if isOpen}
    <nav class="absolute top-14 left-0 w-full h-[calc(100dvh-3.5rem)] bg-zinc-50 dark:bg-zinc-900 p-6 flex flex-col gap-6 border-b border-zinc-200 dark:border-zinc-800 overflow-y-auto">
      {#each links as link}
        <a 
          href={link.href} 
          class="text-3xl font-sans font-bold text-zinc-900 dark:text-zinc-100 hover:text-orange-600 dark:hover:text-orange-500"
          onclick={() => isOpen = false}
        >
          {link.name}
        </a>
      {/each}
      
      <div class="mt-auto font-mono text-[10px] text-zinc-400 uppercase">
        <div class="mb-4">
          <ThemeToggle />
        </div>
        System Online • Lusaka
      </div>
    </nav>
  {/if}
</header>