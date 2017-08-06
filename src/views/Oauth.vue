<template></template>

<script>
export default {
  name: 'oauth',
  created () {
    let token = this.$route.query.token
    if (token) {
      window.localStorage.setItem('token', JSON.stringify(token))
      this.$router.replace({ path: '/dashboard' })
    } else {
      this.$router.replace({ path: '/' })
    }
  }
}
</script>

<style></style>
