<script lang="ts" setup>

const props = defineProps<{
  title: string;
  description?: string;
  confirmColor?: "secondary" | "primary" | "success" | "info" | "warning" | "error" | "neutral" | undefined;
}>();

const emit = defineEmits<{
 confirmed: [];
}>();
const open = ref(false);

function onConfirmed() {
  emit('confirmed');
  open.value = false;
}

</script>

<template>
  <UModal v-model:open="open" :close="{}" :ui="{ content: 'max-w-sm' }">
    <slot/>
    <!-- <UButton color="error" size="xs">Delete</UButton> -->
    <template #content>
      <div class="p-4">
        <h2 class="font-bold mb-1">{{props.title}}</h2>
        <p v-if="props.description">Todo: "{{ props.description}}"</p>
        <div class="flex justify-end gap-1">
          <UButton @click="onConfirmed" :color="confirmColor">Confirm</UButton>
          <UButton @click="open = false" color="secondary">Cancel</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>