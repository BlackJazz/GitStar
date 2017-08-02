<template>
  <div class="sync">
    <span class="sync-shift" v-if="sync"><i class="fa fa-spinner fa-1x"></i></span>
    <span class="sync-static" v-else><i class="fa fa-check-circle fa-1x"></i></span>
    <span class="sync-text" v-if="sync">Sync...</span>
    <span class="sync-text" v-else>Completed</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'sync',
  computed: {
    ...mapState({
      sync: state => state.global.sync
    })
  }
}
</script>

<style scoped>
.sync{
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
