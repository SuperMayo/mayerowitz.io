<script>
    import { blur } from 'svelte/transition';
</script>
  
<div
    in:blur="{{ y: -50, duration: 250, delay: 300 }}"
    out:blur="{{ y: -50, duration: 250 }}" 
    >
    <slot/>
</div>