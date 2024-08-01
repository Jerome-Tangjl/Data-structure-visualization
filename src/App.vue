// <!--<template>
// <div id="app">
//   <div id="nav">
//     <el-link href="/" style="font-size:16px;">首页</el-link> |
//     <el-link href="/bitree" style="font-size:16px;">二叉树</el-link> |
//     <el-link href="/scn" style="font-size:16px;">社会关系网络</el-link>
//   </div>
//   <router-view/>
// </div>
// </template>-->

<template>
  <div id="app">
    <div id="nav">
      <a href="/home" style="text-decoration:none">首页</a> | 
      <a href="/bitree" style="text-decoration:none">二叉树</a> | 
      <a href="/scn" style="text-decoration:none">社会关系网络</a>
      <!-- <router-link to="/home" style="text-decoration:none">首页</router-link> | 
      <router-link to="/bitree" style="text-decoration:none" @click.native="flush">二叉树</router-link> | 
      <router-link to="/scn" class="scn" style="text-decoration:none">社会关系网络</router-link> -->
    </div>  
    <router-view />
  </div>
</template>


<script>
export default {
  name: "app",
  methods:{
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  margin-top: 20px;
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a：active {
  color: #409EFF;
}

#nav a.router-link-exact-active {
  color: #409EFF;
}

#nav a.router-link-active {
  color: #409EFF;
}

html {
  font: 700 16px/1 "Titillium Web", sans-serif;
  height: 731px;
  padding: 0;
  margin: 0;
}

body {
  margin: 0 0;
  color: #2c3e50;
  /* background-color: #eaebf0; */
}
</style>
