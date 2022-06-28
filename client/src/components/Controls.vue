<template>
    <audio src=""></audio>

    <div class="progress">
        <span>{{ format(state.currenttime) }}</span>
        <input id="progress" :max="state.song.duration.seconds" value="0" type="range">
        <span>{{ state.song.duration.timestamp ? state.song.duration.timestamp : '0:00' }}</span>
    </div>
    <div class="controls">
        <i @click="shuffle()" class="bi-shuffle"></i>
        <i @click="back()" class="bi-skip-start-fill"></i>
        <i @click="toggle(audio)" :class="!state.playing ? 'bi-play-fill' : 'bi-pause-fill'"></i>
        <i @click="next()" class="bi-skip-end-fill"></i>
        <i @click="again(audio, progress)" id="rotate" class="bi-arrow-clockwise"></i>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { shuffle, back, toggle, next, again, state, format } from '../state';

let audio: HTMLAudioElement;
let progress: HTMLInputElement;

onMounted(() => {
    progress = document.querySelector('input') as HTMLInputElement;
    audio = document.querySelector('audio') as HTMLAudioElement;
    state.audio = audio;
    state.progress = progress;
});
</script>
<style scoped>
</style>