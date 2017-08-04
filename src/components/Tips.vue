<template>
  <ul id="tips">
    <li v-for="(item, index) of tips"
        :key="item.num"
        class="tip-fade"
        :class="{ 'tip-i': item.type === 'info', 'tip-e': item.type === 'error' }">
      <p>{{ item.info }}</p>
      <button @click="clickTip(index)"></button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'tips',
  computed: {
    ...mapState({
      tips: state => state.global.tips
    })
  },
  methods: {
    ...mapActions(['deleteTip']),
    clickTip (i) {
      window.event.cancelBubble = true
      console.log(i)
      this.deleteTip(i)
    }
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
  padding: .2rem .6em;
  box-shadow: 2px 2px 5px #aaa;
  background: #d9edf7;
  color: #31708f;
}
.tip-e{
  display: flex;
  justify-content: space-between;
  margin-top: .5em;
  padding: .2rem .5em;
  border: 1px solid #ebccd1;
  border-radius: .3em;
  background: #f2dede;
  color: #a94442;
}
.tip-i p, .tip-e p{
  max-width: 10em;
  word-wrap: break-word;
  word-break: normal;
}
.tip-i i, .tip-e i{
  color: #aaa;
}
.tip-i i:hover, .tip-e i:hover{
  color: #666;
  cursor: pointer;
}
.tip-fade{
  animation: fade 1s 3s ease forwards;
}
@keyframes fade{
  from {}
  to { opacity: 0; }
}
</style>
