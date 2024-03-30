<script lang="ts">
   export let size: number = 20;
   export let perc: number = 0.5;
   export let color: string = "gold";
</script>

<svg viewBox="0 0 50 100" width={size/2} height={size} class="inline -scale-y-[1] outline-black outline outline-1 mx-1">
   <rect width="100" height="{perc*100}" fill="{color}"/>
</svg>
