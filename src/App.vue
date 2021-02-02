<template>
  <div id="app">
      页面app
      <hr>
      <router-link to="/home/a">home页面有a</router-link>
      <hr>
      <router-link to="/home/b">home面有bbbb</router-link>
      <hr>
      <router-link to="/about">about 页面</router-link>
      <hr>
     <router-view></router-view>
  </div>
</template>

<script>
export default {
  
  data(){
    return {

    }
  },
  mounted(){
    console.log(this.$route);
  }
  
}
</script>
<style lang="scss">

</style>
