<template>
  <div id="viewer">
    <div class="box" v-if="!Object.is(star, null)">
      <div class="box-star">
        <p class="box-star-info">
          <span>{{ star.name }}</span>
          <span>
            <i class="fa fa-user fa-1x"></i> {{ star.owner }}
          </span>
        </p>
        <p class="box-star-description">{{ star.description }}</p>
        <ul class="box-star-tags">
          <li v-for="each of star.categories"><span class="box-star-tag">each</span></li>
        </ul>
      </div>
      <div class="box-read">
        <p class="box-read-info">
          <span>README.md</span>
        </p>
        <div class="box-read-content">
          <vueMarkDown
          :source="this.md.body"
          :breaks="false"
          :task-lists="false"
          :anchorAttributes="{}"></vueMarkDown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueMarkDown from 'vue-markdown'
import http from '@/http'

export default {
  name: 'viewer',
  data () {
    return {
      md: ''
    }
  },
  created () {
    this.getMarkDown()
  },
  components: {
    VueMarkDown
  },
  computed: {
    ...mapState({
      star: store => store.star.currentStar
    })
  },
  methods: {
    async getMarkDown () {
      this.md = await http({
        method: 'GET',
        url: 'https://raw.githubusercontent.com/miaolz123/vue-markdown/master/README.md'
      })
    }
  }
}
</script>

<style>
#viewer{
  flex: 1;
  overflow: auto;
}
#viewer::-webkit-scrollbar{width: 6px; background: #ddd;}
#viewer::-webkit-scrollbar-button{display: none;}
#viewer::-webkit-scrollbar-thumb{background: #5b6875;border-radius: 3px;}
#viewer::-webkit-scrollbar-corner{display: none;}
.box{
  overflow: hidden;
}
.box-star{
  padding: 1rem 2rem;
  border-bottom: 1px solid #ccc;
}
.box-star-info{
  display: flex;
  justify-content: space-between;
}
.box-star-description{
  color: #666;
  padding: 1rem 0;
}
.box-star-tags{
  padding-bottom: .5rem;
  list-style:none;
}
.box-star-tag{
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid #aaa;
  border-radius: .5rem;
}
.box-read{
  max-width: 700px;
  width: 80%;
  margin: 2rem auto;
}
.box-read-content{
  line-height: 1.6rem;
  padding: 0.6rem 0;
}
.box-read-content div *{
  margin: 1rem 0;
}
.box-read-content div ul{
  list-style: disc;
}
.box-read-content div li{
  line-height: 1.5rem;
  margin: .2rem 0 .2rem 1.5rem!important;
}
.box-read-content div a{
  color: #0366d6;
}
.box-read-content div a:hover{
  text-decoration: underline;
}
</style>
