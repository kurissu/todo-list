<script lang="ts" setup>
const { removeTodo } = useTodo();
const open = ref(false);
function onRemove() {
  removeTodo(props.todo.id);
  open.value = false;
}

const props = defineProps<{ todo: TodoList}>();
</script>

<template>
  <UModal v-model:open="open" :close="{}" :ui="{ content: 'max-w-sm' }">
    <UButton color="error" size="xs">Delete</UButton>
    <template #content>
      <div class="p-4">
        <h2 class="font-bold mb-1">Are you sure you want to delete this todo list?</h2>
        <p class="mb-3">Todo: "{{ props.todo.title }}"</p>
        <div class="flex justify-end gap-1">
          <UButton @click="onRemove" color="error">Confirm</UButton>
          <UButton @click="open = false" color="secondary">Cancel</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>