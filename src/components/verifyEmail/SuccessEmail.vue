<template>
    <div class="d-flex justify-content-center align-items-center full-screen">
        <div class="text-center">
            <i :class="`fa-solid ${icon} ${color} fs-custom`"></i>
            <div class="main-title text-secondary">
                Registration Complete
            </div>
            <hr>
            <p class="text-center text-secondary pt-4  fw-bold">{{ email }}</p>
            <p class="text-center text-secondary ">{{ message }}</p>
            <button type="button" class="btn btn-primary" @click="goPage">Is a pagina</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const { data } = defineProps<{ data: { icon: string, email: string, message: string, color: string } }>()
const { message, email, icon, color } = data

const goPage = () => {
    router.replace('/login')
}

</script>

<style scoped>
hr {
    width: 50%;
    margin: auto;
    height: 0.2rem !important;
    background: green;
}

.fs-custom {
    font-size: 8rem !important;
}
</style>