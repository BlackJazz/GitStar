<template></template>

<script>
export default {
  name: 'oauth',
  created () {
    let token = this.$route.query.token
    if (token) {
      window.localStorage.setItem('token', JSON.stringify(token))
      this.$router.replace({ path: '/' })
    } else {
      this.$router.replace({ path: '/login' })
    }
  }
}
</script>

<style></style>
