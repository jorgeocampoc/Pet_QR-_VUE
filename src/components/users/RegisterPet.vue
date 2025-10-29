<template>
    <div class="animate__animated animate__fadeIn" :class="{ 'disabled-form': isLoading }">
        <div class="main-title">Register your pets</div>
        <ShowQr v-if="showModalQr" :qr="qr" @close="handleClose" />
        <form @submit.prevent="onSubmit">
            <div
                class="d-flex justify-content-center gap-5 flex-wrap  border-dark-main   mx-5 py-5  shadow bg-blue position-relative">
                <Spinner v-if="isLoading" class="abs-center" color="bg-orange" />
                <div v-for="(inp, i) in inputs" :key="i" class="col-3">
                    <Label :title="inp.label" class="text-light"></Label> <small v-if="inp.important"><i
                            class="fa-solid fa-asterisk text-danger"></i></small>
                    <Tooltips :msg="inp?.error.value || ''" v-if="inp.error.value" />
                    <div class="input-group pb-4"
                        v-if="inp.name != 'species' && inp.name != 'gender' && inp.name !== 'img'">
                        <input v-if="inp.name != 'observations'" :id="inp.name" :type="inp.type"
                            v-model="inp.model.value" class="form-control" required />
                        <textarea v-else :id="inp.name" :type="inp.type" v-model="inp.model.value"
                            class="form-control"></textarea>
                        <span class="input-group-text" v-if="inp.model.value !== '' && inp.meta.dirty">
                            <i v-if="!inp.error.value" class="fa-solid fa-circle-check text-success"></i>
                            <i v-if="inp.error.value" class="fa-solid fa-circle-xmark text-danger"></i>
                        </span>
                    </div>
                    <div v-if="inp.name == 'species'">
                        <select v-model="species" class="form-select" aria-label="Select a species">
                            <option disabled value="">Select a species</option>
                            <option v-for="(esp, i) in especiesData" :key="i" :value="esp">{{ esp }}</option>
                        </select>
                    </div>
                    <div v-if="inp.name == 'gender'">
                        <select v-model="gender" class="form-select" aria-label="Select a species">
                            <option disabled value="">Select a gender</option>
                            <option v-for="(esp, i) in genders" :key="i" :value="esp">{{ esp }}</option>
                        </select>
                    </div>
                    <div v-if="inp.name == 'img'" class="input-group pb-4">
                        <input :id="inp.name" :type="inp.type" v-model="inp.model.value" class="form-control"
                            @change="handleImg" required accept="image/*" />
                        <span class="input-group-text" v-if="inp.model.value !== '' && inp.meta.dirty">
                            <i v-if="!inp.error.value" class="fa-solid fa-circle-check text-success"></i>
                            <i v-if="inp.error.value" class="fa-solid fa-circle-xmark text-danger"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-6 m-auto text-center pt-5">
                <button type="submit" class=" btn btn-blue " style="width: 20rem;" :disabled="disableBtn">
                    <span v-if="!isLoading">QR generate</span>
                    <span v-if="isLoading"><i class="fa-solid fa-paw"></i></span>
                </button>
            </div>
        </form>

    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '../../stores/useMainStore'
import type { LoginForm } from '../../types/login.form'
import { useField, useForm } from 'vee-validate'
import { Label, Tooltips, Spinner, ShowQr } from '../../components';
import { computed, ref } from 'vue';
import { genderData, speciesData } from '../..//data/data';
import { RegisterSchema } from '../../validations/register.pets.schema';
import { cleanWord, getExtentionImg, validSizeImg } from '../../helpers/utils';
import { notifyError } from '../../helpers/notyf';
import { usePostData } from '../../helpers/post.data';

const qr = ref<string>('')
const showModalQr = ref<boolean>(false)
const mainStore = useMainStore()
const { handleSubmit, errors, resetForm } = useForm<LoginForm>({
    validationSchema: RegisterSchema
})

