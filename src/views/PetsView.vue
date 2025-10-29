<template>
    <div class="bg-blue full-screen d-flex justify-content-center align-items-center flex-wrap" v-if="!isLoading">
        <div class="card">
            <div class="main-title">
                {{ results?.pet?.name }}
            </div>
            <div class="d-flex flex-wrap justify-content-evenly px-5 pb-5 gap-3 align-items-center">
                <div class="col-4">
                    <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nc3xlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000"
                        alt="" class="img-fluid img-thumbnail rounded-4">
                </div>
                <div class="col">
                    <p>
                        <strong>Owner: </strong> <span> {{ results?.pet?.user?.name + ' ' + results?.pet?.user?.lastName }}
                        </span>
                    </p>
                    <p>
                        <strong>Name: </strong> <span> {{ results?.pet?.name }} </span>
                    </p>
                    <p>
                        <strong>Species: </strong> <span> {{ results?.pet?.species }} </span>
                    </p>
                    <p>
                        <strong>Breed: </strong> <span> {{ results?.pet?.breed }} </span>
                    </p>
                    <p>
                        <strong>Color: </strong> <span> {{ results?.pet?.color }} </span>
                    </p>
                    <p>
                        <strong>Gender: </strong> <span> {{ results?.pet?.gender }} </span>
                    </p>
                    <p>
                        <strong>Address reference: </strong> <span> {{ results?.pet?.address }} </span>
                    </p>
                    <p>
                        <strong>Phone reference: </strong> <span> {{ results?.pet?.phone }} </span>
                    </p>
                    <p>
                        <strong>observations: </strong> <span> {{ results?.pet?.observations }} </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGetData } from '../helpers/get.data';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const url = ref(`pets/pet/${route.params.id}`);
const { getData, isLoading, results } = useGetData(url.value)

onMounted(async () => {
    await getData()
    if(results.value.length == 0){
        router.replace('/login')
    }
})
</script>

<style scoped>
.card {
    width: 50rem;
}

img {
    height: 100%;
    width: 100%;
}
</style>