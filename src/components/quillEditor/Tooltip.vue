<template>
    <div ref="qlTooltip" class="ql-tooltip" v-if="visible">
        <svg width="13" height="6" viewBox="0 0 13 6" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.91421 1.41422C7.13317 0.633167 5.86684 0.633166 5.08579 1.41421L0.500001 6L12.5 6L7.91421 1.41422Z" fill="#25282B" />
        </svg>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        visible: {
            type: Number,
            default: 0
        },
        position: {
            type: Object,
            default: () => ({})
        }
    },
    updated() {
        const tooltip = this.$refs.qlTooltip
        if (tooltip && this.visible === 1) {
            const halfWidth = tooltip.offsetWidth / 2
            const left = this.position.left - halfWidth
            tooltip.style = `top: ${this.position.top}px; left: ${left}px; opacity: ${this.visible}`
        }
    }
}
</script>
<style lang="scss" scoped>
.ql-tooltip {
    padding: 6px 12px;
    background: #25282B;
    border-radius: 4px;
    color: #fff;
    position: fixed;
    top: -100%;
    pointer-events: none;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s;
    svg {
        position: absolute;
        top: -6px;
        left: calc(50% - 6px);
    }
}
</style>
