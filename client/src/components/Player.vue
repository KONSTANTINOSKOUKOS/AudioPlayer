<template>
    <button @click="state.inplayer = false;">&UpperLeftArrow;</button>
    <Info />
    <Controls />
</template>
<script lang="ts" setup>
import Controls from './Controls.vue';
import Info from './Info.vue';
import { state } from "../state";
</script>