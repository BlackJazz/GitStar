<template>
  <div class="shadow" v-if="dialogbox" @click="setDialog(false)"></div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'shadowlayer',
  computed: {
    ...mapState({
      dialogbox: state => state.global.dialog
    })
  },
  methods: {
    ...mapActions(['setDialog'])
  }
}
</script>

<style scoped>
.shadow{
  position: absolute;
  z-index: 900;
  width: 100%;
  height: 100%;
  background: #666;
  opacity: 0.5;
}
</style>