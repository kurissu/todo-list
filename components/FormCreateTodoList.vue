<script lang="ts" setup>

const { addTodo } = useTodo();

const title = ref("");

function onSubmit(){
  addTodo(title.value);
  title.value = "";
}

</script>


<template>
  <form @submit.prevent="onSubmit">
    <div class="flex gap-1">
      <UInput v-model="title" class="w-full" placeholder="Enter Todo list items"/>
      <UButton type="submit">Submit</UButton>
    </div>
  </form>
</template>
