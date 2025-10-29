<template>
    <teleport to="body">
        <div class="modal fade show animate__animated animate__fadeIn" id="createUser" tabIndex="-1"
            style="display: block;" aria-hidden="false">
            <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content bg-blue position-relative">
                    <!-- <Spinner v-if="isLoading" color="bg-orange" class="abs-center" /> -->
                    <div class="modal-header m-auto border-bottom-0">
                        <span class="text-light text-uppercase">Update</span>
                    </div>
                    <div class="modal-body border p-0">
                        <p class="text-light text-center my-3">
                            Are you sure you want to delete the pet <strong>
                                {{ pet.name }}?
                            </strong>
                        </p>
                    </div>
                    <div class="modal-footer m-auto">
                        <button class="btn btn-danger btn-sm me-3" type="button" @click="close">Cancel</button>
                        <button class="btn btn-success btn-sm" type="button" @click="confirmDelete">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { useDeleteData } from '../../helpers/delete.data'


const props = defineProps({ pet: { type: Object, required: true } })

const emit = defineEmits(['close'])
const close = () => {
    emit('close')
}
const { deleteData, isLoading, results } = useDeleteData()
const confirmDelete = async () => {
    if (props.pet.id) {
        await deleteData(`pets/${props.pet.id}`)
    }
    if (results.value.ok) {
        emit('close', 'update')

    }
}

</script>

<style scoped>
.custom-abs {
    position: absolute;
    right: 5%;
}
</style>