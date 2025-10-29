import { navAdminOpt, navUserOpt } from "@/data/options.nav";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useMainStore = defineStore("main", () => {
  const formAuth = ref<string>("signIn");
  const email = ref<string>("");
  const navUser = ref<any>([]);
  const role = ref<string>("");
  const setFormAuth = (value: string) => {
    formAuth.value = value;
  };
  const setEmail = (value: string) => {
    email.value = value;
  };
  const setRole = (value: string) => {
    role.value = value;
    switch (value) {
      case "user":
        navUser.value = [...navUserOpt];
        break;
      case "admin":
        navUser.value = [...navAdminOpt];
        break;

      default:
        break;
    }
  };

  return {
    formAuth,
    setFormAuth,
    setEmail,
    email,
    role,
    setRole,
    navUser,
  };
});
