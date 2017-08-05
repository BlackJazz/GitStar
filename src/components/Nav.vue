<template>
  <nav id="nav">
    <div class="user">
      <p class="small">Dear</p>
      <p class="name">{{ username }}</p>
      <p>
        <button class="quit" @click="logout()"><i class="fa fa-sign-out fa-1x"></i></button>
      </p>
    </div>
    <button class="search">
      <i class="fa fa-search fa-1x"></i>
      <input class="input" type="text" v-model="keyword" placeholder="Search" @keyup.enter="searchStar(keyword)">
      <p style="display: none;">{{ searchResult }}</p>
    </button>
    <button class="title" @click="searchTag()"><i class="fa fa-tags fa-1x"></i><span> Tags</span></button>
    <ul class="tag-list">
      <li class="tag-item"
          @click="selectTag(each)"
          v-for="each of Object.keys(stars)"
          :key="each">
        <div class="tag-item-left"></div>
        <div class="tag-item-center" :class="{ 'active': ctag === each }">
          <div class="tag-name">{{ each }}</div>
          <div class="tag-count">{{ stars[each].length }}</div>
        </div>
        <div class="tag-item-right"></div>
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
  flex: 0 0 12rem;
  background: #1FB5AC;
  color: #fff;
}
.user{
  margin: 1rem 0;
  width: 70%;
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
.small{
  font-size: .8rem;
}
.name{
  margin: 6px 0;
  font-weight: bold;
  font-size: 1.4rem;
  text-align: center;
}
.quit{
  transform:rotateY(180deg);
  color: #fff;
}
.quit:hover{
  cursor: pointer;
  text-decoration: underline;
}
.search{
  padding: .2rem;
  background: transparent;
  color: #fff;
}
.input{
  background: transparent;
  outline: none;
  border: none;
  font-size: 1rem;
  color: #fff;
  width: 80%;
}
.input::placeholder{
  font-style: italic;
  color: #d2fffc;
}
.title{
  width: 100%;
  padding: 0.5rem 0;
  margin-bottom: .3rem;
  color: #fff;
  font-size: 1rem;
  border-bottom: 1px solid #befffb;
}
.title:hover{
  cursor: pointer;
}
.tag-list{
  flex: 1;
  overflow: auto;
  width: 100%;
  list-style: none;
  color: #fff;
}
.tag-list::-webkit-scrollbar{width: 3px;}
.tag-list::-webkit-scrollbar-button{display: none;}
.tag-list::-webkit-scrollbar-thumb{background: #fff;border-radius: 2px;}
.tag-list::-webkit-scrollbar-corner{display: none;}
.tag-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
}
.tag-item-center:hover{
  background: #36ccc2;
  cursor: pointer;
}
.tag-item-center{
  display: flex;
  justify-content: space-between;
  padding: 4px 10px;
  border-radius: 2px;
  font-size: .9em;
  flex: 1;
  transition: background .5s ease-out;
}
.tag-item-left, .tag-item-right{
  flex: 0 0 .7em;
}
.active{
  background: #36ccc2;
}
.tag-count{
}
</style>
