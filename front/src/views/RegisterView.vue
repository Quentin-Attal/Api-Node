<template>
    <div class="col-md-12">
        <div class="card w-33 mx-auto my-5 p-5">
            <Form @submit="register" :validation-schema="schema">
                <div>
                    <div class="form-group">
                        <label for="username" class="text-dark">Username</label>
                        <Field name="username" type="text" class="form-control" />
                        <ErrorMessage name="username" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="email" class="text-dark">Email</label>
                        <Field name="email" type="email" class="form-control" />
                        <ErrorMessage name="email" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="password" class="text-dark">Password</label>
                        <Field name="password" type="password" class="form-control" />
                        <ErrorMessage name="password" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="password2" class="text-dark">Confirm Password</label>
                        <Field name="password2" type="password" class="form-control" />
                        <ErrorMessage name="password" class="error-feedback" />
                    </div>

                    <div class="form-group my-3 text-center">
                        <button class="btn btn-primary btn-block" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            Sign Up
                        </button>
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

const loading = false;

const schema = object().shape({
    username: string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
    email: string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
    password: string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
});

const register = (values: any) => {
    const email = values.email;
    const password = values.password;
    const password2 = values.password2;
    const username = values.username;
    auth.register({ email, password, password2, username })
        .then(() => {
            router.push("/pokemons");
        });
}

onMounted(() => {
    if (auth.status.loggedIn) {
        router.push("/pokemons");
    }
})

</script>
  
<style>
.w-33 {
    width: 33% !important;
}
</style>