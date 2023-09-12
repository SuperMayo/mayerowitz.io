<script>
    import { blur } from 'svelte/transition';
</script>
  
<div
    in:blur="{{duration: 250, delay: 300 }}"
    out:blur="{{duration: 250 }}" 
    >
    <slot/>
</div>