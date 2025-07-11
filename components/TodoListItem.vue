<script lang="ts" setup>
const { getTodo } = useTodo();
const props = defineProps<{
  todo: TodoList;
}>();

const currentTodo = getTodo(props.todo.id);

function onToggleItem(id:string, value: boolean | 'indeterminate') {
  if(value === 'indeterminate') {
    return; // Ignore indeterminate state
  }
  if(value){
    currentTodo.markItemDone(id);
  }else{
    currentTodo.markItemUndone(id);
  }
}

function onItemTitleUpdated(id: string, newTitle: string) {
  currentTodo.updateItemTitle(id, newTitle);
}

function onDeleteConfirmed(id: string) {
  currentTodo.removeItem(id);
}
</script>

<template>
  <ul class="flex flex-col gap-1">
    <li v-for="item in currentTodo.todo.items" :key="item.id">
      <div class="flex items-center gap-1">
        <UCheckbox :model-value="item.done" @update:model-value="onToggleItem(item.id, $event)">
          <template #label>
            <span :class="{'line-through text-gray-400': item.done}">{{ item.title }}</span>
          </template>
        </UCheckbox>
         <ModalUpdateTitle
              header-title="Update Todo List Item Title"
              :previous-title="item.title"
              placeholder="Enter a title of the todo list"
              @updated="onItemTitleUpdated(item.id, $event)"
            >
            <Icon name="material-symbols:edit" size="18px" class="text-blue-600 cursor-pointer" @click="$emit('edit-item', item.id)"/>
            </ModalUpdateTitle>
            <ModalConfirm
              title="Are you sure you want to delete this item?"
              :description="`Todo title: ${item.title}`"
              confirm-color="error"
              @confirmed="onDeleteConfirmed(item.id)"
              >
              <Icon name="material-symbols:delete-forever" size="18px" class="text-red-600 cursor-pointer"/>
            </ModalConfirm>
      </div>
    </li>
  </ul>
</template>
