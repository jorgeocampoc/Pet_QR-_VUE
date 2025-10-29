import axios from "axios";
import { ref } from "vue";
import { getMsg } from "./utils";
import { notifyError } from "./notyf";
import { useMainStore } from "@/stores/useMainStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export const useGetData = (url: string) => {
  const isLoading = ref<boolean>(false);
  const results = ref<any>(null);
  const error = ref<any>("");
  const store = useMainStore();
  const router = useRouter();
  const { formAuth } = storeToRefs(store);
  const urlBase = ref(import.meta.env.VITE_API_BASE_URL);
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  axios.defaults.withCredentials = true;
  const msg = ref<any>("");
  const getData = async () => {
    isLoading.value = true;
    results.value = null;
    error.value = "";
    msg.value = "";
    try {
      const { data } = await axios.get(urlBase.value + url);
      results.value = data;
    } catch (error: any) {
      results.value = [];
      msg.value = getMsg(error?.response?.data?.message || "");
      formAuth.value !== "signIn" ? notifyError(msg.value) : "";
      msg.value == "Unauthorized user" ? router.replace("login") : "";
    } finally {
      isLoading.value = false;
    }
  };

  
  return {
    isLoading,
    results,
    error,
    msg,
    getData,
  };
};
