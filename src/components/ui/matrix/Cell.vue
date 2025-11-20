<script setup>
defineProps({
  cells: { type: Array },
  canMove: { type: Boolean },
});

const emit = defineEmits(["userMove"]);
</script>

<template>
  <div
    v-for="(item, index) in cells"
    :key="index"
    @click="emit('userMove', index)"
    :class="{
      'pointer-events-none': !canMove || item.length > 1,
    }"
    class="place-self-center w-24 h-24 cursor-pointer text-2xl flex items-center justify-center bg-gray-400"
  >
    {{ item }}
  </div>
</template>
