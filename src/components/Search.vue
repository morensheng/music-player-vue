/* 配置组件的结构 */
<template>
  <section class="text-center search">
    <div class="p1">永远相信美好的事情即将发生</div>
    <div class="sdiv">
      <input
        type="text"
        class="form-control"
        v-model="keyWord"
        @keyup.enter="Search"
      />&nbsp;
      <!-- <button @click="Search" class="btn btn-info">搜索</button> -->
      <img
        src="https://s3.bmp.ovh/imgs/2022/02/3d705ac721cb611c.png"
        @click="Search"
        class="sbtn"
        alt=""
      />
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
.search {
  margin: 2rem 0;
  overflow: hidden;
}
.p1 {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
.sdiv {
  width: 100%;
  position: relative;
  margin: 0 auto;
}
.form-control {
  width: 10rem !important;
  display: inline-block;
}
input {
  height: 2rem;
  font-size: 1rem;
  padding-right: 2.2rem;
}
.sbtn {
  width: 1.5rem;
  position: absolute;
  top: 0.25rem;
  right: 2.8rem;
}
</style>
