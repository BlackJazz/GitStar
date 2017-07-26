<template>
  <div id="container">
    <navi></navi>
    <starList></starList>
    <viewer></viewer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navi from '@/components/Nav'
import StarList from '@/components/StarList'
import Viewer from '@/components/Viewer'
export default {
  name: 'home',
  components: {
    Navi,
    StarList,
    Viewer
  },
  created () {
    this.getStars()
  },
  methods: {
    ...mapActions(['getStars'])
  }
}
</script>

<style scoped>
#container{
  display: flex;
  height: 100vh;
}
</style>
