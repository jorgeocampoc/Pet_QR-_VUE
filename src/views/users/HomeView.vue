<template>
    <div class="bg-light full-screen position-relative">
        <div v-if="!isLoading">
            <Navbar @view="handleView" />
            <component :is="currentComponent"></component>
        </div>
        <Spinner v-else class="abs-center"/>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import { Navbar, PetsUser, RegisterPet,Spinner } from '../../components';
import { useGetData } from '../../helpers/get.data';
import { useMainStore } from '../../stores/useMainStore';

const { getData, isLoading, results } = useGetData('auth/user-info')
const store = useMainStore()

onMounted(async () => {
    await getData()
    if (results.value.role) {
        store.setRole(results.value.role)
        store.setEmail(results.value.email)
    }
})
const currentComponent = shallowRef(RegisterPet)
const handleView = (value: string) => {
    switch (value) {
        case 'Register your Pet':
            currentComponent.value = RegisterPet
            break;
        case 'My Pets':
            currentComponent.value = PetsUser
            break;
        default:
            break;
    }
}


</script>

<style scoped></style>