import axios from "axios";
import { ref } from "vue";
import { getMsg } from "./utils";
import { notifyError, notifySuccess } from "./notyf";
import { useRouter } from "vue-router";

export function usePostData<T, R>() {
  const isLoading = ref(false);
  const results = ref<any>(null);
  const router = useRouter();
  const error = ref<string | null>(null);
  const urlBase = ref(import.meta.env.VITE_API_BASE_URL);
  const msg = ref<any>("");
  const postData = async (url: string, body: T) => {
    isLoading.value = true;
    results.value = null;
    error.value = null;
    msg.value = "";
    try {
      const { data } = await axios.post(urlBase.value + url, body, {
        withCredentials: true,
      });
      msg.value = getMsg(data.message);
      results.value = data;
      notifySuccess(msg.value);
    } catch (error: any) {
      results.value = [];
      console.log(error)
      msg.value = getMsg(error?.response?.data?.message || "Server error");
      msg.value == "Unauthorized user" ? router.replace("login") : "";
      notifyError(msg.value);

    } finally {
      isLoading.value = false;
    }
  };
  return {
    isLoading,
    postData,
    error,
    results,
  };
}
