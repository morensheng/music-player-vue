/* 配置组件的结构 */
<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Music</h3>
    <div>
      <input
        type="text"
        v-model="keyWord"
        @keyup.enter="Search"
        placeholder="Enter The Name You Search"
      />&nbsp;
      <button @click="Search">Search</button>
    </div>
  </section>
</template>

/* 配置组件数据、交互、事件等等 */
<script>
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    Search() {
      axios
        .get(
          // "https://musicapi-five.vercel.app/login/cellphone?phone=15179223304&password=peng1114."
          `https://musicapi-five.vercel.app/cloudsearch?keywords=${this.keyWord}`
          // `https://musicapi-five.vercel.app/song/detail?ids=1915297033`
        )
        .then(
          (response) => {
            this.$bus.$emit("ItemData", response.data.result.songs);
            // 清空输入框
            this.keyWord = "";
          },
          (error) => {
            console.log("失败了", error.message);
            // 清空输入框
            this.keyWord = "";
          }
        );
    },
  },
};
</script>

/* 配置组件样式 */
<style scoped>
input {
  width: 220px;
}
</style>