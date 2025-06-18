<script lang="ts" setup>
if(import.meta.client) {
  await callOnce(() => {
    const {loadTodos} = useTodo()
    loadTodos();
  })
}

await callOnce(async () => {
  const { getCurrentUser } = useUser()
  await getCurrentUser();
})
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
