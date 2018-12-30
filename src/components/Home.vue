<template>
<div>
  <div v-if="showSubjects">
    <h1>Одберете предмет</h1>
    <div v-for="(value, key) in predmeti" :key="key">
          <p @click="openSubject(value.id)" class="lekcija" >{{ value.predmet}}</p>
  </div>
  </div>
  <div v-if="showMenu">
    <div v-for="(value, key) in this.selectedSubject" :key="key">
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
    <!-- <a v-for="name, i in filtri" @click="current = i" :key="i" :class="{current:i == current}">{{name}}</a> -->
      <p class="center-align"><span @click="filterImportance = 'any'" v-bind:class="[{ selected: filterImportance == 'any'}, 'spacing', 'filter']">сите</span> <span @click="filterImportance = 'high'" v-bind:class="[{ selected: filterImportance == 'high'}, 'spacing', 'filter']">само црвени</span>  <span @click="filterImportance = 'mid'" v-bind:class="[{ selected: filterImportance == 'mid'}, 'spacing', 'filter']">само жолти</span> <span @click="filterImportance = 'low'" v-bind:class="[{ selected: filterImportance == 'low'}, 'spacing', 'filter']">само зелени</span></p>
<div v-for="(prasanje, k) in selectedLesson.sodrzina" :key="k">
      
                <vue-flashcard v-on:add-to-list="AddToList" v-on:remove-from-list="RemoveFromList" v-if="selectedLesson.sodrzina[k].importance == filterImportance || filterImportance == 'any'"
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
                :main-toggle="toggleSwitch"
                :cardID="selectedLesson.sodrzina[k].id"
                :saved="saved"
                >
                
                </vue-flashcard>


              </div>
          

  
  
      <p class="center-align"><span @click="prevLesson()" class="lekcija spacing"> Претходна лекција</span> <span @click="backToMenu()" class="lekcija spacing">Назад кон лекции </span>  <span @click="nextLesson()" class="lekcija spacing"> Следна лекција</span></p>
    
            
    </div>

    <div v-if="myQuestions">
        <div v-if="saved.length == 0">
              Немаш зачувани прашања. Заврши со учење или уште не почна? :) <br> Кликни на копчето до некое прашање и ќе се појави тука. <br> Корисно е доколку некое прашање не го знаеш да го зачуваш во твоите прашања за да му се навратиш понатаму. <br> Пробај да ја исчистиш листата! <br> <br> <br> Оваа функционалност користи cookies, така што доколку отворите од друг пребарувач или пак ги исчистите cookies-от, ќе исчезне и листата. <br>Така е направено за да не мора да се има user account за да се искористи оваа функционалност.
        </div>
 
      <!-- <p class="center-align"><span @click="prevLesson()" class="lekcija spacing"> Претходна лекција</span> <span @click="backToMenu()" class="lekcija spacing">Назад кон лекции</span>  <span @click="nextLesson()" class="lekcija spacing"> Следна лекција</span></p> -->
    <!-- <a v-for="name, i in filtri" @click="current = i" :key="i" :class="{current:i == current}">{{name}}</a> -->
      <div v-else>
        <h2 class="inline"> Мои прашања по {{this.selectedSubject[0].predmet}}</h2> 
      <p class="center-align"><span @click="filterImportance = 'any'" v-bind:class="[{ selected: filterImportance == 'any'}, 'spacing', 'filter']">сите</span> <span @click="filterImportance = 'high'" v-bind:class="[{ selected: filterImportance == 'high'}, 'spacing', 'filter']">само црвени</span>  <span @click="filterImportance = 'mid'" v-bind:class="[{ selected: filterImportance == 'mid'}, 'spacing', 'filter']">само жолти</span> <span @click="filterImportance = 'low'" v-bind:class="[{ selected: filterImportance == 'low'}, 'spacing', 'filter']">само зелени</span></p>
 <div v-for="(value, key) in this.selectedSubject" :key="key">
    <div v-for="(lekcija,index) in value.everything" :key="index"> 
    
     
