<template>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Sepomex</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field 
                    v-model="input.codigo" 
                    name="codigo postal" 
                    label="codigo postal" 
                    type="text"
                    v-on:keyup.enter="getCities()">
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-title>
                <div>
                    <span>{{ state }}</span><br>
                    <span>{{ city }}</span>
                </div>
            </v-card-title>
            <v-flex xs12 sm12 d-flex>
                <v-select
                :items="zones"
                label="Zonas"
                solo
                ></v-select>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>

  import axios from 'axios';
  export default {
      name:'Home',
    data: () => ({
        zones:[],
        input:{
            codigo:null
        },
        state:null,
        city:null
    }),
    methods: {
      getCities() {
          console.log(this.input);
          let token = localStorage.getItem('token');
           axios
            .get(`http://localhost:1500/sepomex/${this.input.codigo}`,{
                params: {
                    token: token
                }
            })
            .then(response => {
                if (response.data.data){
                    this.zones = response.data.data.zones;
                    this.city = response.data.data.cities[0];
                    this.state = response.data.data.states[0];
                }
                console.log(response);
            });
        return;
      }
    }
  }
</script>

<style>

</style>
