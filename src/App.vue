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
  background-color: skyblue;
}
</style>

