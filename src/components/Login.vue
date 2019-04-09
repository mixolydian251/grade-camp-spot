<template>
    <v-card elevation="24"
            width="400"
            height="300"
            v-validate="'required|email'"
            class="login-container">
        <h1 class="login-title">GradeCampSpot</h1>
        <p>Login with BootCampSpot credentials</p>
        <div>
            <v-text-field type="email"
                          name="email"
                          v-model="email"
                          prepend-icon="email"
                          label="Email"
                          autofocus
                          v-validate="'required|email'"
                          :validate-on-blur="true"
                          class="input"
                          dark>
            </v-text-field>
            <span style="color: #c75450">{{ errors.first('email') }}</span>
            <v-text-field type="password"
                          v-model="password"
                          prepend-icon="lock"
                          label="Password"
                          class="input">
            </v-text-field>
        </div>
        <v-btn class="login-button" @click="login(email, password)">Login</v-btn>
    </v-card>
</template>

<script>
  export default {
    name: "login",
    props: ["login"],
    data: () => ({
      email: "",
      password: "",
    })
  }
</script>

<style scoped lang="scss">
    .login-container {
        padding: 20px 30px;
        margin: 100px auto;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        position: relative;
    }

    .login-title {
        position: absolute;
        top: -50px;
        left: 0;
    }

    .login-button {
        margin: 10px auto;
        width: 100%;
    }

    .input {
        max-height: 60px;
    }
</style>