<template>
    <v-container>
      <v-text-field
      label="Create new Group"
      append-icon="add"
      v-model="Team.name"
      @keyup.enter="createGroup()"
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
                <v-icon color="black" @click="addHaj(haj)">add</v-icon>
            </v-subheader>
        </div>
    </div>
      <v-card>
      <v-list two-line subheader>
        <v-subheader>Members</v-subheader>
        <v-list-tile v-for="(item, index) in positions" :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon color="black">delete</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
</v-container>
</template>

<script>

import GeoFire from "geofire"
import Team from "@/models/Team"

export default {

  mounted () {
     this.$binding("teams", this.$store.state.firestore.collection("teams")).then(() => {
        console.log("teams is ready")
     })
   },
  data () {
    return {
        searchInput: "",
        output: [],
        groupName: "",
        geoFire: null,
        center: { lat: 21.42664, lng: 39.82563 },
        markers: [],
        places: [],
        currentPlace: null,
        positions: [],
        myPosition: null,
        Team: new Team(this.$store.state.firestore.collection("teams")).init(),
    };
  },
  firestore () {
      return { 
          myPosition: this.$store.state.firestore.collection("teams/uas2NdgAHHtz0a8tGTe1/hadjjs")
      }
  },
  firebase() {
      return {
          point: this.$store.state.database.child('point')
      }
  },
  methods : {
      search () {
          this.$binding("searchResults", this.$store.
          state.
          firestore.
          collection("hadjjs").where("email", "==", this.searchInput))
          .then((el) => {
            this.output = el
            console.log(this.output)
          })
      },
      createGroup () {
        this.Team.add()
        this.Team.resetName()
      },
      addHaj(haj) {
          this.positions.push(haj)
      }
    }
  }
</script>

