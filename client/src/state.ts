import { reactive } from "vue";

export const state = reactive({
    audio: {} as HTMLAudioElement,
    progress: {} as HTMLInputElement,
    song: {
        title: '',
        author: '',
        image: '',
        duration: {
            seconds: 0,
            timestamp: ''
        }
    },
    playing: false,
    search: '',
    currenttime: 0,
    loading: false
});

export function toggle(audio: HTMLAudioElement) {
    if (audio.paused) {
        audio.play();
        state.playing = true;
    } else {
        audio.pause();
        state.playing = false;
    }

};

export function loadsong(audio: HTMLAudioElement, progress: HTMLInputElement) {
    if (audio != null) {
        audio.src = '/Rick Astley - Never Gonna Give You Up (Official Music Video).mp3';
        console.log('loaded');
        audio.onloadedmetadata = () => {//loaded song details
            progress.max = state.song.duration.seconds.toString();//max ==duration
            // totalt.value = format(Math.round(audio.duration));//label set to max formatted
        }
    }

};

export function again(audio: HTMLAudioElement, progress: HTMLInputElement) {
    progress.value = (0).toString();
    audio.currentTime = 0;
    state.currenttime = 0;

};

export function format(time: number) {
    let min = Math.floor(time / 60);
    let sec: number | string = time - (min * 60);
    sec = sec < 10 ? `0${sec}` : sec;
    return `${min}:${sec}`;
};

export function shuffle() {

};

export function back() {

};

export function next() {

};