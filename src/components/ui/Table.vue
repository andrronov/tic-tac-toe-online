<script setup>
defineProps({
  rows: { type: Array },
});
const emit = defineEmits(["playGame"]);

const tableHeaders = ["Host", "Players", ""];
</script>

<template>
  <table class="table-auto w-full border-2 text-center">
    <thead>
      <tr>
        <th
          v-for="(title, index) in tableHeaders"
          :key="index"
          class="px-4 py-2"
        >
          {{ title }}
        </th>
      </tr>
    </thead>
    <tbody v-if="rows">
      <tr v-for="(row, index) in rows" :key="index">
        <td class="border px-4 py-2">{{ row?.players[0] }}</td>
        <td class="border px-4 py-2">{{ row?.players.length }} / 2</td>
        <td
          @click="emit('playGame', row.id)"
          class="border px-4 py-2 hover:bg-white hover:text-black cursor-pointer"
        >
          Enter
        </td>
      </tr>
    </tbody>
  </table>
</template>
