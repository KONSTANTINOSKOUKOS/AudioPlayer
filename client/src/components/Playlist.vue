<template>
    <div style="overflow:auto;">
        <SearchBar />
        <ul>
            <li v-for="song in state.playlist" :key="Math.random()">
                <div @click="assign(song)" class="img"></div>
                <h2 :class="song == state.song ? 'playing' : ''" @click="assign(song)">{{ song.title }}</h2>
                <p :class="song == state.song ? 'playing' : ''" @click="assign(song)">{{ song.author }}</p>
                <button @click="remove(song)">❌</button>
            </li>
        </ul>
        <MiniPlayer v-if="state.hassong" />
    </div>
</template>
<script lang="ts" setup>
import axios from "axios";
import { onMounted } from "vue";
import { state, loadsong, remove, reset, shuffle, toggle } from "../state";
import type { ISong } from '../state';
import MiniPlayer from "./MiniPlayer.vue";
import SearchBar from "./SearchBar.vue";

onMounted(() => {
    for (let i = 0; i < 8; i++) {
        if (i % 2 == 0)
            state.playlist.push({
                title: 'RICKROLL',
                author: 'rick',
                image: 'noice',
                duration: {
                    seconds: 212,
                    timestamp: '3:32'
                },
                id: 'rickroll'
            });
        else
            state.playlist.push({
                title: 'NOICE',
                author: 'noicer',
                duration: {
                    seconds: 69,
                    timestamp: '1:09'
                },
                image: '',
                id: 'noice'
            });
    }
    // shuffle();
});

const assign = async (song: ISong) => {
    reset();
    state.audio.src = '';
    state.song = song;
    console.log(state.song);
    axios.get(`http://localhost:5000/convert/${song.id}`).then(() => {
        state.audio.src = 'http://localhost:5000/vidd.mp4';
    });
    loadsong();
    state.hassong = true;
    toggle();
}
</script>

<style scoped>
ul {
    padding: 0;
}

.img {
    margin: .25rem 0;
    margin-left: 1rem;
    cursor: pointer;
    width: 3.5rem;
    height: 3.5rem;
    background-color: blue;
}

li {
    list-style-type: none;
    display: flex;
    align-items: center;
    margin: .5rem .7rem;
    background-color: rgba(255, 255, 255, .5);
    border-radius: 20px;
}

li:hover {
    background-color: rgba(0, 0, 0, .08);
}

h2,
p {
    margin: 0 auto;
    cursor: pointer;
}

ul {
    margin: calc(1.2em + 2.2rem) 0;
    overflow: hidden;
}

button {
    background: transparent;
    border: 0;
    font-size: 1.5em;
    cursor: pointer;
    z-index: 9999;
}

.playing {
    background-color: brown;
    font-weight: bold;
    color: lime;
}
</style>