<div v-for="(prasanje, k) in lekcija.sodrzina" :key="k">
      
                <vue-flashcard v-on:add-to-list="AddToList" v-on:remove-from-list="RemoveFromList" v-if="saved.includes(lekcija.sodrzina[k].id) && (  lekcija.sodrzina[k].importance == filterImportance || filterImportance == 'any' )"
                :imgBack="lekcija.sodrzina[k].imageback"
                :imgFront="lekcija.sodrzina[k].imagefront" 
                headerFront="Прашање" 
                textSizeFront="1.3em" 
                textSizeBack="1.3em" 
                headerBack="Одговор" 
                footerFront="кликни за да провериш" 
                footerBack="кликни за да затвориш"
                :front="lekcija.sodrzina[k].question" 
                :back="lekcija.sodrzina[k].answer"
                :importance="lekcija.sodrzina[k].importance"
                :main-toggle="toggleSwitch"
                :cardID="lekcija.sodrzina[k].id"
                :saved="saved"
                >
                
                </vue-flashcard>


              </div>
    </div>
</div>

</div>

       <div class="lekcija spacing" @click="backFromMine"> Врати се назад кон предметот </div>   


    </div>
    <back-to-top text="^"></back-to-top>

                    <div v-if='openedSubject && !showSubjects' class="icon-bar">
  <span @click='openMine' class="facebook">Мои</span> 

</div>
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
      saved: [],
      toggleSwitch: false,
      wholeLesson: [],
      filterImportance: 'any',
      current:1,
      filtri:['сите','само црвени','само жолти','само зелени'],
      myQuestions: false
    };
  },
  components: {
    vueFlashcard,
    BackToTop
  },
  computed: {
  


    selectedSubject: {
    // getter
    get: function () {
      if (this.openedSubject){
      return this.material.filter(item => item.id == this.openedSubject);
      }else {
        return null;
      }
    },
    // setter
    set: function (newValue) {
      this.openedSubject = newValue;

       if (localStorage.getItem('saved' + this.openedSubject)) {
      try {
        this.saved = JSON.parse(localStorage.getItem('saved' + this.openedSubject));
      } catch(e) {
        localStorage.removeItem('saved' + this.openedSubject);
      }
    }

    }
  },
   selectedLesson: {
    // getter
    get: function () {
      if (this.selectedSubject[0].everything.length > 0){
      
       for (var i = 0; i < this.selectedSubject[0].everything.length; i++) {
        if (
          this.selectedSubject[0].everything[i].usefulid == this.openedLessonUseful) {
          return this.selectedSubject[0].everything[i];
        }
      }

      }else {
        return null;
      }
    },
    // setter
    set: function (newValue) {
      this.openedLessonUseful = newValue;
    }
  }
    
  },

  mounted: function() {
    // console.log(this.chapters)


    this.keys = Object.keys(this.material[0]);


  },
  methods: {

    AddToList(id){
      this.saved.push(id);
      
      this.saveToStorage();
    },
    RemoveFromList(id){
      this.saved.splice(this.saved.indexOf(id), 1);
      this.saveToStorage();
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },

    openLesson(id) {
      this.showMenu = false;
      // this.openedLesson = lekcija.lessonid;
      this.selectedLesson = id;
      this.showLesson = true;
      this.scrollToTop();
      // this.openedLessonName = lekcija.name;
    },
    openSubject(id) {
      this.showSubjects = false;
      this.showMenu = true;
      // this.openedLesson = lekcija.lessonid;
      this.selectedSubject = id;
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
      this.selectedLesson = null;
    },
    backToMain() {
      this.showLesson = false;
      this.showMenu = false;
      this.openedLesson = null;
      this.openedLessonName = null;
      this.selectedLesson = null;
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
    },
    openMine() {
      this.showLesson = false;
      this.showMenu = false;
      this.openedLesson = null;
      this.openedLessonName = null;
      this.selectedLesson = null;
      this.selectedLesson = [];
      this.showSubjects = false;
      this.myQuestions = true;
    },
    backFromMine(){
      this.showLesson = false;
      this.showMenu = true;
      this.openedLesson = null;
      this.openedLessonName = null;
      this.selectedLesson = null;
      this.selectedLesson = [];
      this.showSubjects = false;
      this.myQuestions = false;
    },
    saveToStorage(){
      const parsed = JSON.stringify(this.saved);
      localStorage.setItem('saved' + this.openedSubject, parsed);
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
  margin: 0 !important;
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

.filter{
  font-size: 12px;
  cursor: pointer;
}

.selected{
  text-decoration: underline;
}


.icon-bar {
  position: fixed;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.icon-bar span {
  display: block;
  text-align: center;
  padding: 8px;
  transition: all 0.3s ease;
  color: white;
  font-size: 20px;
  margin-left: -8px;
  cursor: pointer;
}

.icon-bar span:hover {
  background-color: #000;
}
.facebook {
  background: green;
  color: white;
}



</style>






  