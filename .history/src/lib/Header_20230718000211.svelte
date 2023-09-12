<script lang="ts">
    import '../app.css';
    import Burger from './Burger.svelte';

    let burgerOn: boolean = false;
    export let siteTitle: string;
    export let menuLinks: {name: string, link: string}[] = [];

    function toggleBurger() {
        burgerOn = !burgerOn;
    }

    function clickMenuItem() {
        if (burgerOn) toggleBurger();
    }
</script>

<style lang="postcss">
  .flex-container {
    @apply flex flex-col justify-between items-center p-one max-w-screen-lg sm:flex-row;
  }

  .title-wrapper {
    @apply flex justify-between items-center w-full;
  }

  .nav-bar {
    @apply w-full max-h-0 opacity-0 -mt-one transition-all duration-500 ease-in-out sm:max-h-screen sm:opacity-100 sm:mt-0;
  }
  
  .nav-bar.burger-on {
    @apply block translate-y-one max-h-screen opacity-100 transition-all duration-500 ease-in-out;
  }

  .menu {
    @apply text-right m-0 sm:flex sm:justify-start sm:items-center sm:text-left;
  }

  .menu-item {
    @apply mt-quarter transition-all duration-500 ease-in-out;
  }

   .nav-bar.burger-on .menu-item {
    @apply mt-half transition-all duration-500 ease-in-out;
  }
</style>

<header class="mb-two w-full">
    <div class="flex-container">
      <div class="title-wrapper">
      <h1 class="m-0 font-medium">
          <a href="/" class="text-black no-underline">{siteTitle}</a>
      </h1>
      <button class="sm:hidden" tabIndex={0} on:click={toggleBurger}>
        <Burger click={burgerOn}/>
      </button>
      </div>
      <div class={`nav-bar ${burgerOn ? 'burger-on pointer-events-auto' : 'sm:pointer-events-auto pointer-events-none'}`}>
        <nav>
          <ul class="menu">
            {#each menuLinks as link}
              <li class="menu-item">
                <a href={link.link} class="menuItem" on:click={clickMenuItem}>{link.name}</a>
              </li>
            {/each}
          </ul>
        </nav>
      </div>
    </div>
</header>