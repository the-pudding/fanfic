<script>
	import TreemapNode from './TreemapNode.svelte';

	export let root;
</script>

<pancake-treemap>
	<TreemapNode node={root} let:node>
		<slot {node}></slot>
	</TreemapNode>
</pancake-treemap>

<style>
	pancake-treemap {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
		border: 2px solid;
		border-color: var(--window-inset-stroke);
	}
</style>