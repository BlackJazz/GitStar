<template>
  <div id="viewer">
    <div class="box" v-if="!Object.is(star, null)">
      <div class="box-star">
        <p class="box-star-info">
          <a :href="star.url" target="_blank" class="box-star-name">{{ star.name }}</a>
          <span>
            <i class="fa fa-user fa-1x"></i>
            <a :href="ownerUrl" target="_blank" class="box-star-owner">{{ star.owner }}</a>
          </span>
        </p>
        <p class="box-star-description">{{ star.description }}</p>
        <p class="box-star-description" v-if="star.comment_description">{{ star.comment_description }}</p>
        <ul class="box-star-tags" v-if="star.categories.length !== 0">
          <li v-for="each of star.categories" class="box-star-tag"><span>{{ each }}</span></li>
        </ul>
      </div>
      <div class="box-read">
        <p class="box-read-info">
        </p>
        <div class="box-read-content">
          <vueMarkDown
          :source="this.md"
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

export default {
  name: 'viewer',
  data () {
    return {
    }
  },
  components: {
    VueMarkDown
  },
  computed: {
    ...mapState({
      star: state => state.star.currentStar,
      mdList: state => state.star.mdList
    }),
    md: function () {
      for (let each of this.mdList) {
        if (this.star.id === each.id) return each.md
      }
      return ''
    },
    ownerUrl: function () {
      return `https://github.com/${this.star.owner}`
    }
  },
  methods: {
  }
}
</script>

<style>
#viewer{
  flex: 1;
  overflow: auto;
}
#viewer::-webkit-scrollbar{width: 6px;}
#viewer::-webkit-scrollbar-button{display: none;}
#viewer::-webkit-scrollbar-thumb{background: #69d6cf;border-radius: 3px;}
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
  margin-bottom: .5rem;
}
.box-star-name, .box-star-owner{
  color: #5195F1;
}
.box-star-owner{
  margin-left: .5rem;
}
.box-star-name:hover, .box-star-owner:hover{
  cursor: pointer;
  text-decoration: underline;
}
.box-star-description{
  color: #666;
  padding: .5rem 0;
}
.box-star-tags{
  padding-top: .5rem;
  border-top: 1px solid #eee;
  list-style:none;
}
.box-star-tag{
  display: inline-block;
  margin: 0 1rem .5rem 0;
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
.box-read-content div > *{
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
  color: #5195F1;
}
.box-read-content div a:hover{
  text-decoration: underline;
}
</style>
