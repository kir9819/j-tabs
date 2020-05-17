<template>
	<div
		style="width: 100px; height: 100px; border: 1px solid; margin: 4px; user-select: none;"
	>
		<div
			:style="current === id ? 'cursor: grabbing' : 'cursor: grab'"
			@mousedown="$emit('start-moving', $event)"
		>{{ id }}</div>
	</div>
</template>

<script>
export default {
	name: 'JCard',
	props: {
		id: {
			type: Number,
			required: true,
		},
		item: {
			type: Object,
			required: true,
		},
		current: {
			type: Number,
			required: true,
		},
	},
}
</script>