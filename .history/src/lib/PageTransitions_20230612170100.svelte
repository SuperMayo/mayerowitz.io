<script>
    import { flip } from 'svelte/transition';
</script>
  
<div
    in:flip="{{duration: 200, delay: 200 }}"
    out:flip="{{duration: 200 }}" 
    >
    <slot/>
</div>