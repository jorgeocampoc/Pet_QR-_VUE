<template>
    <div class="">
        <div class="main-title">Your pets</div>
        <ShowQr v-if="modal == 'img'" :qr="qr" @close="handleClose" />
        <EditPet v-if="modal == 'update' && pet" @close="handleClose" :data="pet" />
        <DeletePet v-if="modal == 'delete' && pet" @close="handleClose" :pet="pet" />
        <div class="animate__animated animate__fadeIn overflow-y-auto mx-5" style="max-height: 75vh;">
            <table class="table table-light shadow table-responsive table-striped table-hover" v-if="!isLoading">
                <thead>
                    <tr>
                        <th v-for="(inp, index) in fields" :key="index" scope="col">{{ inp }}</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider" v-if="results?.pets?.length > 0">
                    <tr v-for="(pet, i) in results?.pets" :key="i">
                        <th>
                            {{ i + 1 }}
                        </th>
                        <th>
                            {{ pet.name }}
                        </th>
                        <th>
                            {{ pet.species }}
                        </th>
                        <th>
                            {{ pet.breed }}
                        </th>
                        <th>
                            {{ pet.gender }}
                        </th>
                        <th>
                            {{ pet.age }}
                        </th>
                        <th>
                            {{ pet.color }}
                        </th>
                        <th>
                            {{ pet.phone }}
                        </th>
                        <th>
                            {{ pet.address }}
                        </th>
                        <th>
                            {{ pet.observations }}
                        </th>
                        <th>
                            <i class="fa-solid fa-images cursor iconFont" @click="openModal(pet?.img, 'img')"></i>
                        </th>
                        <th>
                            <i class="fa-solid fa-qrcode cursor iconFont cursor"
                                @click="openModal(pet?.qrCode?.qrData || '', 'img')"></i>
                        </th>
                        <th>
                            <i class="fa-solid fa-pen-to-square iconFont cursor"
                                @click="openModal('', 'update', pet)"></i>
                        </th>
                        <th>
                            <i class="fa-solid fa-link iconFont cursor" @click="copyUrl(pet.id, i)"
                                v-if="i != index"></i>
                            <small v-else><span class="badge text-bg-success">Copied </span></small>
                        </th>
                        <th>
                            <i class="fa-solid fa-trash iconFont cursor text-danger"
                                @click="openModal('', 'delete', pet)"></i>
                        </th>
                    </tr>
                </tbody>
            </table>
            <NotFoundResults msg="Not pets registere yet." v-if="results?.pets?.length == 0" />
        </div>
        <Spinner class="abs-center" color="bg-dark" v-if="isLoading" />
    </div>
</template>

<script setup lang="ts">
import { useGetData } from '../../helpers/get.data';
import { inputPetsTable } from '../../data/data';
import { onMounted, ref } from 'vue';
import { Spinner, ShowQr, EditPet, DeletePet, NotFoundResults } from '../index';
import { API_BASE_URL_FRONT } from '../../utils/env';
const fields = ref([...inputPetsTable])
const pet = ref<object>({})
const modal = ref<string>('')
const qr = ref<string>('false')
const { getData, isLoading, results } = useGetData('pets')
const index = ref<number>()
onMounted(async () => await getData())

const openModal = (qrData: string = '', mod: string = '', data: object = {}) => {
    modal.value = mod;
    qr.value = qrData
    if (data) {
        pet.value = { ...data }
    }
}

const handleClose = async (act: string) => {
    modal.value = ''
    qr.value = ''
    pet.value = {}
    if (act == 'update') {
        await getData()
    }
}

const copyUrl = async (id: string, i: number) => {
    try {
        await navigator.clipboard.writeText(`${API_BASE_URL_FRONT}pet/${id}`)
        index.value = i
    } catch (error) {
        console.log(error)
    }
}


</script>

<style scoped></style>