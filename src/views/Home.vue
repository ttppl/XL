<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
  </div>
</template>

<script>
// @ is an alias to /src
import logAndSign from '../request/APIs/logAndSign'
// import request from '../request/request'
export default {
  name: 'Home',
  components: {

  },

  created () {
    logAndSign.login('/login').then((res) => {
      console.log(res)
    })
  }
}
</script>
