<script>
    import { fly } from 'svelte/transition';
  </script>
  
<div
    in:fly="{{ y: -50, duration: 300, delay: 0}}"
    out:fly="{{ y: -50, duration: 300 }}" 
    >
    <slot/>
</div>