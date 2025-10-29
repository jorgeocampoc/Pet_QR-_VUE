<template>
    <teleport to="body">
        <div class="modal fade show animate__animated animate__fadeIn" id="createUser" tabIndex="-1"
            style="display: block;" aria-hidden="false">
            <div class="modal-dialog modal-dialog-centered  modal-xl" :class="{ 'disabled-form': isLoading }">
                <div class="modal-content bg-blue position-relative">
                    <Spinner v-if="isLoading" color="bg-orange" class="abs-center" />
                    <div class="modal-header m-auto border-bottom-0">
                        <i class="fa-solid fa-xmark fs-5 text-light cursor iconFont custom-abs" @click="close"></i>
                        <span class="text-light text-uppercase">Update</span>
                    </div>
                    <div class="modal-body border p-0">
                        <form @submit.prevent="onSubmit">
                            <div class="d-flex justify-content-center gap-5 flex-wrap mx-5 py-5 ">
                                <!-- <Spinner  class="abs-center" color="bg-orange" /> -->
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
                                            <i v-if="!inp.error.value"
                                                class="fa-solid fa-circle-check text-success"></i>
                                            <i v-if="inp.error.value" class="fa-solid fa-circle-xmark text-danger"></i>
                                        </span>
                                    </div>
                                    <div v-if="inp.name == 'species'">
                                        <select v-model="species" class="form-select" aria-label="Select a species">
                                            <option disabled value="">Select a species</option>
                                            <option v-for="(esp, i) in especiesData" :key="i" :value="esp">{{ esp }}
                                            </option>
                                        </select>
                                    </div>
                                    <div v-if="inp.name == 'gender'">
                                        <select v-model="gender" class="form-select" aria-label="Select a species">
                                            <option disabled value="">Select a gender</option>
                                            <option v-for="(esp, i) in genders" :key="i" :value="esp">{{ esp }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class=" modal-footer d-flex justify-content-center">
                                <button class="btn btn-outline-light" :disabled="disableBtn">
                                    <span>
                                        Save
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { UpdatePetSchema } from '../../validations/update.pet.schema'
import { Spinner, Label, Tooltips } from '../index';
import { genderData, speciesData } from '../../data/data';
import { computed, ref } from 'vue';
import { usePutData } from '../../helpers/put.data';

const props = defineProps({
    data: { type: Object, required: true }
})

const emit = defineEmits(['close'])
const { putData, isLoading, results } = usePutData()
const close = () => {
    emit('close')
}

const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: UpdatePetSchema
})

const especiesData = ref([...speciesData])
const genders = ref([...genderData])

const { value: name, errorMessage: errorName, meta: nameMeta } = useField<string>('name', undefined, { initialValue: props.data.name })
const { value: color, errorMessage: errorColor, meta: colorMeta } = useField<string>('color', undefined, { initialValue: props.data.color })
const { value: species, errorMessage: errorSpecies, meta: speciesMeta } = useField<string>('species', undefined, { initialValue: props.data.species })
const { value: breed, errorMessage: errorBreed, meta: breedMeta } = useField<string>('breed', undefined, { initialValue: props.data.breed })
const { value: age, errorMessage: errorAge, meta: ageMeta } = useField<string>('age', undefined, { initialValue: props.data.age })
const { value: address, errorMessage: errorAddress, meta: addressMeta } = useField<string>('address', undefined, { initialValue: props.data.address })
const { value: observations, errorMessage: errorObservations, meta: observationsMeta } = useField<string>('observations', undefined, { initialValue: props.data.observations })
const { value: gender, errorMessage: errorGender, meta: genderMeta } = useField<string>('gender', undefined, { initialValue: props.data.gender })
const { value: phone, errorMessage: errorPhone, meta: phoneMeta } = useField<string>('phone', undefined, { initialValue: props.data.phone })

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
    values.id = props.data.id
    if (!values.id) {
        return
    }
    values.age = Number(values.age);
    await putData('pets', values)
    if (results.value.ok) {
        emit('close', 'update')
    }

})


const disableBtn = computed(() => {
    if (isLoading.value) return true;
    return inputs.some(inp => {
        const val = inp.model.value;
        const err = inp.error.value;
        return err || (!val && inp.important);
    });
});

</script>

<style scoped>
.modal {
    background: rgba(0, 0, 0, 0.329);
}

.custom-abs {
    position: absolute;
    right: 5%;
}
</style>
