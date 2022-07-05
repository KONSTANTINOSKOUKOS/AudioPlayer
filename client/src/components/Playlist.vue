<template>
    <div style="overflow:auto;">
        <SearchBar />
        <ul>
            <li v-for="song in state.playlist">
                <div class="img"></div>
                <h2 @click="assign(song)">{{ song.title }}</h2>
                <p>{{ song.author }}</p>
                <button>❌</button>
            </li>
        </ul>
        <MiniPlayer v-if="state.hassong" />
    </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { state, loadsong } from "../state";
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
                }
            });
        else
            state.playlist.push({
                title: 'NOICE',
                author: 'noicer',
                duration: {
                    seconds: 69,
                    timestamp: '1:09'
                },
                image: ''
            });
    }
});

const assign = (song: any) => {
    state.song = song;
    console.log(state.song);
    loadsong();
    state.hassong = true;
}
</script>

<style scoped>
.img {
    width: 4rem;
    height: 4rem;
    background-color: blue;
}

li {
    list-style-type: none;
    display: flex;
    align-items: center;
    margin: .5rem 0;
}

li:hover {
    background-color: rgba(0, 0, 0, .08);
    cursor: pointer;
}

h2,
p {
    margin: 0 auto;
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
}
</style>