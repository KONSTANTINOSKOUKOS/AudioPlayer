<template>
    <ul>
        <li v-for="a in 3">
            <div class="img"></div>
            <h2>Never Gonna Give You Up</h2>
            <p>Rick Astley</p>
        </li>
    </ul>

</template>
<script lang="ts" setup>
import { state } from "../state";
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
</style>