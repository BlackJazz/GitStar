<template>
  <nav id="nav">
    <div class="user">
      <a :href="url" target="_blank"><img class="avatar" :src="avatar"></a>
      <span class="name">{{ username }}</span>
      <p>
        <button class="quit" @click="logout()">Quit</button>
      </p>
    </div>
    <button class="search">
      <i class="fa fa-search fa-1x"></i>
      <input class="input" type="text" v-model="keyword">
      <p style="display: none;">{{ searchResult }}</p>
    </button>
    <button class="title" @click="searchTag()"><i class="fa fa-tags fa-1x"></i><span> Tags</span></button>
    <ul class="tag-list">
      <li class="tag-item"
          @click="selectTag(each)"
          v-for="each of Object.keys(stars)"
          :key="each"
          :class="{ 'tag-active': ctag === each }">
        <span class="tag-name">{{ each }}</span>
        <span class="tag-count">{{ stars[each].length }}</span>
      </li>
    </ul>
    <statuss></statuss>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Statuss from '@/components/Statuss'

export default {
  name: 'nav',
  components: {
    Statuss
  },
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
    ...mapState({
      stars: state => state.star.stars,
      ctag: state => state.star.currentTag,
      username: state => state.user.username,
      avatar: state => state.user.avatar
    }),
    url: function () {
      return `https://github.com/${this.username}`
    },
    searchResult: function () {
      return this.searchStar(this.keyword)
    }
  },
  created () {
    this.getUser()
    this.getAll()
  },
  methods: {
    ...mapActions(['getCurrentList', 'getUser', 'getAll', 'searchStar', 'setDialog', 'setDialogId']),
    logout () {
      window.localStorage.removeItem('token')
      this.$router.replace({ path: '/' })
    },
    selectTag (tag) {
      this.getCurrentList(tag)
    },
    searchTag () {
      this.setDialog(true)
      this.setDialogId(1)
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
.quit{
  color: #ccced6;
  text-decoration: underline;
}
.quit:hover{
  cursor: pointer;
}
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
  margin-bottom: .3rem;
  color: #ccced6;
  font-size: 1rem;
  border-bottom: 1px solid #2e3344;
}
.title:hover{
  cursor: pointer;
}
.tag-list{
  flex: 1;
  overflow: auto;
  width: 100%;
  list-style: none;
  color: #ccced6;
}
.tag-active{
  background: #fafafa;
  color: #444;
}
.tag-list::-webkit-scrollbar{width: 3px;}
.tag-list::-webkit-scrollbar-button{display: none;}
.tag-list::-webkit-scrollbar-thumb{background: #ccc;border-radius: 2px;}
.tag-list::-webkit-scrollbar-corner{display: none;}
.tag-item{
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 1rem;
}
.tag-item:hover{
  text-shadow: 0 0 3px #fff;
  cursor: pointer;
}
.tag-count{
  font-size:0.9rem;
}
</style>
