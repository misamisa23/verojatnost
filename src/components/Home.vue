<template>
<div>
  <div v-if="showMenu">
    <h1>{{ msg }}</h1>
    <div v-for="(value, key) in material" :key="key">
          <p @click="openLesson(value.usefulid)" class="lekcija" >{{ value.lessonid }} {{ value.name }}</p>
  </div>
  </div>

    <div v-if="showLesson">
      
      <div v-for="(value, key) in material.filter(item => item.usefulid == openedLessonUseful)" :key="key">
        <h2 class="inline">{{value.lessonid}} {{value.name}}</h2> 
      <p class="center-align"><span @click="prevLesson()" class="lekcija spacing"> Претходна лекција</span> <span @click="backToMenu()" class="lekcija spacing">Назад кон менито </span>  <span @click="nextLesson()" class="lekcija spacing"> Следна лекција</span></p>
<div v-for="(prasanje, k) in value.sodrzina" :key="k">
      
                <vue-flashcard 
                :imgBack="value.sodrzina[k].imageback"
                :imgFront="value.sodrzina[k].imagefront" 
                headerFront="Прашање" 
                textSizeFront="1.3em" 
                textSizeBack="1.3em" 
                headerBack="Одговор" 
                footerFront="кликни за да провериш" 
                footerBack="кликни за да затвориш"
                :front="value.sodrzina[k].question" 
                :back="value.sodrzina[k].answer"
                :importance="value.sodrzina[k].importance">
                </vue-flashcard>
              </div>
          

      </div>
  
      <p class="center-align"><span @click="prevLesson()" class="lekcija spacing"> Претходна лекција</span> <span @click="backToMenu()" class="lekcija spacing">Назад кон менито </span>  <span @click="nextLesson()" class="lekcija spacing"> Следна лекција</span></p>
    
            
    </div>
    <back-to-top text="^"></back-to-top>
  </div>
</template>

<script>
import Material from "../assets/json/material.json"
import vueFlashcard from './Flashcard.vue'
import BackToTop from './BackToTop.vue'


export default {
  name: 'Home',
  props: {
    msg: String
  },
  data() {
    return {
      material: Material,
      showMenu: true,
      showLesson: false,
      openedLesson: null,
      openedLessonName: null,
      openedLessonUseful: null,
      keys: null,
      showDef: []
    }
  },
  components : { 
    vueFlashcard,
    BackToTop
     },
  computed: {
   
  
     
  },
  mounted: function(){
    // console.log(this.chapters)

    this.keys = Object.keys( this.material[0] );
  },
  methods: {
    scrollToTop() {
                window.scrollTo(0,0);
           },
           
    openLesson(id){
      this.showMenu = false;
      // this.openedLesson = lekcija.lessonid;
      this.openedLessonUseful = id;
      this.showLesson = true;
      this.scrollToTop();
      // this.openedLessonName = lekcija.name;
    },

    backToMenu(){
      this.showLesson = false;
      this.showMenu = true;
      this.openedLesson = null;
      this.openedLessonName = null;
      this.openedLessonUseful = null;
    },
    
    nextLesson(){
        let last = this.material[Object.keys(this.material)[Object.keys(this.material).length - 1]] 
        if (Number(this.openedLessonUseful) < Number(last.usefulid))
        this.openLesson(String(Number(this.openedLessonUseful) + 1))
        else
        this.openLesson(this.openedLessonUseful)
    },
    prevLesson(){
        if (Number(this.openedLessonUseful) > 1)
        this.openLesson(String(Number(this.openedLessonUseful) - 1))
        else
        this.openLesson(this.openedLessonUseful)
       
    }
    

   }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.predavanje {
  color:black;
  font-style: italic;
  font-size: 16px;
}
.center-align{
  text-align:center;
}
body {
  margin:0;
  padding: 0;
}
.lekcija {
  font-size: 14px;
  text-decoration: underline;
  color:rgb(9, 105, 150);
  cursor: pointer;
  font-weight: 600;
  display:inline-block;
}

.term {
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
  color:rgb(23, 146, 70);
}
.spacing {
  margin: 5px;
}
</style>
