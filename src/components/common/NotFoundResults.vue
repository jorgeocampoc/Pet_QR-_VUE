<template>
    <div class="fs-4 text-secondary text-center">
        {{ msg }}
    </div>
</template>

<script setup lang="ts">
const { msg = '' } = defineProps<
    {
        msg: string
    }>();
</script>

<style scoped></style>