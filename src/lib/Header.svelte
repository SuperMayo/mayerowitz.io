<script lang="ts">
	import { page } from '$app/stores';
  import Burger from './Burger.svelte';
  import Logo from './Logo.svelte';

  let burgerOn: boolean = false;
  export let menuLinks: {name: string, link: string}[] = [];

  function toggleBurger() {
      burgerOn = !burgerOn;
  }

  function clickMenuItem() {
      if (burgerOn) toggleBurger();
  }

  // Get the current page path for the active menu item
  $: path = $page.url.pathname;
</script>

<header class="mb-two w-full blur-3">
    <div class="flex flex-col justify-between items-center p-half max-w-screen-lg sm:flex-row">
      <div class="flex justify-between items-center w-full">
      <h1 class="m-0 font-medium">
          <a href="/" class="text-black no-underline"><Logo/></a>
      </h1>
      <button class="sm:hidden" tabIndex={0} on:click={toggleBurger}>
        <Burger click={burgerOn}/>
      </button>
      </div>
      <div class={`nav-bar w-full max-h-0 opacity-0 -mt-one transition-all duration-500 ease-in-out sm:max-h-screen sm:opacity-100 sm:mt-0
      ${burgerOn ? 'burger-on pointer-events-auto' : 'sm:pointer-events-auto pointer-events-none'}`}>
        <nav>
          <ul class="text-right m-0 sm:flex sm:justify-end sm:items-center sm:text-left">
            {#each menuLinks as link}
              <li class="menu-item p-half m-0">
                <a href={link.link} class="mt-quarter lowercase"
                  class:active={path == link.link}
                  on:click={clickMenuItem}>{link.name}</a>
              </li>
            {/each}
          </ul>
        </nav>
      </div>
    </div>
</header>

<style lang="postcss">
  .nav-bar.burger-on {
     @apply block translate-y-one max-h-screen opacity-100 ease-in-out;
   }
   
   .menu-item > a::before {
    content: "/";
   }

   .menu-item > a.active::before {
    content: ">";
   }
 </style>