<template>
  <nav id="nav">
    <div class="user">
      <img class="avatar" src="../assets/img/logo.png">
      <span class="name">Inbeen</span>
      <p>
        <button class="quit" @click="logout()">Quit</button>
      </p>
    </div>
    <button class="search">
      <i class="fa fa-search fa-1x"></i>
      <input class="input" type="text" placeholder="">
    </button>
    <button class="title">Tags</button>
    <ul class="tag-list" @click="selectTag()">
      <li v-for="each of tags" :key="each.id" class="tag-item">
        <span class="tag-name">{{ each }}</span>
        <span class="tag-count">6</span>
      </li>
    </ul>
    <p class="loading">Loading...</p>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'nav',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      tags: state => state.star.tags
    })
  },
  created () {
  },
  methods: {
    ...mapActions(['getCurrentList']),
    logout () {
      window.localStorage.removeItem('token')
      this.$router.replace({ path: '/login' })
    },
    selectTag () {
      let tag
      if (window.event.target.className === 'tag-name') tag = window.event.target
      else tag = window.event.target.children[0]
      this.getCurrentList(tag.innerHTML)
    }
  }
}
</script>

<style scoped>
#nav{
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 11rem;
  background: #3a3f51;
  color: #ccced6;
  border-right: 1px solid #ccc;
}
.user{
  margin: 1rem 0;
  width: 70%;
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-size: 0.9rem;
}
.user p{
  display: flex;
  justify-content: space-between;
}
.avatar{
  width: 4rem;
  height: 4rem;
}
.name{text-align: center;}
.quit{color: #ccced6;text-decoration: underline;}
.search{
  padding: .2rem;
  width: 95%;
  background: #b5b9ca;
  color: #444;
  border-radius: 1rem;
}
.input{
  background: transparent;
  outline: none;
  border: none;
  font-size: 1rem;
  color: #444;
  width: 80%;
}
.title{
  width: 100%;
  padding: 0.5rem 0;
  color: #ccced6;
  font-size: 1rem;
  border-bottom: 1px solid #2e3344;
}
.tag-list{
  flex: 1;
  overflow: auto;
  width: 100%;
  list-style: none;
}
.tag-list::-webkit-scrollbar{width: 3px;}
.tag-list::-webkit-scrollbar-button{display: none;}
.tag-list::-webkit-scrollbar-thumb{background: #aaa;border-radius: 2px;}
.tag-list::-webkit-scrollbar-corner{display: none;}
.tag-item{
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 1rem;
}
.tag-item:hover{background: #7c86b1;}
.tag-count{
  font-size:0.9rem;
  color: #ccced6;
}
.loading{
  padding: .5rem 0;
}
</style>
