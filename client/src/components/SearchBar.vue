<template>
    <form>
        <input v-model="term" type="text" id="search">
        <button placeholder="Βρείτε τραγούδια και playlist με youtube link ή αναζήτηση" @click.prevent="searchh"
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
</style>