<template>
    <div class="wrapper">
        <div class="img"></div>
        <div class="down">
            <h4>Never Gonna Give You Up</h4>
            <p>Rick Astley</p>
        </div>
        <i @click="toggle()" :class="!state.playing ? 'bi-play-fill' : 'bi-pause-fill'">{{ !state.playing ? 'play' :
                'pause'
        }}</i>
    </div>
    <div class="progress">
        <div class="bar"></div>
    </div>
</template>
<script lang='ts' setup>
import { state, toggle, seek, loadsong } from '../state';
import { onMounted } from 'vue';

let progress: HTMLDivElement;
let bar: HTMLDivElement;

onMounted(() => {
    loadsong();
    progress = document.querySelector('.progress') as HTMLDivElement;
    bar = document.querySelector('.bar') as HTMLDivElement;
    let barwidth = 0;
    bar.style.width = `0%`;

    progress.addEventListener('click', e => {
        seek(233 * Number(bar.style.width.slice(0, -1)) / 100);

        const width = Number(getComputedStyle(progress).width.slice(0, -2));
        barwidth = e.clientX - (document.body.clientWidth - Math.round(width)) / 2;

        if (barwidth > e.clientX) barwidth = 0;

        barwidth /= Number(getComputedStyle(progress).width.slice(0, -2));
        barwidth *= 100;

        bar.style.width = `${Math.round(barwidth)}%`;
    });

    setInterval(() => {
        state.playing = true;
        if (state.playing) {
            const a = Number(bar.style.width.slice(0, -1)) + 1;
            bar.style.width = a > 100 ? '100%' : `${a}%`;//stop at 100%
        }

        if (bar.style.width == '100%')
            bar.style.borderBottomRightRadius = '10px';//for styling symmetry
    }, 1000);

    //FOR KEEPING SAME ASPECT
    window.onresize = (e) => {
        bar.style.width = `${Math.round(barwidth)}% `;
    }
});
</script>

<style scoped>
.wrapper {
    height: 4rem;
    max-width: 50vw;
    margin: 0 auto;
    /* border-radius: 10px;
    border-bottom: 4px solid white; */
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: chocolate;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.progress {
    width: 50vw;
    height: 4px;
    background-color: rgb(194, 97, 29);
    margin-left: 25vw;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    /* overflow: hidden; */
}

.bar {
    position: relative;
    width: 50%;
    /* max-width: 50vw; */
    height: 4px;
    background-color: white;
    /* border-bottom-right-radius: 10px; */
    border-bottom-left-radius: 10px;
}

.down {
    display: flex;
    flex-direction: column;
}

.img {
    width: 3rem;
    height: 3rem;
    background-color: white;
}
</style>