<template>
    <div>
        <div @click="isToggle=!isToggle" v-bind:style="{backgroundColor: colorFront, color: colorTextFront}" v-show="!isToggle" class="animated flipInX flashcard">
            <div class="card-header"> {{headerFront}} </div>
            <div class="card-content center">
                <span v-bind:class="[{dot:true}, importance]"></span><span v-html="front" v-bind:style="{fontSize: textSizeFront,fontWeight: 'bold'}"></span>
                <img v-if="imgFront!=''" :src="imgFront">
            </div>
            <div class="card-footer">{{footerFront}}</div>
        </div>
        <div @click="isToggle=!isToggle" v-bind:style="{backgroundColor: colorBack, color: colorTextBack}" v-show="isToggle" class="animated flipInX flashcard">
            <div class="card-header"> {{headerBack}}</div>
            <div class="card-content left">
                <p v-html="back" v-bind:style="{fontSize: textSizeBack, fontWeight: 'bold'}"></p>
                <img class="center-margin img-back" v-if="imgBack!=''" :src="imgBack">
            </div>
            <div class="card-footer">{{footerBack}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isToggle: false,
        }
    }, props: {
        imgFront: {
            type: String,
            default: ''
        },
        imgBack: {
            type: String,
            default: ''
        },
        front: {
            type: String,
            default: ''
        },
        back: {
            type: String,
            default: ''
        },
        textSizeFront: {
            type: String,
            default: '2em'
        },
        textSizeBack: {
            type: String,
            default: '2em'
        },
        colorTextFront: {
            type: String,
            default: 'black'
        },
        colorTextBack: {
            type: String,
            default: 'black'
        },
        colorFront: {
            type: String,
            default: 'white'
        },
        colorBack: {
            type: String,
            default: '#e4f0f9'
        },
        headerFront: {
            type: String,
            default: 'Do you know?'
        },
        headerBack: {
            type: String,
            default: 'Answer'
        },
        footerFront: {
            type: String,
            default: 'Click to show Back'
        },
        footerBack: {
            type: String,
            default: 'Click to show Front'
        },
        importance: {
            type: String,
            default: 'low'
        }


    }
}
</script>
<style scoped>
.dot {
    height: 7px;
  width: 7px;
  
  border-radius: 50%;
  display: inline-block;
  margin: 7px 8px 3px 5px;
}
.center {
    text-align: center;
}
.low {
    background-color:green;
}
.mid {
    background-color:goldenrod;
}
.high {
    background-color:#cc0011;
}
.none {
    background-color: none;
}
.left {
    text-align: left;
}

.img-back {
    max-width:80%;
}

.center-margin {
    margin-left: auto;
    margin-right: auto;
    display: block;
}
.flashcard {
    cursor: pointer;
    border-radius: 10px;
    margin: 20px;
    padding: 25px;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
}

.flashcard:hover {
    box-shadow: 0 0px 25px rgba(0, 0, 0, 0.3);
}

.animated {
    animation-duration: 0.7s;
    animation-fill-mode: both;
}
.card-header {
    padding-bottom: 15px;
}

.card-footer {
    margin-top: 15px;
}

.card-header, .card-footer {
    color:rgba(0, 0, 0, 0.5);
    font-size: 0.7em;
}
@keyframes flipInX {
    from {
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        animation-timing-function: ease-in;
        opacity: 0;
    }
    40% {
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        animation-timing-function: ease-in;
    }
    60% {
        transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        opacity: 1;
    }
    80% {
        transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }
    to {
        transform: perspective(400px);
    }
}

.flipInX {
    backface-visibility: visible !important;
    animation-name: flipInX;
}
</style>
