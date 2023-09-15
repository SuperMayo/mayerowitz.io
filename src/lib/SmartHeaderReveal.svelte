<script lang="ts">
    import { onMount } from 'svelte';

    function scrollHide() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 0) {
                header.classList.add('header-hide');
            } else {
                header.classList.remove('header-hide');
            }
        }
    }

    onMount(() => {
        window.onscroll = function() {scrollHide()};
    });
</script>

<div class="fixed w-11/12 h-two">
    <slot/>
</div>

<style>
    header.hide {
        top:-80px;
    }
</style>