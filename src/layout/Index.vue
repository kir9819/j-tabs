<template>
	<main>
		<router-view/>
	</main>
</template>

<script>
export default {
	name: 'Layout',
	data() {
		return {
			isCardLayout: true,
		}
	},
	computed: {
		title() {
			return this.$route.meta.title
		},
	},
	watch: {
		title: 'setMetaTitle',
		$route() {
			this.isCardLayout = true
		},
	},
	methods: {
		handleDisableCardLayout(payload) {
			this.isCardLayout = payload
		},
		setMetaTitle() {
			document.title = this.title
		},
	},
}
</script>