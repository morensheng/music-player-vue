/* 配置组件的结构 */
<template>
  <section class="text-center search">
    <h3 class="p1">永远相信美好的事情即将发生</h3>
    <div>
      <input
        type="text"
        class="form-control"
        v-model="keyWord"
        @keyup.enter="Search"
        placeholder="输入你需要查找的歌曲或歌手"
      />&nbsp;
      <button @click="Search" class="btn btn-info">搜索</button>
    </div>
  </section>
</template>

/* 配置组件数据、交互、事件等等 */
<script>
// import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    Search() {
      // 请求之前通知Item组件更新他的data
      this.$bus.$emit("UpdatedData", { isFirst: false, isLoading: true });
      this.$axios
        .get(
          /* 
            必选参数 : keywords : 关键词
            可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
            type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
            接口地址 : /search 或者 /cloudsearch(更全)
            调用例子 : /search?keywords=海阔天空 /cloudsearch?keywords=海阔天空
          */
          `cloudsearch?keywords=${this.keyWord}&limit=100`
        )
        .then(
          (response) => {
            this.$bus.$emit("ItemData", response.data.result.songs);
            this.$bus.$emit("UpdatedData", { isLoading: false });
            // 清空输入框
            this.keyWord = "";
          },
          (error) => {
            // console.log("失败了", error.message);
            this.$bus.$emit("UpdatedData", {
              isLoading: false,
              errMsg: error.message,
            });
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
.search{
  margin: 2rem 0;
  overflow: hidden;
}
.p1 {
  font-family: STXingkai; /* 这是字体英文名称 */
  text-align: center;
}
.form-control {
  width: 220px !important;
  display: inline-block;
}
</style>
