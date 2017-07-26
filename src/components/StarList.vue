<template>
  <ul id="star-list" class="drag">
    <li class="star-item" v-for="each of stars" :key="each.id" :id="each.id" @click="selectStar()">
      <p class="star-title">{{ each.name }}</p>
      <p class="star-info">
      {{ each.owner.login }}
      {{ each.stargazers_count }}
      </p>
      <p class="star-description">{{ each.description }}</p>
    </li>
  </ul>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'starlist',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      stars: state => state.star.currentList
    })
  },
  methods: {
    ...mapActions(['getCurrentStar']),
    selectStar () {
      // let star
      if (window.event.target.className === 'star-item') console.log(window.event.target.id)
      else console.log(window.event.target.parentElement.id)
      // this.getCurrentList(star.innerHTML)
      this.getCurrentStar()
    }
  }
}
</script>

<style scoped>
#star-list{
  border-right: 1px outset #fff;
  width: 16rem;
  list-style: none;
  overflow: auto;
}
.star-item{
  margin: .3rem 0;
  padding: 0.5rem 1rem;
  background: #fafafa;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.star-item:hover{
  background: #eef2ff;
}
.star-title{
}
.star-info{
  font-size: 0.8rem;
}
.star-description{
  font-size: 0.9rem;
  overflow: hidden;
}
</style>
