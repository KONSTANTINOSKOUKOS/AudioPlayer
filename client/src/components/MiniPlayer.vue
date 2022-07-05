<template>
    <div v-if="!state.inplayer" class="wrapper">
        <div class="info">
            <div class="img"></div>
            <div @click="state.inplayer = true;" class="down">
                <h4>{{ state.song.title }}</h4>
                <p>{{ state.song.author }}</p>
            </div>
            <i @click="toggle()" :class="!state.playing ? 'bi-play-fill' : 'bi-pause-fill'">{{ !state.playing ? 'play' :
                    'pause'
            }}</i>
        </div>
        <div class="progress">
            <div class="bar"></div>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { state, toggle, seek } from '../state';
import { onMounted, onUnmounted } from 'vue';

let progress: HTMLDivElement;
let bar: HTMLDivElement;
let barwidth = 0;
onMounted(() => {
    console.log('mounted');
    progress = document.querySelector('.progress') as HTMLDivElement;
    bar = document.querySelector('.bar') as HTMLDivElement;
    if (state.hassong) {
        bar.style.width = `0.000001%`;

        progress.addEventListener('click', e => {
            const width = Number(getComputedStyle(progress).width.slice(0, -2));
            barwidth = e.clientX - (document.body.clientWidth - Math.round(width)) / 2;

            if (barwidth > e.clientX) barwidth = 0;

            barwidth = (barwidth / Number(getComputedStyle(progress).width.slice(0, -2))) * 100;

            bar.style.width = `${Math.round(barwidth)}%`;
            seek(state.song.duration.seconds * Number(bar.style.width.slice(0, -1)) / 100);
        });

        const interval = setInterval(() => {
            console.log('interval');
            if (state.playing) {
                const a = Number(bar.style.width.slice(0, -1)) + (100 / state.song.duration.seconds);
                bar.style.width = a > 100 ? '100%' : `${a}%`;//stop at 100%
            }
            if (bar.style.width == '100%')
                bar.style.borderBottomRightRadius = '10px';//for styling symmetry
        }, 1000);

        onUnmounted(() => clearInterval(interval));
        //FOR KEEPING SAME ASPECT
        window.onresize = (e) => {
            bar.style.width = `${Math.round(barwidth)}%`;
        }
        if (!state.inplayer)
            bar.style.width = `${(state.audio.currentTime / state.song.duration.seconds) * 100}%`;
    }
});

</script>

<style scoped>
.wrapper {
    position: fixed;
    bottom: 5px;
    width: 100vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.info {
    height: 4rem;
    min-width: 50vw;
    margin: 0 auto;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    background-color: chocolate;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.progress {
    width: 50vw;
    height: 4px;
    background-color: rgb(194, 97, 29);
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    /* overflow: hidden; */
}

.bar {
    position: relative;
    width: 0%;
    height: 4px;
    background-color: white;
    border-bottom-left-radius: 10px;
}

.down {
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.img {
    width: 3rem;
    height: 3rem;
    background-color: blue;
}

h4 {
    font-weight: bold;
}

i {
    cursor: pointer;
    z-index: 999;
}

i:hover {
    background-color: rgba(0, 0, 0, .1);
}
</style>