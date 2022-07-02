<template>
    <Spinner style="margin-bottom: 40vh;" v-if="state.loading" />
    <div v-else class="info">
        <img :src="state.song.image">
        <h1>{{ state.song.title }}</h1>
        <h3>{{ state.song.author }}</h3>
    </div>
</template>
<script lang='ts' setup>
import Spinner from './Spinner.vue';
import { state } from '../state';
</script>

<style scoped>
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
</style>