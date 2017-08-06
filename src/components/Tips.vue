<template>
  <ul id="tips">
    <li v-for="(item, index) of tips"
        :key="item.num"
        class="tip-fade"
        :class="{ 'tip-i': item.type === 'info', 'tip-e': item.type === 'error' }">
      <p>{{ item.info }}</p>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'tips',
  computed: {
    ...mapState({
      tips: state => state.global.tips
    })
  },
  methods: {
  }
}
</script>

<style scoped>
#tips{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  z-index: 910;
  right: 0.8rem;
  top: .3rem;
  font-size: 0.8rem;
}
.tip-i{
  display: flex;
  justify-content: space-between;
  margin-top: .5em;
  padding: .2em .6em;
  box-shadow: 2px 2px 5px #aaa;
  background: #81cdff;
  color: #555;
}
.tip-e{
  display: flex;
  justify-content: space-between;
  margin-top: .5em;
  padding: .2em .5em;
  box-shadow: 2px 2px 5px #aaa;
  background: #ff9c9c;
  color: #555;
}
.tip-i p, .tip-e p{
  max-width: 11em;
  word-wrap: break-word;
  word-break: normal;
}
.tip-fade{
  animation: fade 7s forwards;
}
@keyframes fade{
  0% {transform: scaleX(0);}
  7% {transform: scaleX(1);}
  90% {transform: scaleX(1); opacity: 1;}
  100% {transform: scaleY(0); opacity: .1;}
}
</style>
