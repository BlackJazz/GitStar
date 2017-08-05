<template>
  <div class="dialog" v-if="dialogbox">
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
</style>
