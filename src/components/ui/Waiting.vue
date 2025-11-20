<script setup>
import { useRouter } from "vue-router";
import Button from "@/components/ui/Button.vue";

const router = useRouter();
</script>

<template>
  <div
    class="fixed inset-0 flex flex-col gap-4 items-center justify-center bg-black text-white text-2xl"
  >
    <p>Waiting for second player...</p>
    <Button @click="router.push({ name: 'lobby' })" class="mt-2">
      Back to lobby
    </Button>
  </div>
</template>
