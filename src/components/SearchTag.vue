<template>
  <div class="search">
    <span class="close" @click="close()"><i class="fa fa-times fa-1x"></i></span>
    <p class="search-input">
      <i class="fa fa-search fa-1x"></i>
      <input type="text" v-model="keyword" @keyup.esc="setDialog(false)">
    </p>
    <ul class="search-result" v-if="list.length !== 0">
      <li class="search-item" v-for="each of list" @click="selectTag(each)">{{ each }}</li>
    </ul>
    <p class="search-result" v-else>No Result!</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'searchTag',
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
    ...mapState({
      tags: state => Object.keys(state.star.stars)
    }),
    list: function () {
      return this.searchTag(this.keyword)
    }
  },
  methods: {
    ...mapActions(['getCurrentList', 'setDialog']),
    searchTag (keyword) {
      let result = []
      for (let tag of this.tags) {
        if (tag.toLowerCase().includes(keyword.toLowerCase())) {
          result.push(tag)
        }
      }
      return result
    },
    selectTag (tag) {
      this.getCurrentList(tag)
      this.setDialog(false)
    },
    close () {
      this.setDialog(false)
    }
  }
}
</script>

<style scoped>
.search{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-input{
  width: 80%;
  margin: 2.5rem 0 1rem 0;
}
.search-result{
  width: 80%;
  padding: 1rem 0;
  margin-bottom: 1rem;
  border-top: 1px solid #ddd;
}
.search-item{
  padding: 2px 5px;
  border-radius: 2px;
  background: #ddd;
  display: inline-block;
  margin: 0 1rem .5rem 0;
  font-size: .9rem;
}
.search-item:hover{
  cursor: pointer;
}
.close{
  position: absolute;
  top: .4rem;
  right: .7rem;
  color: #999;
}
.close:hover{
  cursor: pointer;
  color: #666;
}
</style>
