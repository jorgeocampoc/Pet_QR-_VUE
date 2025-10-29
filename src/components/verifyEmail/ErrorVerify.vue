<template>
    <div class="d-flex justify-content-center align-items-center full-screen">
        <div class="text-center">
            <i class="fa-solid fa-circle-xmark fs-custom text-danger"></i>
            <div class="main-title text-secondary">
                {{ error }}
            </div>
            <hr>

            <p class="text-center text-secondary ">{{ message }}</p>
            <p class="fs-bold">
                Please request a new registration token using the following link.
            </p>
            <button type="button" class="btn btn-primary" @click="goPage">Go to page</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const { data } = defineProps<{ data: { message: string, error: string } }>()
const { message, error } = data

const goPage = () => {
    router.replace('/login')
}


</script>

<style scoped>
.fs-custom {
    font-size: 8rem !important;
}
</style>