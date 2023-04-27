<template>
  <div id="app">
    <Editor @transport-html="transportHTML" />
  </div>
</template>

<script>
import Editor from "./components/Editor.vue";

export default {
  name: "App",
  data() {
    return {
      html_content: "",
    };
  },
  components: {
    Editor,
  },
  methods: {
    transportHTML(ql) {
      this.html_content = ql;
    },
  },
  watch: {
    html_content(n) {
      // console.log(n);
    },
  },
};
</script>

<style lang="scss"></style>
