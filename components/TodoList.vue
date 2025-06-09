<script lang="ts" setup>
const { todos, addTodo } = useTodo();
function onTodoListCreated(title: string) {
  addTodo(title);
}
</script>
<template>
  <div>
    <ul class="flex flex-col gap-3">
      <li v-for="todo in todos" :key="todo.id" class="border border-gray-300 rounded-md  p-2">
        {{ todo.title }}
      </li>
    </ul>

    <div class="mt-4 bg-gray-100 rounded p-4">
      <h2 class="font-bold text-lg mb-2">Create a todo list</h2>
      <CreateTodoList @created="onTodoListCreated" />
    </div>
  </div>
</template>