const { value: name, errorMessage: errorName, meta: nameMeta } = useField<string>('name')
const { value: color, errorMessage: errorColor, meta: colorMeta } = useField<string>('color')
const { value: species, errorMessage: errorSpecies, meta: speciesMeta } = useField<string>('species')
const { value: breed, errorMessage: errorBreed, meta: breedMeta } = useField<string>('breed')
const { value: age, errorMessage: errorAge, meta: ageMeta } = useField<string>('age')
const { value: address, errorMessage: errorAddress, meta: addressMeta } = useField<string>('address')
const { value: img, errorMessage: errorImg, meta: imgMeta } = useField<File | any>('img')
const { value: observations, errorMessage: errorObservations, meta: observationsMeta } = useField<string>('observations')
const { value: gender, errorMessage: errorGender, meta: genderMeta } = useField<string>('gender')
const { value: phone, errorMessage: errorPhone, meta: phoneMeta } = useField<string>('phone')

const especiesData = ref([...speciesData])
const genders = ref([...genderData])
const { postData, isLoading, results } = usePostData();
const inputs = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        model: name,
        error: errorName,
        meta: nameMeta,
        important: true
    },
    {
        name: 'species',
        label: 'Species',
        type: 'text',
        model: species,
        error: errorSpecies,
        meta: speciesMeta,
        important: true
    },
    {
        name: 'breed',
        label: 'Breed',
        type: 'text',
        model: breed,
        error: errorBreed,
        meta: breedMeta,
        important: true
    },
    {
        name: 'gender',
        label: 'Gender',
        type: 'text',
        model: gender,
        error: errorGender,
        meta: genderMeta,
        important: true
    },
    {
        name: 'age',
        label: 'Age (Years)',
        type: 'number',
        model: age,
        error: errorAge,
        meta: ageMeta,
        important: true
    },
    {
        name: 'color',
        label: 'Color',
        type: 'text',
        model: color,
        error: errorColor,
        meta: colorMeta,
        important: true
    },

    {
        name: 'address',
        label: 'Address',
        type: 'text',
        model: address,
        error: errorAddress,
        meta: addressMeta,
        important: true
    },
    {
        name: 'phone',
        label: 'Reference phone',
        type: 'text',
        model: phone,
        error: errorPhone,
        meta: phoneMeta,
        important: true
    },

    {
        name: 'img',
        label: 'Image',
        type: 'file',
        model: img,
        error: errorImg,
        meta: imgMeta,
        important: true
    },
    {
        name: 'observations',
        label: 'Observations',
        type: 'text',
        model: observations,
        error: errorObservations,
        meta: observationsMeta,
        important: false
    },


];


const onSubmit = handleSubmit(async (values: any) => {
    values.userId = ''
    values.qrCodeId = ''
    const formData = new FormData() as any;
    Object.keys(values).forEach(k => {
        if (k != 'img') {
            const value = values[k]
            formData.append(k, typeof value === 'string' ? cleanWord(value) : value)
        }
    })
    formData.append('img', file.value)
    await postData('pets/register-pet', formData)
    if (results.value.ok) {
        qr.value = results.value.qrData
        showModalQr.value = true
    }


})

const file = ref<File | any>(null)
const handleImg = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target?.files || target.files.length === 0) {
        img.value = null;
        notifyError('Error processing the image')
        return;
    }

    const selectedFile = target.files[0];
    if (selectedFile) {
        const isValid = getExtentionImg(selectedFile);
        if (!isValid) {
            img.value = null
            notifyError('The size must be jpg, png or jpeg.')
            return
        }
        const validSize = validSizeImg(selectedFile, (2 * 1024 * 1024));
        if (!validSize) {
            img.value = null
            notifyError('The size must not exceed 2MB.')
            return
        }
    }
    file.value = selectedFile
}

const disableBtn = computed(() => {
    if (isLoading.value) return true;
    return inputs.some(inp => {
        const val = inp.model.value;
        const err = inp.error.value;
        return err || (!val && inp.important);
    });
});

const handleClose = () => {
    showModalQr.value = false
    qr.value = ''
    resetForm()

}

</script>

<style scoped></style>