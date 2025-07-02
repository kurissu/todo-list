<script setup lang="ts">
const input = ref({
  email: "",
  password: "",
});

const toast = useToast()
const loading = ref(false)


const { login } = useUser()

async function onLogin() {
  // Handle sign-up logic here
  try {
    loading.value= true
    const data = await login(input.value.email, input.value.password);
    toast.add({
      title: `Login successful! with ${data.user.email}`,
      color: "success",
    });
    await navigateTo("/");
  } catch (error) {
    toast.add({
      title: (error as Error)?.message || "An error occurred",
      color: "error",
    })
    loading.value = false
  }
  // const {data, error} = await authClient.signIn.email({
  //   ...input.value,
  // });
  // if (error) {
  // } 
}
</script>



<template>
  <div class="max-w-xs mx-auto ">
    <h1 class="font-bold text-2xl">Login</h1>
    <form @submit.prevent="onLogin">
      <div class="flex flex-col gap-1 mt-4">
        <UFormField label="Email">
          <UInput v-model="input.email" name="email" class="w-full" placeholder="Email" type="email" />
        </UFormField>
        <UFormField label="Password">
          <UInput
            v-model="input.password" name="password" class="w-full"
            placeholder="Password"
            type="password"
          />
        </UFormField>
        <div class="mt-3">
          <UButton block type="submit" :loading="loading" >Login</UButton>
        </div>
      </div>
    </form>
  </div>
</template>
