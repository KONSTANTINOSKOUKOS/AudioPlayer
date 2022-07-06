<template>
    <div class="progress">
        <span>{{ state.currenttime }}</span>
        <input id="progress" :max="state.song.duration.seconds" value="0" type="range">
        <span>{{ state.song.duration.timestamp ? state.song.duration.timestamp : '0:00' }}</span>
    </div>
    <div class="controls">
        <i @click="shuffle()" class="bi-shuffle">shuffle</i>
        <i @click="back()" class="bi-skip-start-fill">back</i>
        <i @click="toggle()" :class="!state.playing ? 'bi-play-fill' : 'bi-pause-fill'">{{ !state.playing ? 'play'
                : 'pause'
        }}</i>
        <i @click="next()" class="bi-skip-end-fill">next</i>
        <i @click="again()" class="bi-arrow-clockwise">again</i>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { state, shuffle, back, toggle, next, again, format, loadsong } from '../state';

onMounted(() => {
    state.progress = document.querySelector('input') as HTMLInputElement;

    if (state.audio.src == 'http://localhost:3000/')
        loadsong();

    state.progress.value = state.audio.currentTime.toString();
    state.currenttime = format(Number(state.progress.value));

    const interval = setInterval(() => {
        if (state.playing) {
            state.progress.value = `${Number(state.progress.value) + 1}`;//progress incrementing
            state.currenttime = format(Number(state.progress.value));//current time set to progress formatted
            if (state.progress.value == state.progress.max) state.playing = false;
        }
    }, 1000);

    state.progress.addEventListener('change', () => {
        state.audio.currentTime = Number(state.progress.value);//dragged->change
        state.currenttime = format(Number(state.progress.value));//dragged->change audio time
    });
    onUnmounted(() => clearInterval(interval));
});
</script>

<style scoped>
i {
    color: black;
    cursor: pointer;
}

i:hover {
    background-color: rgba(0, 0, 0, .05);
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

input {
    height: 5px;
    width: 75vw;
}

.progress {
    display: flex;
    align-items: center;
    justify-content: center;
}

.controls {
    width: 50vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
}
</style>