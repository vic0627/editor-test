<template>
  <div id="app">
    <!-- <Editor @transportContent="transportContent" /> -->
    <Upload />
  </div>
</template>

<script>
import Editor from "./components/Editor.vue";
import Upload from "./components/Upload.vue";

export default {
  name: "App",
  data() {
    return {
      title: "",
      html_content: "",
    };
  },
  components: {
    Editor,
    Upload,
  },
  // methods: {
  //   transportContent({ html_content, title }) {
  //     this.title = title;
  //     this.html_content = html_content;
  //   },
  // },
  // updated() {
  //   console.log(this.title + this.html_content);
  // },
  // watch: {
  //   html_content(n) {
  //     console.log(n);
  //   },
  //   title(n) {
  //     console.log(n);
  //   },
  // },
};
</script>

<style lang="scss"></style>
