<template>
    <small>
        <i class="fa-regular fa-eye-slash ms-2 cursor" @click="showPass"></i>
    </small>
</template>

<script setup lang="ts">
const emit = defineEmits(['showPass'])

const showPass = () => {
    emit('showPass')
}
</script>

<style scoped>
.cursor:hover {
    color: gray;
}
</style>