<template>
  <div id="login">
    <img src="../assets/img/logo.png">
    <button class="btn" @click="login()">Sign in</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import http from '@/http'

export default {
  name: 'login',
  data () {
    return {
    }
  },
  created () {
    this.setSync(false)
  },
  methods: {
    ...mapActions(['setSync']),
    login () {
      window.location.replace('http://git-star.herokuapp.com/login')
    }
  },
  beforeRouteEnter (to, from, next) {
    let token = window.localStorage.getItem('token')
    if (token) {
      http.get('http://git-star.herokuapp.com/stats')
          .then(
            (response) => {
              if (response.body === '1') next({ path: '/dashboard' })
              else {
                window.localStorage.clear()
                next()
              }
            },
            (e) => {
              window.localStorage.clear()
              next()
            }
          )
    } else next()
  }
}
</script>

<style scoped>
#login{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: calc(50vh - 200px) auto 0 auto;
  width: 250px;
  height: 280px;
}
.btn{
  border-radius: 5px;
  background: linear-gradient(-180deg, #34d058 0%, #28a745 90%);
  padding: 7px 70px;
  color: white;
}
</style>
