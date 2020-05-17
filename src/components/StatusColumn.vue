<template>
	<div class="status-column">
		<div class="status-column-title">{{ status.title }} <i>({{ status.items.length }})</i></div>

		<JCard
			v-for="item in status.items"
			:key="item"
			:item="items[item]"
			:current="current"
			:style="`opacity: ${current === item ? 0.5 : 1};`"
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

<style lang="scss">
.status-column {
	margin-left: 4px;
	margin-right: 4px;

	&-title {
		font-weight: bold;
	}
}
</style>