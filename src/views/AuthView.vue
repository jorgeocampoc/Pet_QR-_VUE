<template>
    <div class="main full-screen d-flex flex-wrap  justify-content-lg-start justify-content-xl-start justify-content-md-center justify-content-center ps-lg-5 align-items-center">
        <Login v-if="mainStore.formAuth == 'signIn'"/>
        <Register v-if="mainStore.formAuth == 'signUp'" />
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '../stores/useMainStore';
import { Login, Register } from '../components';

const mainStore = useMainStore()

</script>

<style scoped>
.main {
    background-image: linear-gradient(rgba(0, 0, 0, 0.062), rgba(0, 0, 0, 0.137)),
        url('/src/assets/pets.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}



.content-form {
    width: 30%;
}
</style>