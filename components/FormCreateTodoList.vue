<script lang="ts" setup>

const { addTodo } = useTodo();

const title = ref("");

</script>


<template>
  <form @submit.prevent="addTodo(title)">
    <div class="flex gap-1">
      <UInput v-model="title" class="w-full" placeholder="Enter a title"/>
      <UButton type="submit">Submit</UButton>
    </div>
  </form>
</template>
