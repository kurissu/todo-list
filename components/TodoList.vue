<script lang="ts" setup>
const { todos } = useTodo();

</script>
<template>
  <div>
    <ul class="flex flex-col gap-3">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="border border-gray-300 rounded-md flex justify-between p-2"
      >
        <span>
          {{ todo.title }}
        </span>
        <div class="flex gap-0.5">
          <ButtonUpdateTodoListTitle :todo="todo"/>
          <ButtonRemoveTodoList :todo="todo"/>
        </div>
      </li>
    </ul>

    <div class="mt-4 bg-gray-100 rounded p-4">
      <h2 class="font-bold text-lg mb-2">Create a todo list</h2>
      <FormCreateTodoList/>
    </div>
  </div>
</template>
