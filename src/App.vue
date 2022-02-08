<template>
  <div class="container">
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

