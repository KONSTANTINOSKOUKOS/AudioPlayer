<template>
    <form>
        <input placeholder="Βρείτε τραγούδια και playlist με youtube link ή αναζήτηση" v-model="term" type="text" id="search">
        <button @click.prevent="searchh"
            type="submit"><i class="bi-search"></i></button>
    </form>
</template>
<script lang='ts' setup>
import { state, reset } from '../state';
import { ref } from "vue";
import axios from 'axios';
const term = ref('');

const searchh = async () => {
    if (term.value == '') return;
    reset();
    state.audio.src = '';//now just reset, later add to playlist and continue playing
    state.loading = true;
    const newstr = term.value.replace(' ', '%20');
    term.value = '';
    const res = await axios.get(`http://localhost:5000/search/${newstr}`);
    state.song = res.data;
    state.progress.max = state.song.duration.seconds.toString();
    reset();
    state.audio.src = `http://localhost:5000/vid.mp4`;
    state.loading = false;
}
</script>

<style scoped>
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
</style>