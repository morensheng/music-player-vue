/* 配置组件的结构 */
<template>
  <div class="row">
    <!-- <h1 class="jz" v-show="listInfo.isFirst">欢迎使用</h1> -->
    <!-- <h2 v-show="listInfo.isLoading">Loading....</h2> -->
    <!-- <h2 class="jz" v-show="listInfo.errMsg">{{ listInfo.errMsg }}</h2> -->
    <!-- <div
      v-show="listInfo.users.length"
      class="card"
      v-for="userObj in listInfo.users"
      :key="userObj.login"
    > -->
    <div
      class="card"
      v-for="(s, index) in itemInfo"
      :key="listInfo[index].id"
      @click="ListenMusic(listInfo[index].id)"
    >
      <a href="#" target="_blank">
        <img :src="s.picUrl" style="width: 100px" />
      </a>
      <p class="card-text">{{ listInfo[index].name }}</p>
    </div>
  </div>
</template>

/* 配置组件数据、交互、事件等等 */
<script>
export default {
  name: "Item",
  data() {
    return {
      listInfo: {},
      itemInfo: [],
    };
  },
  methods: {
    ItemData(dataObj) {
      // 清除缓存
      this.listInfo = {};
      this.itemInfo = [];
      // 将数据展开并赋值 第一个参数没有参数则会将第二个参数赋去
      this.listInfo = { ...this.listInfo, ...dataObj };
      for (let i = 0; i < dataObj.length; i++) {
        this.itemInfo.push(dataObj[i].al);
      }
    },
    ListenMusic(id) {
      console.log(id);
    },
  },
  mounted() {
    this.$bus.$on("ItemData", this.ItemData);
  },
};
</script>

/* 配置组件样式 */
<style scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
.jz {
  text-align: center;
}
</style>