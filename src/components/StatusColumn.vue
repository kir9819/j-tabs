<template>
	<div style="border: 1px solid; margin: 4px;">
		<div>{{ status.title }}</div>

		<JCard
			v-for="item in status.items"
			:id="item"
			:key="item"
			:item="items[item]"
			:current="current"
			:style="current === item ? 'opacity: 0.5;': 'opacity: 1;'"
			@start-moving="$emit('start-moving', item, $event)"
		/>
	</div>
</template>

<script>
import JCard from './JCard'

export default {
	name: 'StatusColumn',
	components: {
		JCard,
	},
	props: {
		status: {
			type: Object,
			required: true,
		},
		items: {
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