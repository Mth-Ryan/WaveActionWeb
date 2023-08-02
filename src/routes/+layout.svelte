<script>
	import '../app.css';
	import BackgroundGradient from '$lib/assets/background-gradient.svg';
</script>

<img class="absolute top-0 left-0 z-negative max-h-screen" src={BackgroundGradient} alt="" />

<slot />

<style lang="postcss">
	:global(html) {
		@apply bg-slate-950;
		@apply text-slate-300;
}

	:global(body) {
		@apply w-screen;
		@apply h-screen;
	}
	
	:global(a) {
		@apply text-sky-700;
	}
	
	:global(a:visited) {
		@apply text-sky-900;
	}

	:global(.z-negative) {
		z-index: -1;
	}
	
	:global(.elevated-button) {
		@apply bg-slate-200;
		@apply text-slate-950;
		@apply font-bold;
		@apply px-5;
		@apply py-2;
		@apply rounded-md;
	}

	:global(.outlined-button) {
		@apply bg-transparent;
		@apply text-slate-200;
		@apply border-2;
		@apply border-slate-200;
		@apply font-bold;
		@apply px-5;
		@apply py-2;
		@apply rounded-md;
	}
	
	:global(.elevated-button:hover, .outlined-button:hover) {
		box-shadow: 0 0 0.5rem theme(colors.slate.300);
	}

	:global(.outline-input-label) {
		@apply flex;
		@apply gap-2;
		@apply items-center;
		@apply text-slate-700;
		@apply bg-slate-800;
		@apply bg-opacity-50;
		@apply border;
		@apply border-slate-700;
		@apply rounded-md;
		@apply px-2;
		@apply py-1;
	}

	:global(.outline-inner-input) {
		@apply bg-transparent;
		@apply border-none;
		@apply outline-none;
		@apply text-slate-300;
		@apply placeholder:text-slate-700;
		@apply w-full;
	}
</style>
