<!--
 * @Description: 
 * @Author: Sunly
 * @Date: 2023-09-14 07:06:10
-->
<template>
  <div id="app">
    <div style="padding: 8px; border: 1px solid #ccc; border-radius: 4px">
      <h1>App</h1>
      <router-link to="/foo">to foo</router-link> |
      <router-link to="/bar">to bar</router-link>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
