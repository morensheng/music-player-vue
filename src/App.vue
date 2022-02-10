<template>
  <div class="container body-bg">
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
.body-bg {
  height: 100%;
  background: url("../src/assets/bg.jpg") no-repeat 100% 100%/100% 100%;
  background-attachment: fixed;
}
</style>

