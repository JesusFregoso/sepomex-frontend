<template>
  <v-app>
    <v-toolbar v-if="authenticated">
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view @authenticated="setAuthenticated" />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
      authenticated: false
    }
  },
  mounted() {
    if(!this.authenticated) {
        console.log(this.$router);
        console.log(this.$route);
        this.$router.push('/')
    }
  },
  methods: {
      setAuthenticated(status) {
          this.authenticated = status;
      },
      logout() {
          this.authenticated = false;
      }
  }
}
</script>
