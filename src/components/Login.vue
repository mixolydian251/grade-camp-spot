<template>
    <div class="login-wrapper">
        <v-card v-if="!loading" elevation="24"
                class="login-container pa-5">
            <h1 class="login-title">
                <span class="display-1 font-weight-bold text-uppercase text--accent-2 teal--text">Grade</span>
                <span class="headline font-weight-thin text-uppercase">CampSpot</span>
            </h1>
            <v-layout column class="justify-space-between">
                <span class="body-1 center-text mb-3">Login with Boot Camp Spot credentials</span>
                <div>
                    <v-text-field type="email"
                                  name="email"
                                  v-model="email"
                                  prepend-icon="email"
                                  label="Email"
                                  autofocus
                                  :rules="rules.required"
                                  class="mb-2"
                                  color="teal accent-2">
                    </v-text-field>
                    <v-text-field type="password"
                                  v-model="password"
                                  :rules="rules.required"
                                  prepend-icon="lock"
                                  label="Password"
                                  class="mb-2"
                                  color="teal accent-2">
                    </v-text-field>
                </div>
                <v-btn :class="formCompleted" @click="login(email, password)">Login</v-btn>
            </v-layout>
        </v-card>
        <v-progress-circular
                v-else
                :size="100"
                :width="7"
                color="teal"
                indeterminate
        ></v-progress-circular>
    </div>
</template>

<script>
  export default {
    name: "login",
    props: ["login", "loading"],
    data: () => ({
      email: "",
      password: "",
      rules: {
        required: [val => (val || '').length > 0 || 'This field is required'],
      }
    }),
    computed: {
      formCompleted() {
        if (this.email && this.password) return "teal accent-2 teal--text text--darken-4"
        return "v-btn--disabled"
      }
    }
  }
</script>

<style lang="scss">
    .login-wrapper {
        height: 100%;
        min-height: 500px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        position: relative;
        width: 100%;
        max-width: 500px;
        /*min-height: 300px;*/
    }

    .login-title {
        position: absolute;
        top: -48px;
        left: 0;
    }

    .login-button {
        margin: 10px auto;
        width: 100%;
    }

    .center-text {
        text-align: center;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
        padding-left: 5px;
        border: none;
        -webkit-text-fill-color: #59ffdb;
        -webkit-box-shadow: 0 0 0px 1000px #424242 inset;
    }
</style>
