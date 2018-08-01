<template>
    <v-container>
      <v-text-field
      label="Search"
      append-icon="search"
      v-model="searchInput"
      @keyup.enter="search()"
      ></v-text-field>
        <div v-for="(haj, index) in output" :key="index">
            <v-subheader>
                {{ haj.email }}
            </v-subheader>
        </div>
    </v-container>
</template>
<script>
export default {
  mouted () {
  },
  data () {
    return {
        searchInput: "",
        output: []
    };
  },
  firestore () {
      return {
          hadjs: this.$store.state.firestore.collection("hadjjes"),
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