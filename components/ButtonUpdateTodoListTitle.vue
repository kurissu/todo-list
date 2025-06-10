<script lang="ts" setup>
const { updateTodoTitle } = useTodo();

const props = defineProps<{
  todo: TodoList;
}>();

const title = ref(props.todo.title);
const open = ref(false);

function onUpdated() {
  updateTodoTitle(props.todo.id, title.value);
  open.value = false;
}
</script>

<template>
  <UModal v-model:open="open" title="Update Todo List Title" :close="{}" :ui="{ content: 'max-w-sm' }">
    <UButton color="secondary" size="xs">Update Title</UButton>
    <template #body>
        <form @submit.prevent="onUpdated">
          <div class="flex gap-2">
            <UInput v-model="title" placeholder="Enter a new title" class="w-full"/>
            <UButton type="submit">Update</UButton>
          </div>
        </form>
    </template>
  </UModal>
</template>
