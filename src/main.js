import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import bigDataUpload from "./components/bigDataUpload/BigDataUpload";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/style.scss";
Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.$bigdataUpload = bigDataUpload({
  uploadKey:
    "https://demo.srgeo.com.tw/TP_PROJECT_SV/api/v1/Upload_File/uploadKey",
  upload: "https://demo.srgeo.com.tw/TP_PROJECT_SV/api/v1/Upload_File/upload",
  uploadMerge:
    "https://demo.srgeo.com.tw/TP_PROJECT_SV/api/v1/Upload_File/uploadMerge",
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
