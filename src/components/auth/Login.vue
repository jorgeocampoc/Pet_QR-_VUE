<template>
    <div class="col-10 bg-light main-border p-5 animate__animated animate__fadeInRight col-xl-4 col-lg-5 col-md-10 position-relative"
        :class="{ 'disabled-form': isLoading }">
        <Qr />
        <Spinner class="abs-center" color="bg-orange" v-if="isLoading"/>
        <div class="main-title">Sign in to Qr Pets</div>
        <form @submit.prevent="onSubmit" class="form">
            <div v-for="(inp, index) in inputs" :key="index">
                <Label :title="inp.label"></Label>
                <Tooltips :msg="inp.msg" v-if="inp.error.value" />
                <div class="input-group pb-4">
                    <input :id="inp.name" :type="inp.type" v-model="inp.model.value" :placeholder="inp.placeholder"
                        class="form-control" required :autocomplete="getAutoComplete(inp.name)" />
                    <span class="input-group-text" v-if="inp.model.value !== '' && inp.meta.dirty">
                        <i v-if="!inp.error.value" class="fa-solid fa-circle-check text-success"></i>
                        <i v-if="inp.error.value" class="fa-solid fa-circle-xmark text-danger"></i>
                    </span>
                </div>
            </div>
            <div class="pb-2">
                <button class=" w-100 btn btn-primary" type="submit" :disabled="disabledBtn">
                    Login
                </button>
            </div>

        </form>
        <div class="text-center pb-2">
            Or
        </div>
        <div class="text-center">
            <button class="btn btn-light border border-1 text-secondary" type="button" @click="changeForm('signUp')">
                Sign up for free
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Label } from '../index';
import { useMainStore } from '../../stores/useMainStore';
import { loginSchema } from '../../validations/loginSchema';
import type { LoginForm } from '../../types/login.form';
import { useField, useForm } from 'vee-validate';
import { Qr, Tooltips, Spinner } from '../../components';
import { getAutoComplete } from '../composables/userAutoComplete';
import { usePostRequest } from '../../helpers/PostAuth';
import { useRouter } from 'vue-router';
const mainStore = useMainStore()
const { handleSubmit, errors } = useForm<LoginForm>({
    validationSchema: loginSchema
})
const router = useRouter()
const { value: email, errorMessage: errorEmail, meta: emailMeta } = useField<string>('email', undefined, { initialValue: 'joryorch4000@gmail.com' })
const { value: password, errorMessage: errorPassword, meta: passwordMeta } = useField<string>('password', undefined, { initialValue: 'aA1$1111' })
const inputs = [
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

const { isLoading, postData, results } = usePostRequest<LoginForm, any>()

const onSubmit = handleSubmit(async (values) => {
    await postData('auth/login', values)
    if (results.value.ok) {
        router.replace('home')
    }
})

const disabledBtn = computed(() =>
    !emailMeta.valid || !passwordMeta.valid
)


</script>

<style scoped>
.main {
    background: url('/src/assets/pets.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

</style>