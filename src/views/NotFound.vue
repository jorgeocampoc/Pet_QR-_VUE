<template>
  <div class="not-found-page">
    <div class="container">
      <h1 class="title">404</h1>
      <p class="message">Oops! Page not found.</p>
      <button @click="goHome" class="btn btn-blue">Go to Login</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/login");
};
</script>

<style scoped>
.not-found-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa;
  text-align: center;
  flex-direction: column;
  padding: 2rem;
}

.title {
  font-size: 6rem;
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 1rem;
}

.message {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #555;
}


</style>
