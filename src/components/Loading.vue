<template>
  <div class="loading" v-if="loading">
    <span class="loading-shift"><i class="fa fa-spinner fa-5x"></i></span>
    <span class="loading-text">Getting data from the server.<br>Please wait for a moment.</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'loading',
  computed: {
    ...mapState({
      loading: state => state.global.loading
    })
  }
}
</script>

<style scoped>
.loading{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #eee;
  position: absolute;
  z-index: 999;
  font-size: 2rem;
}
.loading-shift{
  animation: myshift 2s linear infinite;
  -webkit-animation: myshift 4s linear infinite;
}
@keyframes myshift{
  from {-webkit-transform:rotate(0deg);}
  to {-webkit-transform:rotate(360deg);}
}
@-webkit-keyframes myshift{
  from {-webkit-transform:rotate(0deg);}
  to {-webkit-transform:rotate(360deg);}
}
.loading-text{
  text-align: center;
  font-size: .6em;
  margin-top: 4rem;
}
</style>
