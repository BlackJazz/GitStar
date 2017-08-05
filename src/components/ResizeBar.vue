<template>
  <div id="resizebar">
  </div>
</template>

<script>
export default {
  name: 'resizebar'
}
</script>

<style scoped>
#resizebar{
  width: 1px;
  background: #69d6cf;
  border-left: 1px solid #e8fffd;
  border-right: 1px solid #fff;
}
#resizebar:hover{
  cursor: e-resize;
}
</style>
