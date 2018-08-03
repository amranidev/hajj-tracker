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
                <v-icon color="black" @click="add(haj['.key'])">add</v-icon>
            </v-subheader>
        </div>
    </div>
      <v-card>
      <v-list two-line subheader>
        <v-subheader>Items</v-subheader>
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
  <div>
    <br>
    <gmap-map
      :center="center"
      :zoom="13"
      :clickable="true"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div> 
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
        
    this.geolocate()
     
     this.$binding("positions", this.$store.state.firestore.collection("/teams/uas2NdgAHHtz0a8tGTe1/hadjjs"))
                .then((el) => {
                    el.forEach((el) => {
                        const marker = {
                            lat: el.lat,
                            lng: el.lng
                        }
                        this.markers.push({ position: marker });
                        this.places.push(this.currentPlace);
                        this.center = marker;
                    })
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
        this.Team.add()
        this.Team.resetName()
      },
      addHaj (key) {

      },
    geolocate () {
    navigator.geolocation.getCurrentPosition(position => {
        this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        title: "Google"
        };

        const marker = this.center

        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;

        console.log(this.$auth.user().uid)

        var my = this.myPosition.filter((el) => {
            return el.user == this.$auth.user().uid
        })

        this.$store.state.firestore
                .collection("teams/uas2NdgAHHtz0a8tGTe1/hadjjs/" + my[0]['.key'])
                .update({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
        

    });
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
          color: "white"
        }

        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    setPlace (place) {
        this.currentPlace = place;
    },
    test() {
        console.log(this.positions)
    },
    check() {

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
