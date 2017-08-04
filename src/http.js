import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  let token = JSON.parse(window.localStorage.getItem('token'))
  if (token) {} else {
    Vue.$router.replace({ path: '/' })
    return
  }
  let url = request.url
  if (!url.startsWith('https://raw.githubusercontent.com')) {
    if (token) request.headers.set('Authorization', `TOKEN ${token}`)
  }
  next((response) => {
    if (response.status === 401) {
      window.localStorage.clear()
      Vue.$router.replace({ path: '/' })
      return
    }
    return response
  })
})

export default Vue.http
