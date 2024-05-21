<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
const apiUrl = import.meta.env.VITE_APP_BASE_API
console.log(apiUrl)
</script>

<template>
  <div class="w-100% h-100% bg-red">123s</div>
  <div class="w-200px h-200px">1</div>
  {{ apiUrl }}
</template>

<style scoped></style>
