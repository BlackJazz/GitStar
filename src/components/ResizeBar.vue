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
  width: 0;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
#resizebar:hover{
  cursor: e-resize;
}
</style>
