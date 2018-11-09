<template>
<div>
  <div v-if="showMenu">
    <h1>{{ msg }}</h1>
    <div v-for="(content, index) in chapters" :key="index">
      <div v-for="(lekcii,predavanje) in content" :key="predavanje">
        <p class="predavanje">{{ predavanje }}</p>
        <div v-for="(lekcija,indeks) in lekcii" :key="indeks"> 
          <p @click="openLesson(lekcija.id, lekcija.name )" class="lekcija">{{ lekcija.id }} {{ lekcija.name }} </p>
        </div>
        </div>
      </div>
    </div>

    <div v-if="showLesson">
      <p>{{openedLesson}} {{openedLessonName}}</p>
      <div v-for="(value, key) in material[0]" :key="key">
          <div v-if="key == openedLesson">
             <div v-for="(v, k) in value" :key="k">
                
                         <vue-flashcard 
                      :imgBack="value[k].imageback"
                      :imgFront="value[k].imagefront" 
                      headerFront="Прашање" 
                      textSizeFront="1.3em" 
                      textSizeBack="1.3em" 
                      headerBack="Одговор" 
                      footerFront="кликни за да провериш" 
                      footerBack="кликни за да затвориш"
                      :front="value[k].question" 
                      :back="value[k].answer"></vue-flashcard>

              </div>
          </div>
      </div>
      <p @click="backToMenu()" class="lekcija">Назад кон менито</p>
    </div>
  </div>
</template>

<script>
import Chapters from "../assets/json/chapters.json"
import Material from "../assets/json/material.json"
import vueFlashcard from 'vue-flashcard';


export default {
  name: 'Home',
  props: {
    msg: String
  },
  data() {
    return {
      chapters: Chapters,
      material: Material,
      showMenu: true,
      showLesson: false,
      openedLesson: null,
      openedLessonName: null,
      keys: null,
      showDef: []
    }
  },
  components : { 
    vueFlashcard
     },
  computed: {
     
  },
  mounted: function(){
    // console.log(this.chapters)

    this.keys = Object.keys( this.material[0] );
  },
  methods: {

    openLesson(id, name){
      this.showMenu = false;
      this.openedLesson = id;
      this.showLesson = true;
      this.openedLessonName = name;
    },

    backToMenu(){
      this.showLesson = false;
      this.showMenu = true;
      this.openedLesson = null;
      this.openedLessonName = null;
    },

    

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
.lekcija {
  font-size: 14px;
  text-decoration: underline;
  color:rgb(9, 105, 150);
  cursor: pointer;
  font-weight: 600;
}
.term {
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
  color:rgb(23, 146, 70);
}
</style>
