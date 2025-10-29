<template>
    <nav class="navbar navbar-expand-lg bg-blue" v-if="!isLoading">
        <div class="container-fluid">
            <a class="navbar-brand ms-4" href="#"><img class="rounded-circle" src="../assets/logo.jpg" alt="image"
                    width="50"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item ms-3" v-for="(inp, i) in list" :key="i" @click="changeView(inp)">
                        <a class="nav-link text-uppercase text-light fs-6" aria-current="page"
                            :class="{ activeLink: currentItem === inp }" href="#">{{
                                inp }}</a>
                    </li>
                </ul>
                <span class="me-5 text-light fw-bolder  fs-5">
                    {{ email }}
                </span>
                <button class="me-5 btn btn-outline-light" @click="logOut">
                    <span>Log out</span>
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useMainStore } from '../stores/useMainStore';
import { onMounted, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { usePostRequest } from '../helpers/PostAuth';
import type { LoginForm } from '../types/login.form';
const list = ref<any>([])
const currentItem = ref('')
const router = useRouter()
const emit = defineEmits<{ (e: 'view', value: string): void }>()
const changeView = (value: string) => {
    emit('view', value);
    currentItem.value = value
}
const store = useMainStore()
const { role, email, navUser } = storeToRefs(store)

const { isLoading, postData, results } = usePostRequest<LoginForm, any>()

const logOut = async () => {
    await postData('auth/logout', { email: '', password: '' })
    if (results.value.ok) {
        router.replace('login')
    }

}
watch(role, (newRole) => {
    if (newRole === 'user') {
        list.value = [...navUser.value]
        currentItem.value = list.value[0]
    }
}, { immediate: true });

</script>

<style scoped>
.activeLink {
    color: white !important;
    font-weight: 700;
    transition: all 0.3s ease;
    text-decoration: underline;
    text-underline-offset: 7px;
    font-size: 1.2rem !important;
}
</style>