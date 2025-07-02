<script lang="ts" setup>
if(import.meta.client) {
  await callOnce(async () => {
    const {loadTodos, loadTodoListFromOnline} = useTodo()
    const { user } = useUser()
    loadTodos();
    if(user.value){
      await loadTodoListFromOnline();
    }
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
