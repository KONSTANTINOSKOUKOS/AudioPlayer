<template>
    <div class="wrapper">
        <img src="">
        <div class="down">
            <h4>Never Gonna Give You Up</h4>
            <p>Rick Astley</p>
        </div>
        <i @click="toggle()" :class="!state.playing ? 'bi-play-fill' : 'bi-pause-fill'">{{ !state.playing ? 'play' :
                'pause'
        }}</i>
    </div>
</template>
<script lang='ts' setup>
import { state, toggle } from '../state';
</script>

<style scoped>
.wrapper {
    background-color: chocolate;
    display: flex;
    justify-content: space-between;
}
.down{
    display: flex;
    flex-direction: column;
}
</style>