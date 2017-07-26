<template>
  <div id="viewer">
    <div class="box" v-if="!Object.is(star, null)">
      <p class="box-title">
        <span>{{ star.title }}</span>
        <span>
          <i class="fa fa-user fa-1x"></i> {{ star.user }}
          <i class="fa fa-star fa-1x"></i> {{ star.stars }}
        </span>
      </p>
      <p class="box-content">{{ star.description }}</p>
      <ul class="box-tags">
        <li><span class="box-tag">123</span></li>
      </ul>
      <p class="box-title">
        <span>README.md</span>
      </p>
      <p class="box-content"></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'viewer',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      star: store => store.star.currentStar
    })
  }
}
</script>

<style scoped>
#viewer{
  flex: 1;
}
.box{
  border-top: 1px solid #ccc;
  overflow: hidden;
}
.box-title{
  padding: 0.6rem 1.5rem;
  display: flex;
  justify-content: space-between;
}
.box-tags{
  padding: 0.3rem 1.5rem 0.9rem 1.5rem;
  list-style:none;
}
.box-tag{
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: #6492ff;
  border-radius: .5rem;
}
.box-content{
  padding: 0.6rem 1.5rem;
}
</style>
