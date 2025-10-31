<template>
    <label class="form-label fw-normal text-uppercase text-secondary custom-size">
        {{ title }}
    </label>
</template>

<script setup lang="ts">
const { title = '' } = defineProps<
    {
        title: string
    }>();
</script>

<style scoped>
.custom-size {
    font-size: clamp(0.9rem, 2vw, 1rem);

}
</style>