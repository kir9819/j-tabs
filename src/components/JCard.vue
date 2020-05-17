<template>
	<div class="j-card">
		<div
			:style="`cursor: ${current === item.id ? 'grabbing': 'grab'}`"
			@mousedown="$emit('start-moving', $event)"
		>
			<div class="j-card-block">
				<a :href="item.project.link">{{ item.project.label }}</a>
			</div>
		</div>
		<div class="j-card-block j-card-header">
			<span>№ <router-link :to="`/${item.id}`">{{ item.id }}</router-link></span>
			<span>{{ priorityText }}</span>
		</div>
		<div class="j-card-block j-card-status" :style="`background-color: ${statusColor};`">
			<span>{{ statusText }}</span>
			<span class="j-card-deadline">{{ item.deadline }}</span>
		</div>

		<div class="j-card-block j-card-message">{{ item.message }}</div>

		<div class="j-card-block j-card-responsible">
			<span
				v-for="responsible in item.responsible"
				:key="responsible"
			>{{ responsible }}</span>
		</div>
	</div>
</template>

<script>
const StatusColors = {
	0: '#a5d6a7',
	1: '#81c784',
	2: '#fff59d',
}

const StatusText = {
	0: 'new',
	1: 'm/e',
	2: 'error',
}

const PriorityText = {
	0: 'норм',
}

export default {
	name: 'JCard',
	props: {
		item: {
			type: Object,
			required: true,
		},
		current: {
			type: Number,
			required: true,
		},
	},
	computed: {
		statusColor() {
			return StatusColors[this.item.status]
		},
		statusText() {
			return StatusText[this.item.status]
		},
		priorityText() {
			return PriorityText[this.item.priority]
		},
	},
}
</script>

<style lang="scss">
.j-card {
	width: 200px;
	height: 160px;
	border: 1px solid;
	border-radius: 4px;
	margin-bottom: 4px;
	font-size: 14px;
	user-select: none;

	&-block {
		padding: 4px;
		box-sizing: border-box;
		min-height: 24px;
	}

	&-header {
		display: flex;
		justify-content: space-between;
		background-color: #43a047;

		a {
			color: black;
		}
	}

	&-status {
		display: flex;
		justify-content: space-between;
	}

	&-deadline {
		font-weight: bold;
		color: #b71c1c;
	}

	&-message {
		height: 64px;
		overflow: auto;
		user-select: text;
	}

	&-responsible {
		span {
			padding: 0 4px;
		}
	}
}
</style>