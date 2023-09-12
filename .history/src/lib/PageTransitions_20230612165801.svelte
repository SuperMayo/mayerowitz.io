<script>
    import { blur } from 'svelte/transition';
</script>
  
<div
    in:blur="{{duration: 200, delay: 200 }}"
    out:blur="{{duration: 200 }}" 
    >
    <slot/>
</div>