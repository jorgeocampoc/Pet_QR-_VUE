<template>
    <small class="container mt-5">
        <i class="fa-solid fa-question cursor text-orange"  ref="tooltipButton" :title="msg"></i>
    </small>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const { msg = '' } = defineProps<{ msg: any }>()

const tooltipButton = ref<HTMLElement | null>(null);


</script>

<style scoped>

</style>