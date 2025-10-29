<template>
    <label class="form-label fw-normal text-uppercase text-secondary">
        {{ title }}
    </label>
</template>

<script setup lang="ts">
const { title = '' } = defineProps<
    {
        title: string
    }>();
</script>

<style scoped></style>