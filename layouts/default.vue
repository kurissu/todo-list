<script lang="ts" setup>
const toast = useToast();

const { user, logout } = useUser();
async function onLogout() {
  await logout();
  toast.add({
    title: "Logout successful",
    color: "success",
  });
  await navigateTo("/");
}
</script>


<template>
  <div class="p-3 text-gray-700">
    <nav>
      <div class="max-w-md mx-auto bg-gray-100 p-2 rounded-md shadow">
        <ul class="flex items-center gap-2">
          <li>
            <NuxtLink class="font-bold text-lg text-blue-600 underline" to="/"
              >Todo List</NuxtLink
            >
          </li>
          <template v-if="!user">
            <li class="ml-auto">
              <NuxtLink class="text-blue-600 underline" to="/login"
                >Login</NuxtLink
              >
            </li>
            <li>
              <NuxtLink class="text-white bg-blue-600 py-1 px-2 rounded-md" to="/sign-up"
                >Sign Up</NuxtLink
              >
            </li>
          </template>
          <template v-else>
            <li class="ml-auto"><span>{{ user.email }}</span></li>
            <li><UButton @click="onLogout">Logout</UButton></li>
            </template>
        </ul>
      </div>
    </nav>
    <main class="mt-4">
      <div class="max-w-md mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
