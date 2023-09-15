<!--
 * @Description: 
 * @Author: Sunly
 * @Date: 2023-09-14 07:29:49
-->
<template>
  <div style="padding: 8px; border: 1px solid #ccc; border-radius: 4px">
    <h2>Foo</h2>
    <router-link to="/foo/child1">to foo child1</router-link> |
    <router-link to="/foo/child2">to foo child2</router-link>
    <router-view />
  </div>
</template>
