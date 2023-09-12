<script>
    import { fly, blur } from 'svelte/transition';
  </script>
  
<div
    in:fly="{{ y: -50, duration: 300, delay: 300 }}"
    out:fly="{{ y: -50, duration: 300 }}" 
    >
    <slot/>
</div>