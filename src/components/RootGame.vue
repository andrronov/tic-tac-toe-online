<script setup></script>

<template>
  <div
    class="w-full max-w-7xl mx-auto h-screen flex justify-between py-2 items-center flex-col"
  >
    <slot name="info" />

    <slot name="matrix" />

    <slot name="result" />

    <div class="flex flex-col items-center gap-3">
      <slot name="actions" />
    </div>
  </div>
</template>
