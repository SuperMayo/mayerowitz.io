<script lang="ts">
    import { page } from "$app/stores";
    import Burger from "./Burger.svelte";
    import Logo from "./Logo.svelte";

    let burgerOn: boolean = false;
    export let menuLinks: { name: string; link: string }[] = [];

    function toggleBurger() {
        burgerOn = !burgerOn;
    }

    function clickMenuItem() {
        if (burgerOn) toggleBurger();
    }

    // Get the current page path for the active menu item
    $: path = $page.url.pathname;
</script>

<header class="blur-3 mb-two w-full">
    <div class="flex max-w-screen-lg flex-col items-center justify-between p-half sm:flex-row">
        <div class="flex w-full items-center justify-between">
            <h1 class="m-0 font-medium">
                <a href="/" class="text-black no-underline"><Logo /></a>
            </h1>
            <button class="sm:hidden" tabIndex={0} on:click={toggleBurger}>
                <Burger click={burgerOn} />
            </button>
        </div>
        <div
            class={`nav-bar -mt-one max-h-0 w-full opacity-0 transition-all duration-500 ease-in-out sm:mt-0 sm:max-h-screen sm:opacity-100
      ${burgerOn ? "burger-on pointer-events-auto" : "pointer-events-none sm:pointer-events-auto"}`}
        >
            <nav>
                <ul class="m-0 text-right sm:flex sm:items-center sm:justify-end sm:text-left">
                    {#each menuLinks as link}
                        <li class="menu-item m-0 p-half">
                            <a
                                href={link.link}
                                class="mt-quarter whitespace-nowrap font-sans lowercase"
                                class:active={path == link.link}
                                on:click={clickMenuItem}>{link.name}</a
                            >
                        </li>
                    {/each}
                </ul>
            </nav>
        </div>
    </div>
</header>

<style lang="postcss">
    .nav-bar.burger-on {
        @apply block max-h-screen translate-y-one opacity-100 ease-in-out;
    }

    .menu-item > a::before {
        content: "/";
    }

    .menu-item > a.active::before {
        content: ">";
    }
</style>

