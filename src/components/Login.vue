<template v-if="authenticated===false">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field v-model="input.username" prepend-icon="person" name="username" label="username" type="text"></v-text-field>
                <v-text-field v-model="input.password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" v-on:click="login()">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-alert
        :value="true"
        type="success"
        v-if="authenticated===true"
      >
       User Login succesfully.
      </v-alert>
    </v-container>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Login',
    data: () => ({
      input: {
          username: "",
          password: ""
      },
      user:null,
      authenticated:false
    }),
    methods: {
      login() {
          if(this.input.username != "" && this.input.password != "") {
            axios
            .post('http://localhost:1500/auth', {
              password: this.input.password,
              confirmPassword: this.input.password,
              username: this.input.username
            })
            .then(response => {
              this.user = response.data.user;
              if (response.data.err) {
                return
              }
              console.log(response);
              localStorage.setItem('user',this.user);
              localStorage.setItem('token',response.data.token);
              this.$emit("authenticated", true);
              this.$router.replace({ name: "/" });
              console.log(this.$parent.$parent.$parent);
            });
          } else {
              console.log("A username and password must be present");
          }
      }
    }
  }
</script>

<style>

</style>
