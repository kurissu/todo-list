<script lang="ts" setup>
if(import.meta.client) {
  await callOnce(() => {
    const {loadTodos} = useTodo()
    loadTodos();
  })
}
</script>
<template>
  <div>
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
