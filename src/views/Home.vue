<template>
  <div id="container">
    <loading></loading>
    <navi></navi>
    <starList></starList>
    <resizeBar></resizeBar>
    <viewer></viewer>
    <dialogBox></dialogBox>
    <shadowLayer></shadowLayer>
    <tips></tips>
  </div>
</template>

<script>
const Navi = resolve => require(['@/components/Nav'], resolve)
const StarList = resolve => require(['@/components/StarList'], resolve)
const Viewer = resolve => require(['@/components/Viewer'], resolve)
const ResizeBar = resolve => require(['@/components/ResizeBar'], resolve)
const DialogBox = resolve => require(['@/components/DialogBox'], resolve)
const ShadowLayer = resolve => require(['@/components/ShadowLayer'], resolve)
const Loading = resolve => require(['@/components/Loading'], resolve)
const Tips = resolve => require(['@/components/Tips'], resolve)

export default {
  name: 'home',
  components: {
    Navi,
    StarList,
    Viewer,
    ResizeBar,
    DialogBox,
    ShadowLayer,
    Loading,
    Tips
  }
}
</script>

<style>
#container{
  display: flex;
  height: 100vh;
}
code{
  font-size: .9rem;
  padding: .1rem .5rem;
  background-color: #f6f8fa;
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
