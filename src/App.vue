<template>
<header>
  <nav>
    <ul>
      <li class="nav-item">
        <img class="logo" src="./assets/build-a-bot-logo.png">
        Build a Bot
      </li>
    </ul>
  </nav>
</header>
<main>
  <!-- <HomePage msg="Welcome to Your Vue.js App"/> -->
  <RobotBuilder/>
  </main>
</template>

<script>
// import HomePage from './home/HomePage.vue';
import RobotBuilder from './build/RobotBuilder.vue';

export default {
  name: 'App',
  components: {
    RobotBuilder,
    // HomePage,
    // local components need to be register like this in section of App metadata,
    // can be used like HTML then;Single-file-component (template,script,style(optional))
    // GLOBAL COMPONENT must be put in main.js
  },
};
</script>

<style>
body {
background: linear-gradient(to bottom, #555, #999);
background-attachment: fixed;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

}
main {
  margin:0 auto;
  padding:30px;
  background-color: white;
  min-height: 300px;
  max-width:1024px;
}
header {
  background-color: #999;
  width: 1084px;
  margin: 0 auto;
}
ul {
  padding: 3px;
  display: flex;
}
.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}
.logo {
  vertical-align: middle;
  height: 30px;
}
</style>
