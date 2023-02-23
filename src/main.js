import { createApp } from 'vue';
import App from './App.vue';
// import HomePage from...
createApp(App).mount('#app');
// const app= createApp(App).mount('#app');
// app.component("HomePage",HomePage)--->GLOBAL, dont need to register i App metadata
// -minuses: loaded every time even when not needed, bundle sizes,variables naming when big app;
// so better use local;global in cases when we need that component in many places!

// to bind data we put it to script meta section data(){
//     return{
//         something importet from another file e.g
//     }
// }, and then we can e.g.  v-bind:src="i tak jakbysmy chcielu sie dostac do jakiegos obiektu"
