<template>
    <div class="progress">
        <span>00:00</span>
        <div class="input">
            <div class="progressbar">
                <div class="thumb"></div>
            </div>
        </div>
        <span>01:00</span>
    </div>
</template>

<script lang="ts">
import { onMounted } from "vue";

let progress: HTMLDivElement | null;
let bar: HTMLDivElement | null;
let thumb: HTMLDivElement | null;

onMounted(() => {
    progress = document.querySelector('.progressbar');
    bar = document.querySelector('.input');
    thumb = document.querySelector('.thumb');
});

bar?.addEventListener('click', e => {
    if (progress != null) {
        console.log('inside');

        const barwidth = Number(getComputedStyle(bar).width.slice(0, -2));
        let realw = e.clientX - (document.body.clientWidth - Math.round(barwidth)) / 2;
        if (realw > e.clientX) realw = 0;
        progress.style.width = `${realw}px`;
        progress?.addEventListener('mouseover', () => {
            if (thumb != null)
                thumb.style.transform = `translateX(${realw - 3}%)`;
        });
    }
});

</script>
<style>
.input {
    display: flex;
    /* overflow: auto; */
    width: 75vw;
    height: 5px;
    background: #fff;
    border-radius: 100vmax;
}

.thumb {
    width: 10px;
    height: 10px;
    border-radius: 100vmax;
    background-color: red;
    /* overflow: visible; */
    margin-top: -2px;
    transform: translateX(calc(100px - 3px));
    display: none;
}


.progressbar {
    height: 5px;
    width: 100px;
    background: linear-gradient(to right, #e66465, #9198e5);
    border-radius: 100vmax;
}

.progressbar:hover .thumb {
    display: block;
}
</style>