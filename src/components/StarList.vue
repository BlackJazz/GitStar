<template>
  <ul id="star-list" class="drag">
    <li class="star-item"
        v-for="each of stars[tag]"
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
      dialogbox: state => state.global.dialogbox,
      stars: state => state.star.stars,
      tag: state => state.star.currentList
    })
  },
  methods: {
    ...mapActions(['getCurrentStar', 'getEditStar']),
    selectStar (id) {
      this.isActive = id
      this.getCurrentStar(id)
    },
    editStar (id) {
      window.event.cancelBubble = true
      this.getEditStar(id)
    }
  }
}
</script>

<style scoped>
#star-list{
  width: 16rem;
  list-style: none;
  overflow: auto;
}
#star-list::-webkit-scrollbar{width: 5px; background: #fafafa;}
#star-list::-webkit-scrollbar-button{display: none;}
#star-list::-webkit-scrollbar-thumb{background: #aaa;border-radius: 2px;}
#star-list::-webkit-scrollbar-corner{display: none;}
.star-item{
  margin: .3rem 0;
  padding: 0.5rem 1rem;
  background: #fafafa;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.star-active{
  background: #eee;
}
.star-item:hover{
  background: #eee;
}
.star-title{
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  color: #222;
}
.star-alias{
  margin-right: .5rem;
  color: #5584c2;
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
</style>
