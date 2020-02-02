<template>
  <div id="app">
    <HeaderWithFooter>
      <img src="../../assets/logo.png">
      <div>
        <p>
          If Element is successfully added to this project, you'll see an
          <code v-text="'<el-button>'"></code>
          below
        </p>
        <el-button>el-button</el-button>
      </div>
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </HeaderWithFooter>
  </div>
</template>

<script>
import HelloWorld from '../../components/HelloWorld.vue'
import HeaderWithFooter from "@/components/HeaderWithFooter.vue";

export default {
  name: 'app',
  components: {
    HelloWorld,
    HeaderWithFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
