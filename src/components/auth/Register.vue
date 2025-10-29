<template>
    <div class="content-form position-relative bg-light main-border p-5 animate__animated animate__fadeInRight"
        :class="{ 'disabled-form': isLoading }">
        <Spinner class="abs-center" v-if="isLoading" />
        <Qr />
        <div class="main-title">Sign up to Qr Pets</div>
        <form @submit.prevent="onSubmit">
            <div v-for="(inp, index) in inputs" :key="index">
                <Label :title="inp.label"></Label>
                <Tooltips :msg="inp.msg" v-if="inp.error.value" />
                <ShowPassword v-if="inp.name == 'password'" @showPass=handleshowPass />
                <div class="input-group pb-4">
                    <input :id="inp.name" :type="getType(inp.type)" v-model="inp.model.value"
                        :placeholder="inp.placeholder" class="form-control" required
                        :autocomplete="getAutoComplete(inp.name)" />
                    <span class="input-group-text" v-if="inp.model.value !== '' && inp.meta.dirty">
                        <i v-if="!inp.error.value" class="fa-solid fa-circle-check text-success"></i>
                        <i v-if="inp.error.value" class="fa-solid fa-circle-xmark text-danger"></i>
                    </span>
                </div>
            </div>
            <div class="pb-2">
                <button class=" w-100 btn btn-primary" type="submit" :disabled="disabledBtn">
                    Sign Up
                </button>
            </div>
        </form>
        <div class="text-center pb-2">
            Or
        </div>
        <div class="text-center">
            <button class="btn btn-light border border-1 text-secondary" type="button" @click="changeForm('signIn')">
                Go to Login
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMainStore } from '../../stores/useMainStore';
import { useField, useForm } from 'vee-validate';
import { registerSchema } from '../../validations/registerSchema';
import type { RegisterForm } from '../../types/register.form';
import { Qr, Tooltips, Label, ShowPassword, Spinner } from '../../components';
import { getAutoComplete } from '../composables/userAutoComplete';
import { usePostRequest } from '../../helpers/PostAuth';
import { RoleEnum } from '../../enums';
import type { ResponseRegister } from '../../types/response.register';


const { handleSubmit, errors, resetForm } = useForm<RegisterForm>({
    validationSchema: registerSchema
})
const { value: email, errorMessage: errorEmail, meta: emailMeta } = useField<string>('email')
const { value: password, errorMessage: errorPassword, meta: passwordMeta } = useField<string>('password')
const { value: name, errorMessage: errorName, meta: nameMeta } = useField<string>('name')
const { value: lastName, errorMessage: errorLastName, meta: lastNameMeta } = useField<string>('lastName')
const mainStore = useMainStore()
const inputs = [

    {
        name: 'name',
        label: 'name',
        type: 'text',
        placeholder: 'Enter your name',
        model: name,
        error: errorName,
        meta: nameMeta,
        msg: 'Must be at least 2 character and contain no numbers'
    },
    {
        name: 'lastName',
        label: 'lastName',
        type: 'text',
        placeholder: 'Enter your last name',
        model: lastName,
        error: errorLastName,
        meta: lastNameMeta,
        msg: 'Must be at least 2 character and contain no numbers'
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        model: email,
        error: errorEmail,
        meta: emailMeta,
        msg: 'example@gmail.com'
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        model: password,
        error: errorPassword,
        meta: passwordMeta,
        msg: "Must contain at least one number, one letter, and one uppercase letter, with no spaces."
    },
]

const changeForm = (value: string) => {
    mainStore.setFormAuth(value)
}
const { isLoading, postData, results } = usePostRequest<RegisterForm, ResponseRegister>()

const onSubmit = handleSubmit(async (values) => {
    const user = { ...values, role: RoleEnum.USER }
    await postData('auth/register', user)
    if (results.value.ok) {
        resetForm()
        mainStore.setFormAuth('signIn')
    }
})

const disabledBtn = computed(() =>
    !emailMeta.valid || !passwordMeta.valid || !nameMeta.valid
)

const band = ref(false)
const handleshowPass = () => {
    band.value = !band.value;
}

const getType = (value: string) => {
    if (value == 'password') {
        return band.value ? 'text' : 'password'
    }
    return value;
}

</script>

<style scoped>
.main {
    background: url('/src/assets/pets.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.content-form {
    width: 30%;
}
</style>