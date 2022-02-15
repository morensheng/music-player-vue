<template>
  <div class="containerr body-bg">
    <Search />
    <Item />
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import Item from "./components/Item.vue";

export default {
  name: "App",
  components: {
    Search,
    Item,
  },
};
</script>

<style scoped>
.containerr {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  overflow: hidden;
  min-width: 400px;
}
.body-bg {
  background-color: #5ebee4;
}
/* 解决页面左右溢出 */
html,
body {
  max-width: 100%;

  overflow-x: hidden;
}
</style>

