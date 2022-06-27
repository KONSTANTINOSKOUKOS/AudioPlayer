<template>
  <audio src=""></audio>
  <form>
    <input v-model="search" type="text" id="search">
    <button @click.prevent="searchh" type="submit">SEARCH</button>
  </form>

  <div class="player">
    <div class="info">
      <img :src="song.image">
      <h1>{{ song.title }}</h1>
      <h3 style="text-align: center;">{{ song.author }}</h3>
    </div>
    <div class="progress">
      <span>{{ currentt }}</span>
      <input id="progress" :max="song.duration.seconds" value="0" type="range">
      <span>{{ song.duration.timestamp ? song.duration.timestamp : '0:00' }}</span>
    </div>

    <div class="controls">
      <i @click="shuffle" class="bi-shuffle"></i>
      <i @click="back" class="bi-skip-start-fill"></i>
      <i @click="toggle" :class="!playing ? 'bi-play-fill' : 'bi-pause-fill'"></i>
      <i @click="next" class="bi-skip-end-fill"></i>
      <i @click="again" id="rotate" class="bi-arrow-clockwise"></i>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';

let audio: HTMLAudioElement;
let progress: HTMLInputElement;
const playing = ref(false);
const currentt = ref('');
const totalt = ref('');
const search = ref('');
const song = ref({
  title: '',
  author: '',
  image: '',
  duration: {
    seconds: 0,
    timestamp: ''
  }
});

onMounted(() => {
  audio = document.querySelector('audio') as HTMLAudioElement;
  progress = document.querySelector('#progress') as HTMLInputElement;
  currentt.value = format(Number(progress.value));
  loadsong();
  setInterval(() => {
    if (playing.value) {
      progress.value = `${Number(progress.value) + 1}`;//progress incrementing
      currentt.value = format(Number(progress.value));//current time set to progress formatted
    }
  }, 1000);
  progress.addEventListener('change', () => {
    audio.currentTime = Number(progress.value);//dragged->change
    currentt.value = format(Number(progress.value));//dragged->change audio time
  })
});

const loadsong = () => {
  if (audio != null) {
    audio.src = '/Rick Astley - Never Gonna Give You Up (Official Music Video).mp3';
    console.log('loaded');
    audio.onloadedmetadata = () => {//loaded song details
      progress.max = Math.round(audio.duration).toString();//max ==duration
      totalt.value = format(Math.round(audio.duration));//label set to max formatted
    }
  }
}

const toggle = () => {
  console.log(audio?.paused);

  if (audio?.paused) {
    audio.play();
    playing.value = true;
  } else {
    audio?.pause();
    playing.value = false;
  }
};
const shuffle = () => {

};
const back = () => {

};
const next = () => {

};
const again = () => {
  progress.value = (0).toString();
  audio.currentTime = 0;
  currentt.value = '0:00';
};
const format = (time: number) => {
  let min = Math.floor(time / 60);
  let sec: number | string = time - (min * 60);
  sec = sec < 10 ? `0${sec}` : sec;
  return `${min}:${sec}`;
}
const searchh = async () => {
  again();
  toggle();
  const newstr = search.value.replace(' ', '%20');
  const res = await axios.get(`http://localhost:5000/${newstr}`);
  song.value.author = res.data.author.name;
  song.value.title = res.data.title;
  song.value.image = res.data.image;
  song.value.duration = res.data.duration;
}
</script>

<style>
@import './assets/base.css';
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css");

*,
*::after,
*:before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

i {
  font-size: 3em;
  color: black;
  cursor: pointer;
}

.bi-play-fill::before,
.bi-pause-fill::before {
  font-size: 1.4em;
  margin: auto 0;
}

.bi-shuffle::before {
  font-size: .95em;
}

.bi-arrow-clockwise::before {
  transform: rotateZ(45deg);
}

/* ////////////////////////////////////////////////////////////////////////////////// */
.player {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.controls {
  width: 50vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.progress {
  display: flex;
  justify-content: center;
  align-items: center;
}

#progress {
  height: 5px;
  width: 75vw;
}

#search {
  width: 70vw;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  width: 45vw;
}

h1 {
  font-size: 2.5em;
}

h3 {
  font-size: 1.5em;
}
</style>

<!-- SONG RESPONSE{
    "type": "video",
    "videoId": "dQw4w9WgXcQ",
    "url": "https://youtube.com/watch?v=dQw4w9WgXcQ",
    "title": "Rick Astley - Never Gonna Give You Up (Official Music Video)",
    "description": "“Never Gonna Give You Up” was a global smash on its release in July 1987, topping the charts in 25 countries including Rick's ...",
    "image": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hq720.jpg",
    "thumbnail": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hq720.jpg",
    "seconds": 213,
    "timestamp": "3:33",
    "duration": {
        "seconds": 213,
        "timestamp": "3:33"
    },
    "ago": "12 years ago",
    "views": 1238068313,
    "author": {
        "name": "Rick Astley",
        "url": "https://youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw"
    }
} -->