<script lang="ts" setup>
import ModalUpdateTitle from "./ModalUpdateTitle.vue";

const { todos, updateTodoTitle, removeTodo } = useTodo();

function onUpdateTitle(id: string, newTitle: string) {
  updateTodoTitle(id, newTitle)
}

function onDeleteConfirmed(id: string) {
  removeTodo(id);
} 
</script>
<template>
  <div>
    <ul v-if="todos.length > 0" class="flex flex-col gap-6">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="border border-gray-300 rounded-md p-2"
      >
        <header class="flex justify-between">
          <span class="font-bold">
            {{ todo.title }}
          </span>
          <div class="flex gap-0.5">
            <ModalUpdateTitle
              header-title="Update Todo List Title"
              :previous-title="todo.title"
              placeholder="Enter a title of the todo list"
              @updated="onUpdateTitle(todo.id, $event)"
            >
              <UButton color="secondary" size="xs">Update Title</UButton>
            </ModalUpdateTitle>
            <ModalConfirm
              title="Delete Todo List"
              :description="`Todo title: ${todo.title}`"
              confirm-color="error"
              @confirmed="onDeleteConfirmed(todo.id)"
              >
              <UButton
                color="error"
                size="xs">Delete</UButton>
            </ModalConfirm>
          </div>
        </header>
        <main class="mt-2">
          <TodoListItem :todo="todo" />
          <div class="mt-4">
            <FormCreateTodoListItem :todo-id="todo.id" />
          </div>
        </main>
      </li>
    </ul>

    <p v-else class="italic text-gray-500">No todo found.</p>

    <div class="mt-6 bg-gray-100 rounded p-4">
      <h2 class="font-bold text-lg mb-2">Create a todo list</h2>
      <FormCreateTodoList />
    </div>

    <DevOnly>
      <pre>{{ todos }}</pre>
    </DevOnly>
  </div>
</template>
