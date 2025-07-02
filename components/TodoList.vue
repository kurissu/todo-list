<script lang="ts" setup>
import ModalUpdateTitle from "./ModalUpdateTitle.vue";
const toast = useToast();
const { user } = useUser();
const { todos, updateTodoTitle, removeTodo, syncTodo } = useTodo();

function onUpdateTitle(id: string, newTitle: string) {
  updateTodoTitle(id, newTitle)
}

function onDeleteConfirmed(id: string) {
  removeTodo(id);
} 

const syncBtnLoading = ref(false);

async function onSyncTodo(id: string){
  syncBtnLoading.value = true;
  try {
    const res = await syncTodo(id);
    if(res) {
      toast.add({title: res, color: 'success'});
    }
  } catch (error) {
     toast.add({title: (error as Error)?.message || 'Unknown error', color: 'error'});
  }
  syncBtnLoading.value = false;
}
</script>
<template>
  <ClientOnly>

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
            <div class="flex items-center gap-0.5">
              <div class="text-xs mr-1">
                <span class="font-semibold">Mode: </span>
                <span :class="{'text-green-600': todo.onlineMode, 'text-red-600': !todo.onlineMode}">{{ todo.onlineMode ? 'Online' : 'Offline' }}</span>
              </div>
              <UButton
                v-if="!todo.onlineMode && user"
                size="xs" class="ml-2" color="secondary"
                @click="onSyncTodo(todo.id)" :loading="syncBtnLoading">Sync</UButton>
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
  </ClientOnly>
</template>
