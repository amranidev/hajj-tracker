<template>
    <v-app>
      <v-navigation-drawer app v-model="drawer" :permanent="drawer" hide-overlay width="200" v-if="$auth.user()">
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="$auth.user().photoURL" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ $auth.user().displayName || $auth.user().email }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list>
          <v-list-tile @click="$router.push('/')">
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="$router.push('/group')">
            <v-list-tile-content>
              <v-list-tile-title>Create Group</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="$router.push('/messages')">
            <v-list-tile-content>
              <v-list-tile-title>Messages</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logout()">
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app color="teal darken-1">
        <v-toolbar-side-icon @click.native="drawer = !drawer" v-if="$auth.user()"></v-toolbar-side-icon>
        <v-toolbar-title><img src="./../assets/img/LogoFinal.png" style="max-height:100px; max-width:100px;margin-left:100px; margin-top:60px" alt=""></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat v-if="$auth.user()" @click="logout()">SignOut</v-btn>
          <v-btn flat v-else @click="login()">Login</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer app color="teal darken-1">
        <span>&copy; 2018</span>
        <v-spacer></v-spacer>
      </v-footer>
    </v-app>
</template>
<script>
import navbar from "@/components/partials/Navbar";
import RoutesUtils from '@/router/utils'

export default {
  mounted () {
    this.$auth
      .check()
      .then(user => {})
      .catch(err => {})
  },
  data () {
    return {
      items: [
        { title: 'Real time Database', link: 'dashboard' },
        { title: 'Cloud Firestore', link: 'account_box' },
      ],
      drawer: true,
      RoutesUtils: RoutesUtils.navigarion
    }
  },
  methods: {
    logout () {
      this.$auth.logout().then(() => {
        this.$router.push('/login')
      })
    },
    login () {
      this.$router.push('/login')
    }
  },
  components: {
    navbar
  }
}
</script>

<style>
 /**/
</style>
