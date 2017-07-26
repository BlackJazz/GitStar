<template>
  <div id="login">
    <img src="../assets/img/logo.png">
    <button class="btn" @click="login()">Sign in</button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
    }
  },
  methods: {
    login () {
      window.localStorage.setItem('token', JSON.stringify(true))
      this.$router.replace({ path: '/' })
    }
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
