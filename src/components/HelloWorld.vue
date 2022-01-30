/* 配置组件的结构 */
<template>
  <div>
    <h2>{{ Hello }}</h2>
    <h2>{{ Hello }}</h2>
    <h2>{{ Hello }}</h2>
    <h2>{{ Hello }}</h2>
  </div>
</template>

/* 配置组件数据、交互、事件等等 */
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      Hello: "你好",
    };
  },
};
</script>

/* 配置组件样式 */
<style scoped>
</style>