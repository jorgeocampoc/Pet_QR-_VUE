<template>
    <div class="d-flex flex-wrap gap-3 ">
        <div :class="`spinner-grow ${color}`" role="status" v-for="opt in 3" :key="opt"
            style="width: 1rem; height: 1rem;">
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    color: {
        type: String,
        default: 'bg-primary'
    }
})


</script>

<style scoped></style>