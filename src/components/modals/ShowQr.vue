<template>
    <teleport to="body">
        <div class="modal fade show animate__animated animate__fadeIn" id="createUser" tabIndex="-1"
            style="display: block;" aria-hidden="false">
            <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content bg-orange">
                    <div class="modal-header mx-auto border-bottom-0">
                        <button class="btn btn-outline-light" @click="downloadQr">
                            {{ qr?.startsWith('http') ? 'Open' : 'Save' }}
                        </button>
                    </div>
                    <div class="modal-body border">
                        <div class="rounded text-center">
                            <div class="">
                                <img :src="qr" alt="" class="img-fluid rounded" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-top-0">
                        <div class="m-auto">
                            <button class="btn btn-outline-light" @click="close">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])

const props = defineProps({
    qr: { type: String, require: true },
})

const close = () => {
    emit('close')
}

const downloadQr = () => {
    if (props?.qr?.startsWith('data:image')) {
        const link = document.createElement('a');
        link.href = props.qr;
        link.download = 'MyPetQr.png';
        link.click();
    } else if (props?.qr?.startsWith('http')) {
        const link = document.createElement('a');
        link.href = props.qr;
        link.target = '_blank';
        link.download = 'MyPetQr.png';
        link.click();
    }
};


</script>

<style scoped>
img {
    height: 300px;
}

.modal {
    background: rgba(0, 0, 0, 0.329);
}
</style>
