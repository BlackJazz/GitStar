<template>
  <div class="dialog" v-if="dialogbox" :class="{ 'scale': dialogbox }">
    <editStar v-if="dialogId === 0"></editStar>
    <searchTag v-if="dialogId === 1"></searchTag>
  </div>
</template>

<script>
import EditStar from '@/components/EditStar'
import SearchTag from '@/components/SearchTag'
import { mapState } from 'vuex'

export default {
  name: 'dialog',
  components: {
    EditStar,
    SearchTag
  },
  computed: {
    ...mapState({
      dialogId: state => state.global.dialogId,
      dialogbox: state => state.global.dialog
    })
  }
}
</script>

<style scoped>
.dialog{
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 950;
  background: white;
  border-radius: 2px;
  overflow: hidden;
  left: calc(50% - 20rem);
  top: calc(50% - 12rem);
  width: 40rem;
  box-shadow: 0 0 10px #666;
}
.scale{
  animation: scale .1s forwards;
}
@keyframes scale{
  0% {transform: scale(0.2); opacity: 0.1;}
  100% {transform: scaleX(1); opacity: 1;}
}
</style>
