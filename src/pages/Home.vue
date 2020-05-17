<template>
	<div>
		<div>Home</div>
		<div style="display: flex; overflow: auto;">
			<StatusColumn
				v-for="status in statuses"
				ref="column"
				:key="status.title"
				:status="status"
				:items="items"
				:current="current"
				@start-moving="startMoving"
			/>
		</div>

		<JCard
			v-if="currentItem"
			:id="current"
			:current="current"
			:item="currentItem"
			style="position: absolute;"
			:style="`left: ${left + startMovingPosition[1]}px; top: ${top + startMovingPosition[0]}px`"
		/>
	</div>
</template>

<script>
import StatusColumn from 'Components/StatusColumn'
import JCard from 'Components/JCard'
import data from 'Components/json.json'

const JCardHeight = 108

export default {
	name: 'Home',
	components: {
		StatusColumn,
		JCard,
	},
	data() {
		return {
			statuses: [],
			items: {},
			current: -1,
			left: 0,
			top: 0,
			startMovingPosition: [0, 0],
			initialColumn: -1,
		}
	},
	computed: {
		currentItem() {
			return this.items[this.current]
		},
	},
	created() {
		this.setData()
	},
	mounted() {
		window.addEventListener('mousemove', this.move)
		window.addEventListener('mouseup', this.endMoving)
	},
	beforeDestroy() {
		window.removeEventListener('mousemove', this.move)
		window.removeEventListener('mouseup', this.endMoving)
	},
	methods: {
		setData() {
			this.statuses = data.statuses
			this.items = data.items
		},
		startMoving(item, e) {
			this.top = e.clientY
			this.left = e.clientX
			this.startMovingPosition = [e.target.offsetTop - e.clientY - 4, e.target.offsetLeft - e.clientX - 4]
			this.initialColumn = this.statuses.findIndex(tab => tab.items.includes(item))
			this.current = item
		},
		move(el) {
			if (this.current === -1) return

			this.top = el.clientY
			this.left = el.clientX

			const newColumnPosition = this.getNewColumnPosition(el.clientX)
			const newRowPosition = this.getNewRowPosition(newColumnPosition, el.clientY)

			this.removeCurrentItemFromColumns()

			const { items } = this.statuses[newColumnPosition]

			items.splice(newRowPosition, 0, this.current)

			this.statuses[newColumnPosition].items = items
		},
		getNewColumnPosition(positionX) {
			const { initialColumn } = this

			const initialColumnElement = this.$refs.column[initialColumn].$el

			if (positionX > (initialColumnElement.offsetLeft + initialColumnElement.clientWidth) && this.statuses[initialColumn + 1]) return initialColumn + 1

			return initialColumn
		},
		getNewRowPosition(column, positionY) {
			const columnElement = this.$refs.column[column]
			const columnTop = columnElement.$el.offsetTop + columnElement.$el.firstChild.clientHeight
			const columnLength = columnElement.$children.length
			const rowPosition = Math.min(Math.round(((positionY + this.startMovingPosition[0]) - columnTop) / JCardHeight), columnLength)

			return Math.max(rowPosition, 0)
		},
		removeCurrentItemFromColumns() {
			const { initialColumn } = this

			for (let i = initialColumn; i < initialColumn + 2; i += 1) {
				const column = this.statuses[i]

				if (column) {
					const { items } = column
					const currentItemIndex = items.indexOf(this.current)

					if (currentItemIndex !== -1) {
						items.splice(currentItemIndex, 1)
						column.items = items
					}
				}
			}
		},
		endMoving() {
			this.current = -1
			this.initialColumn = -1
		},
	},
}
</script>