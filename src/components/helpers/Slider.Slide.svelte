<script>
	import { getContext } from "svelte";
	import canTab from "$actions/canTab.js";
	const { dir, cur, w, h, count } = getContext("Slider");

	export let index;
	export let className;

	$: width = $dir === "horizontal" ? `${$w}px` : "100%";
	$: height = $dir === "vertical" ? `${$h}px` : "100%";
	$: visible = index === $cur;
	$: disable = !visible;
</script>

<div
	class="slide slide-{className}"
	class:visible
	style:width
	style:height
	role="group"
	aria-label="slide {index + 1} of {$count}"
	aria-current={visible}
	use:canTab={{ disable }}
>
	<slot />
</div>

<style>
	.slide {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 100vh;
	}

	.slide-slash {
		background: red;
	}

	.slide-noncanon {
		background: blue;
	}

	.slide-realpeople {
		background: green;
	}
</style>
