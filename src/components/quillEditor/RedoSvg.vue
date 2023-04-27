<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g>
      <path
        d="M19 9L15 13V5L19 9ZM19 9H8C6.93913 9 5.92172 9.42143 5.17157 10.1716C4.42143 10.9217 4 11.9391 4 13C4 14.0609 4.42143 15.0783 5.17157 15.8284C5.92172 16.5786 6.93913 17 8 17H9"
        :stroke="strokeColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</template>
<script>
export default {
  name: "RedoSvg",
  props: {
    disable: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    strokeColor() {
      let color;
      this.disable === 0 ? (color = "#CACCCF") : (color = "#000000");
      return color;
    },
  },
};
</script>
