<template>
    <v-container>
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
    <v-btn @click="addPoint()">Add point</v-btn>    
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
     setTimeout(()=> {
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
        console.log("updated")
     }, 5000)
   },
   updated() {

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

        setTimeout(() => {
            this.$store.state.firestore
                .doc("teams/uas2NdgAHHtz0a8tGTe1/hadjjs/" + my[0]['.key'])
                .update({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    name: this.$auth.user().displayName,
                    user: this.$auth.user().uid
                })
        }, 5000)
        

    });
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
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
    test () {
        console.log(this.positions)
    },
    addPoint () {
        this.$firebaseRefs.point.update({
            lat: "a",
            lng: "a"
        })
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
