<template>
  <div>
    <v-card>
      <v-list two-line subheader>
        <v-subheader>Messages</v-subheader>
        <v-list-tile v-for="(item, index) in data" :key="index">
            <v-list-tile-avatar>
                <img :src="item.photoURL">
              </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{item.message}} - <i>{{item.name}}</i> </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon color="black" @click="deleteItem(item['.key'])">delete</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-container>
        <v-text-field
        label="Write Message..."
        v-model="Item.message"
        @keyup.enter="addItem()"
        ></v-text-field>
        <v-btn @click="addItem()">Send</v-btn>
      </v-container>
    </v-card>
    <div class="overlay" v-if="!ready">
      <div class="flex-spinner">
        <v-progress-circular :size="200" :width="7" indeterminate color="amber"></v-progress-circular>
      </div> 
    </div>
  </div>
</template>

<script>

import Item from "@/models/Item";

export default {
  mounted () {
    this.$auth.check()
    .then(user => {
        this.user = user
     })
    .catch(err => {
      console.log(err)
    })
  },
  firebase () {
    return {
      data: {
        source: this.$store.state.database.child("item"),
        readyCallback: () => {
          this.ready = true
        }
      }
    }
  },
  data () {
    return {
      token: "",
      Item: new Item(this.$store.state.database.child('item')).init(),
      ready: false
    }
  },
  methods: {
    addItem () {
      //this.$firebaseRefs.messages.onDisconnect().cancel()
      this.Item.photoURL = this.$auth.user().photoURL
      this.Item.name = this.user.displayName
      this.Item.push()
      this.Item.message = ""
    },
    deleteItem (key) {
      this.Item.remove(key);
    }
  }
};
</script>

<style scoped>
.delete-data {
  cursor: pointer;
  color: red;
}

.data-container {
  width: 700px;
}

</style>
