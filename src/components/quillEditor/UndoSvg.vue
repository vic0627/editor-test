<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g>
      <path
        d="M5 9H16C17.0609 9 18.0783 9.42143 18.8284 10.1716C19.5786 10.9217 20 11.9391 20 13C20 14.0609 19.5786 15.0783 18.8284 15.8284C18.0783 16.5786 17.0609 17 16 17H15M9 13L5 9L9 5V13Z"
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
  name: "UndoSvg",
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
