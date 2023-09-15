<script lang="ts">
    import Button from '$lib/Button.svelte'
	export let showModal: Boolean; // boolean

	let dialog : HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
    class="max-w-lg p-0 bg-beige"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation
        class="p-one">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-0 border-b rounded-t dark:border-teal-600">
            <slot name="header"/>
            <button autofocus on:click={() => dialog.close()}
                type="button"
                class="text-gray-400 bg-transparen hover:text-teal-700 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" data-modal-hide="defaultModal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
        </div>
        <!-- Modal content -->
		<slot />
		<!-- svelte-ignore a11y-autofocus -->
		<Button autofocus on:click={() => dialog.close()} >close</Button>
	</div>
</dialog>

<style>
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(3px);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>