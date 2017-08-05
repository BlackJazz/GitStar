<template>
  <ul id="star-list" class="drag">
    <button class="auto" 
            v-if="ctag === 'Uncategorized' && stars.length !== 0"
            @click="autoCate()">
      <span class="auto-a"><i class="fa fa-spinner fa-1x auto-shift" v-if="auto"></i></span>
      <span class="auto-b">Auto Categorize</span>
      <span class="auto-c"></span>
    </button>
    <li class="star-item"
        v-for="each of stars"
        :key="each.id"
        @click="selectStar(each.id)"
        :class="{ 'star-active': isActive === each.id }">
      <p class="star-title" v-if="each.comment_name">
        <span class="star-alias">{{ each.comment_name }}</span>
        <span class="star-name">{{ each.name }}</span>
      </p>
      <p class="star-title" v-else><span class="star-alias">{{ each.name }}</span></p>
      <p class="star-description">{{ each.description }}</p>
      <p class="star-info">
        <span><i class="fa fa-user fa-1x"></i> {{ each.owner }}</span>
        <button class="star-rename" @click="editStar(each.id)"><i class="fa fa-edit fa-1x"></i></button>
      </p>
      <ul class="star-tags" v-if="each.categories.length !== 0">
        <li class="star-tag" v-for="t of each.categories" @click="selectTag(t)">
          <i class="fa fa-tag fa-1x"></i> {{ t }}
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'starlist',
  data () {
    return {
      isActive: ''
    }
  },
  computed: {
    ...mapState({
      dialogbox: state => state.global.dialog,
      stars: state => state.star.currentList,
      ctag: state => state.star.currentTag,
      auto: state => state.global.auto
    })
  },
  methods: {
    ...mapActions(['getCurrentStar', 'getEditId', 'autoCate', 'getCurrentList']),
    selectStar (id) {
      this.isActive = id
      this.getCurrentStar(id)
    },
    editStar (id) {
      window.event.cancelBubble = true
      this.getEditId(id)
    },
    selectTag (tag) {
      window.event.cancelBubble = true
      this.getCurrentList(tag)
    }
  }
}
</script>

<style scoped>
#star-list{
  width: 16rem;
  list-style: none;
  overflow: auto;
  background: #e8fffd;
}
.auto{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  border-bottom: 1px solid #eee;
  background: #fff;
  color: #666;
  text-shadow: 0 0 1px #ccc;
}
.auto-b{
  flex: 1;
}
.auto-a{
  flex: 0 0 1rem;
  margin-left: 2.5rem;
}
.auto-c{
  flex: 0 0 1rem;
  margin-right: 2.5rem;
}
.auto-shift{
  animation: myshift 2s linear infinite;
  -webkit-animation: myshift 2s linear infinite;
}
@keyframes myshift{
  from {-webkit-transform:rotate(0deg);}
  to {-webkit-transform:rotate(360deg);}
}
@-webkit-keyframes myshift{
  from {-webkit-transform:rotate(0deg);}
  to {-webkit-transform:rotate(360deg);}
}
.auto:hover{
  cursor: pointer;
}
#star-list::-webkit-scrollbar{width: 3px; background: #e8fffd;}
#star-list::-webkit-scrollbar-button{display: none;}
#star-list::-webkit-scrollbar-thumb{background: #69d6cf;border-radius: 2px;}
#star-list::-webkit-scrollbar-corner{display: none;}
.star-item{
  margin: .3rem 0;
  padding: 0.5rem 1rem;
  background: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.star-active{
  background: #fafafa;
}
.star-title{
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  color: #222;
}
.star-alias{
  margin-right: .5rem;
  color: #5195F1;
}
.star-name{
  font-size: .5rem;
  color: #8398b5;
}
.star-rename{
  margin-left: .3rem;
  font-size: .9rem;
  color: #999;
}
.star-rename:hover{
  cursor: pointer;
}
.star-info{
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #888;
}
.star-description{
  margin: .5rem 0;
  font-size: 0.9rem;
  overflow: hidden;
  color: #666;
}
.star-tags{
  border-top: 1px solid #ccc;
  margin-top: 4px;
  font-size: .8rem;
  color: #666;
}
.star-tag{
  display: inline-block;
  margin: 3px 12px 0 0;
}
.star-tag:hover{
  cursor: pointer;
}
</style>
