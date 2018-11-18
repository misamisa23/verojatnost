<template>
<div>
  <div v-if="showSubjects">
    <h1>Одберете предмет</h1>
    <div v-for="(value, key) in predmeti" :key="key">
          <p @click="openSubject(value.id)" class="lekcija" >{{ value.predmet}}</p>
  </div>
  </div>
  <div v-if="showMenu">
    <div v-for="(value, key) in material.filter(item => item.id == openedSubject)" :key="key">
       <h1>{{value.predmet}}</h1>
          <div v-for="(v, k) in value.everything" :key="k">
            <!-- v:{{v}} k: {{k}} -->
          <p @click="openLesson(v.usefulid)" class="lekcija" >{{ v.lessonid }} {{ v.name }}</p>
  </div>
   </div>
   <span @click="backToMain()" class="lekcija spacing">Назад кон предмети</span> 
  </div>

    <div v-if="showLesson">
      
      
        <h2 class="inline">{{selectedLesson.lessonid}} {{selectedLesson.name}}</h2> 
      <p class="center-align"><span @click="prevLesson()" class="lekcija spacing"> Претходна лекција</span> <span @click="backToMenu()" class="lekcija spacing">Назад кон лекции</span>  <span @click="nextLesson()" class="lekcija spacing"> Следна лекција</span></p>
<div v-for="(prasanje, k) in selectedLesson.sodrzina" :key="k">
      
                <vue-flashcard 
                :imgBack="selectedLesson.sodrzina[k].imageback"
                :imgFront="selectedLesson.sodrzina[k].imagefront" 
                headerFront="Прашање" 
                textSizeFront="1.3em" 
                textSizeBack="1.3em" 
                headerBack="Одговор" 
                footerFront="кликни за да провериш" 
                footerBack="кликни за да затвориш"
                :front="selectedLesson.sodrzina[k].question" 
                :back="selectedLesson.sodrzina[k].answer"
                :importance="selectedLesson.sodrzina[k].importance"
                :main-toggle="toggleSwitch">
                </vue-flashcard>
              </div>
          

  
  
      <p class="center-align"><span @click="prevLesson()" class="lekcija spacing"> Претходна лекција</span> <span @click="backToMenu()" class="lekcija spacing">Назад кон лекции </span>  <span @click="nextLesson()" class="lekcija spacing"> Следна лекција</span></p>
    
            
    </div>
    <back-to-top text="^"></back-to-top>
  </div>
</template>

<script>
import Material from "../assets/json/material.json";
import Predmeti from "../assets/json/predmeti.json";
import vueFlashcard from "./Flashcard.vue";
import BackToTop from "./BackToTop.vue";

export default {
  name: "Home",
  props: {
    msg: String
  },
  data() {
    return {
      material: Material,
      predmeti: Predmeti,
      showMenu: false,
      showSubjects: true,
      openedSubject: null,
      showLesson: false,
      openedLesson: null,
      openedLessonName: null,
      openedLessonUseful: null,
      keys: null,
      showDef: [],
      toggleSwitch: false,
      wholeLesson: []
    };
  },
  components: {
    vueFlashcard,
    BackToTop
  },
  computed: {
    // a computed getter
    selectedSubject: function() {
      // `this` points to the vm instance
      return this.material.filter(item => item.id == this.openedSubject);
    },

    selectedLesson: function() {
      // `this` points to the vm instance

      for (var i = 0; i < this.selectedSubject[0].everything.length; i++) {
        if (
          this.selectedSubject[0].everything[i].usefulid ==
          this.openedLessonUseful
        ) {
          return this.selectedSubject[0].everything[i];
        }
      }
    }
  },

  mounted: function() {
    // console.log(this.chapters)

    this.keys = Object.keys(this.material[0]);
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },

    openLesson(id) {
      this.showMenu = false;
      // this.openedLesson = lekcija.lessonid;
      this.openedLessonUseful = id;
      this.showLesson = true;
      this.scrollToTop();
      // this.openedLessonName = lekcija.name;
    },
    openSubject(id) {
      this.showSubjects = false;
      this.showMenu = true;
      // this.openedLesson = lekcija.lessonid;
      this.openedSubject = id;
      this.scrollToTop();
      // this.openedLessonName = lekcija.name;
    },

    resetToggle() {
      this.toggleSwitch = false;
    },
    backToMenu() {
      this.showLesson = false;
      this.showMenu = true;
      this.openedLesson = null;
      this.openedLessonName = null;
      this.openedLessonUseful = null;
    },
    backToMain() {
      this.showLesson = false;
      this.showMenu = false;
      this.openedLesson = null;
      this.openedLessonName = null;
      this.openedLessonUseful = null;
      this.selectedSubject = [];
      this.selectedLesson = [];
      this.showSubjects = true;
    },

    nextLesson() {
      let last = this.selectedSubject[0].kolkupredavanja;
      this.resetToggle();

      if (Number(this.openedLessonUseful) < last)
        this.openLesson(String(Number(this.openedLessonUseful) + 1));
      else this.openLesson(this.openedLessonUseful);
    },
    prevLesson() {
      if (Number(this.openedLessonUseful) > 1)
        this.openLesson(String(Number(this.openedLessonUseful) - 1));
      else this.openLesson(this.openedLessonUseful);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.predavanje {
  color: black;
  font-style: italic;
  font-size: 16px;
}
.center-align {
  text-align: center;
}
body {
  margin: 0;
  padding: 0;
}
.lekcija {
  font-size: 14px;
  text-decoration: underline;
  color: rgb(9, 105, 150);
  cursor: pointer;
  font-weight: 600;
  display: inline-block;
}

.term {
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
  color: rgb(23, 146, 70);
}
.spacing {
  margin: 5px;
}
</style>
