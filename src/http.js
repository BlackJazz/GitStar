import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  let token = JSON.parse(window.localStorage.getItem('token'))
  if (token) {} else Vue.$router.replace({ path: '/login' })
  if (request.url !== 'https://raw.githubusercontent.com/miaolz123/vue-markdown/master/README.md') {
    if (token) request.headers.set('Authorization', `TOKEN ${token}`)
  }
  next((response) => {
    if (response.status === 400 || response.status === 401) {
      window.localStorage.clear()
      Vue.$router.replace({ path: '/login' })
    }
    return response
  })
})

export default Vue.http
