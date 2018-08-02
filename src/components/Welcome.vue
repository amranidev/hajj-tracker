<template>
    <v-container>

      <v-text-field
      label="Create new Group"
      append-icon="add"
      v-model="groupName"
      @keyup.enter="createGroup"
      ></v-text-field>

    <div>
      <v-text-field
      label="Search"
      append-icon="search"
      v-model="searchInput"
      @keyup.enter="search()"
      ></v-text-field>
        <div v-for="(haj, index) in output" :key="index">
            <v-subheader>
                {{ haj.email }}
                -
                <v-icon color="black" @click="add(haj['.key'])">add</v-icon>
            </v-subheader>
        </div>
    </div>
    </v-container>
</template>
<script>

import GeoFire from "geofire"

export default {
  mouted () {
    /*this.$binding('groups', this.$store.state.firestore.collection('Persons')).then(data => {
         console.log("Group is ready")
    })*/
     //this.geoFire = new GeoFire(this.$store.state.database.child("localtion"));
     window.navigator.geolocation.watchPosition( function (position) {
         console.log(position)
         console.log("Gogo")
     });

   },
  data () {
    return {
        searchInput: "",
        output: [],
        groupName: "",
        geoFire: null
    };
  },
  firestore () {
      return {
          hadjs: this.$store.state.firestore.collection("hadjjes"),
          teams: this.$store.state.firestore.collection("teams")
      }
  },
  methods : {
      search () {
          this.$binding("searchResults", this.$store.
          state.
          firestore.
          collection("haddjes").where("email", "==", this.searchInput))
          .then((el) => {
            this.output = el
            console.log(this.output)
          })
      },
      createGroup () {
        this.$firestore.teams.add({
            name: this.groupName
        }).then(() => {
            this.name = ""
        })
      },
      addHaj (key) { 

      },
      geoFindMe() {
      }
  }
};
</script>

<style>
.flex {
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
