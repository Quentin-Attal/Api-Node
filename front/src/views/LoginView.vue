<template>
    <div class="col-md-12 ">
        <div class="card w-33 mx-auto my-5 p-5">
            <Form @submit="login" :validation-schema="schema">
                <div class="form-group">
                    <label for="email" class="text-dark">email</label>
                    <Field ref="emailRef" name="email" type="email" class="form-control text-dark" />
                    <ErrorMessage name="email" class="error-feedback text-dark" />
                </div>
                <div class="form-group">
                    <label for="password" class="text-dark">Password</label>
                    <Field ref="passwordRef" name="password" type="password" class="form-control text-dark" />
                    <ErrorMessage name="password" class="error-feedback text-dark" />
                </div>

                <div class="form-group my-3 text-center">
                    <button class="btn btn-primary btn-block mx-auto" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <span class="text-white">Login</span>
                    </button>
                </div>

                <div class="form-group ">
                    <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                    </div>
                </div>
            </Form>

        </div>
    </div>
</template>
  
<script setup lang="ts">

import { authStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from "vee-validate";
import { object, string } from 'yup';
import { onMounted } from 'vue';

const router = useRouter();
const auth = authStore();

const message = "";
const loading = false;

const schema = object().shape({
    email: string().required("Email is required!"),
    password: string().required("Password is required!"),
});

const login = (values: any) => {
    const email = values.email;
    const password = values.password;
    auth.login({ email, password })
        .then(() => {
            router.push("/profile");
        });
}

onMounted(() => {
    if (auth.status.loggedIn) {
        router.push("/profile");
    }
})
</script>
  
<style>
.w-33 {
    width: 33% !important;
}
</style>