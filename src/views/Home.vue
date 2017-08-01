<template>
  <div id="container">
    <navi></navi>
    <starList></starList>
    <resizeBar></resizeBar>
    <viewer></viewer>
  </div>
</template>

<script>
import Navi from '@/components/Nav'
import StarList from '@/components/StarList'
import Viewer from '@/components/Viewer'
import ResizeBar from '@/components/ResizeBar'
export default {
  name: 'home',
  components: {
    Navi,
    StarList,
    Viewer,
    ResizeBar
  }
}
</script>

<style>
#container{
  display: flex;
  height: 100vh;
}
blockquote{
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}
pre{
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}
ul{
  list-style: none;
}
table{
  border-top: 1px solid #c6cbd1;
  border-collapse: collapse;
}
td{
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}
th{
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}
</style>
