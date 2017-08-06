<template>
  <div class="edit">
    <div class="edit-input">
      <p class="alias">
        <input type="text" id="alias" :value="star.comment_name" placeholder="Alias" @keyup.esc="setDialog(false)">
      </p>
      <p class="origin">
        <input type="text" :value="star.name" disabled="disabled">
      </p>
      <p class="notes">
        <textarea rows="5" cols="50" id="description" :value="star.comment_description" placeholder="Notes" @keyup.esc="setDialog(false)"></textarea>
      </p>
      <ul class="tags">
        <p class="title">
          <input type="text" @keyup.enter="addTag()" placeholder="Tag" v-model="tag" @keyup.esc="setDialog(false)">
          <button class="add-tag" @click="addTag()"><i class="fa fa-check-square fa-1x"></i></button>
        </p>
        <li v-for="each of star.categories" :key="each">
          <span class="tag">{{ each }}</span>
          <button class="delete-tag" @click="deleteTag(each)"><i class="fa fa-times fa-1x"></i></button>
        </li>
      </ul>
    </div>
    <p class="edit-btn">
      <button class="btn" @click="ok()">Ok</button>
      <button class="btn" @click="cancel()">Cancel</button>
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'editStar',
  data () {
    return {
      tag: ''
    }
  },
  computed: {
    ...mapState({
      stars: state => state.star.stars,
      id: state => state.star.editId
    }),
    star: function () {
      for (let each of this.stars['All']) {
        if (each.id === this.id) return each
      }
      return null
    }
  },
  methods: {
    ...mapActions(['editStar', 'addStarTag', 'deleteStarTag', 'setDialog']),
    addTag () {
      if (this.tag === '') return
      this.addStarTag({id: this.id, tag: this.tag})
      this.tag = ''
    },
    deleteTag (each) {
      this.deleteStarTag({id: this.id, tag: each})
    },
    ok () {
      let starAlias = document.getElementById('alias').value
      let starDescription = document.getElementById('description').value
      this.editStar({id: this.id, alias: starAlias, description: starDescription})
      this.setDialog(false)
    },
    cancel () {
      this.setDialog(false)
    }
  }
}
</script>

<style scoped>
.edit{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.edit-input{
  width: 80%;
  margin-top: 1.5rem;
}
.alias, .origin{
  display: flex;
  align-items: center;
  margin-top: .7rem;
}
p span{
  width: 64px;
}
.notes{
  display: flex;
  align-items: flex-start;
  margin-top: .7rem;
}
.tags{
  margin-top: 1rem;
}
.tags li{
  display: inline-block;
  margin: 0 1rem .5rem 0;
}
.tag{
  border-radius: 1rem;
  background: #ddd;
  padding: 3px 10px;
}
.title{
  display: flex;
  align-items: center;
  padding: .7rem 0;
  border-top: 1px solid #ddd;
}
.edit-btn{
  margin: 1.5rem 0;
  display: flex;
  justify-content: space-between;
  width: 40%;
}
input, textarea{
  border: 1px solid #aaa;
  border-radius: 3px;
  padding: 4px 8px;
}
.add-tag{
  margin-left: 1rem;
  color: green;
  font-size: 1.3rem;
}
.delete-tag{
  color: red;
  font-size: 1.3rem;
}
.add-tag:hover, .delete-tag:hover{
  cursor: pointer;
}
.btn{
  padding: .3rem 0;
  width: 5rem;
  background: #619fe6;
  color: white;
  font-size: .8rem;
  border-radius: .5rem;
}
</style>
