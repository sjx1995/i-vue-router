<!--
 * @Description: 
 * @Author: Sunly
 * @Date: 2023-09-14 07:55:27
-->
<template>
  <div style="padding: 8px; border: 1px solid #ccc; border-radius: 4px">
    <h2>bar</h2>
    <router-link to="/bar/child1">to bar child1</router-link> |
    <router-link to="/bar/child2">to bar child2</router-link>
    <router-view />
  </div>
</template>
