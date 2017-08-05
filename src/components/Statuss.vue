<template>
  <div class="status">
    <span class="sync-static" v-if="status === 0"><i class="fa fa-link fa-1x"></i></span>
    <span class="sync-static" v-if="status === 1"><i class="fa fa-unlink fa-1x"></i></span>
    <span class="sync-shift" v-if="status === 2"><i class="fa fa-spinner fa-1x"></i></span>
    <span class="sync-static" v-if="status === 3"><i class="fa fa-check-circle fa-1x"></i></span>
    <span class="sync-static" v-if="status === 4"><i class="fa fa-warning fa-1x"></i></span>
    <span class="sync-text">{{ info[status] }}</span>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'status',
  created () {
    setInterval(() => {
      this.syncAll()
    }, 60000)
  },
  computed: {
    ...mapState({
      info: state => state.global.statusInfo,
      status: state => state.global.statusCode
    })
  },
  methods: {
    ...mapActions(['syncAll'])
  }
}
</script>

<style scoped>
.status{
  font-size: .9em;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: .5rem 0;
}
.sync-shift{
  animation: myshift 2s linear infinite;
  -webkit-animation: myshift 2s linear infinite;
}
@keyframes myshift{
  from {-webkit-transform:rotate(0deg);}
  to {-webkit-transform:rotate(360deg);}
}
@-webkit-keyframes myshift{
  from {-webkit-transform:rotate(0deg);}
  to {-webkit-transform:rotate(360deg);}
}
.sync-text{
  margin-left: .6rem;
}
</style>
