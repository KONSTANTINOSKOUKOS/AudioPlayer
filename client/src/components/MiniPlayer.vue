<template>
    <div v-if="!state.inplayer" class="wrapper">
        <div class="info">
            <div @click="state.inplayer = true;" class="img"></div>
            <div @click="state.inplayer = true;" class="down">
                <h4>{{ state.song.title }}</h4>
                <p>{{ state.song.author }}</p>
            </div>
            <i @click="toggle()">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                    <path
                        :d="!state.playing ? 'm11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z' :
                        'M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z'" />
                </svg></i>
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

        progress.addEventListener('click', e => {
            const width = Number(getComputedStyle(progress).width.slice(0, -2));
            barwidth = e.clientX - (document.body.clientWidth - width) / 2;

            if (barwidth > e.clientX) barwidth = 0;

            barwidth = (barwidth / Number(getComputedStyle(progress).width.slice(0, -2))) * 100;

            bar.style.width = `${barwidth}%`;
            seek(state.song.duration.seconds * Number(bar.style.width.slice(0, -1)) / 100);
        });

        const interval = setInterval(() => {
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
            bar.style.width = `${(state.audio.currentTime / state.song.duration.seconds) * 100}%`;
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
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    background-color: blue;
}

h4 {
    font-weight: bold;
}

i {
    cursor: pointer;
    z-index: 99999999;
}

i:hover {
    background-color: rgba(0, 0, 0, .1);
}
</style>