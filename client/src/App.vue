<!-- <template>
  <audio src=""></audio>
  <form>
    <input v-model="search" type="text" id="search">
    <button placeholder="Βρείτε τραγούδια και playlist με youtube link ή αναζήτηση" @click.prevent="searchh"
      type="submit"><i class="bi-search"></i></button>
  </form>

  <div class="player">
    <Spinner style="margin-bottom: 40vh;" v-if="loading" />
    <div v-else class="info">
      <img :src="song.image">
      <h1>{{ song.title }}</h1>
      <h3>{{ song.author }}</h3>
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
import Spinner from './components/Spinner.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';

let audio: HTMLAudioElement;
let progress: HTMLInputElement;
const playing = ref(false);
const currentt = ref('');
// const totalt = ref('');
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
const loading = ref(false);

onMounted(() => {
  audio = document.querySelector('audio') as HTMLAudioElement;
  progress = document.querySelector('#progress') as HTMLInputElement;
  currentt.value = format(Number(progress.value));
  setInterval(() => {
    if (playing.value) {
      progress.value = `${Number(progress.value) + 1}`;//progress incrementing
      currentt.value = format(Number(progress.value));//current time set to progress formatted
      if (progress.value == progress.max) playing.value = false;
    }
  }, 1000);

  progress.addEventListener('change', () => {
    audio.currentTime = Number(progress.value);//dragged->change
    currentt.value = format(Number(progress.value));//dragged->change audio time
  });
});

const toggle = () => {
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
const reset = () => {
  again();
  audio.pause();
}
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
  if (search.value == '') return;
  reset();
  audio.src = '';//now just reset, later add to playlist and continue playing
  loading.value = true;
  const newstr = search.value.replace(' ', '%20');
  search.value = '';
  const res = await axios.get(`http://localhost:5000/search/${newstr}`);
  song.value = res.data;
  progress.max = song.value.duration.seconds.toString();
  reset();
  audio.src = `http://localhost:5000/vid.mp4`;
  loading.value = false;
}
</script>

<style scoped>
@import './assets/base.css';
/* @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"); */

*,
*::after,
*:before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

i {
  color: black;
  cursor: pointer;
}

i:hover {
  background-color: rgba(0, 0, 0, .05);
}

.player i {
  font-size: 3em;
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
  /* margin-top: calc(100vh - 10em); */
  /* background: linear-gradient(to top right, #e66465, #9198e5); */
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
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

form {
  display: flex;
  justify-content: center;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 999;
  margin: 1rem calc((100vw - 75vw) / 2);
  border-radius: 100vmax;
}

form>* {
  background-color: white;
  border: 0;
  outline: 0;
  margin: .7rem 1rem;
  font-size: 1.2em;
}

#search {
  width: 70vw;
  color: black;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  width: 50vw;
}

h1,
h3 {
  text-align: center;
}

h1 {
  font-size: 2.5em;
}

h3 {
  font-size: 1.5em;
}
</style> -->

<template>
  <Playlist />
  <MiniPlayer />
  <Controls />
</template>
<script lang="ts" setup>
import MiniPlayer from './components/MiniPlayer.vue';
import Controls from './components/Controls.vue';
import Playlist from './components/Playlist.vue';
</script>