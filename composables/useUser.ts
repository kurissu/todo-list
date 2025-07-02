import type { User } from "better-auth";
import { authClient } from "~/lib/auth-client";

export function useUser() {
  const user = useState<User | null>("user", () => null);

  async function getCurrentUser() {
    //HTTP client
    //Web browser (cookie) ==> http://localhost:3000/ (nuxt)
    //Nuxt (cookie) ==> BetterAuth (cookie)
    // BetterAuth ==> Database

    try {
      const session = await authClient.getSession({
        fetchOptions: {
          headers: useRequestHeaders(["cookie"]),
        },
      });
      if (session.error || !session.data) {
        user.value = null;
        return;
      }
      user.value = session.data.user;
    } catch (error) {
      console.error("Error fetching current user:", error);
      user.value = null;
    }
  }

  async function login(email: string, password: string) {
    // Handle sign-up logic here
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message || "An error occurred during login");
    }
    await getCurrentUser();
    const { loadTodoListFromOnline } = useTodo()
    await loadTodoListFromOnline()
    return data;
  }
  async function logout() {
    await authClient.signOut();
    user.value = null;
    const { clearTodoListOnline } = useTodo()
    clearTodoListOnline();
  }
  async function signUp(name: string, email: string, password: string) {
    const { data, error } = await authClient.signUp.email({ name, email, password })
    if (error) {
      throw new Error(error.message || 'Unknown error')
    }
    return data
  }

  return {
    user,
    getCurrentUser,
    login,
    logout,
    signUp
  };
}
