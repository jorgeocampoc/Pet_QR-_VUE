<template>
    <div class="position-relative full-screen">
        <component v-if="!isLoading" :is="currentComponent" :data="dataValue"></component>
        <Spinner v-else class="abs-center"/>
    </div>
</template>

<script setup lang="ts">
import { API_BASE_URL } from '../utils/env';
import { onMounted, ref, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import { ErrorVerify, SuccessEmail, Spinner } from '../components';
import axios from 'axios';
const route = useRoute()
const token = ref((route.params.token as string) || '');
const isLoading = ref(false)
const currentComponent = shallowRef<any>(null)
const dataValue = ref({})
onMounted(async () => {
    isLoading.value = true;
    if (!token.value) {
        currentComponent.value = ErrorVerify
        return
    }
    try {
        const { data } = await axios.post(API_BASE_URL + 'auth/verify-email', {}, {
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        currentComponent.value = SuccessEmail;
        dataValue.value = { ...data }
    } catch (error: any) {
        console.log(error)
        dataValue.value = error?.response.data || {};
        currentComponent.value = ErrorVerify

    } finally {
        isLoading.value = false
    }
})

</script>


<style scoped></style>