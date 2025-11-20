<script setup>
defineProps({
  users: { type: Array, default: () => ["1", "2"] },
  count: { type: Number },
});
</script>

<template>
  <div class="w-full flex flex-row items-center justify-around">
    <p class="text-white" v-for="(user, index) in users" :key="index">
      {{ user }}
    </p>
  </div>
  <p class="text-white">User {{ count % 2 == 0 ? users[0] : users[1] }} move</p>
</template>
