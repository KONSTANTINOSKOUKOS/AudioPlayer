import { reactive } from "vue";

export interface ISong {
    title: string,
    author: string,
    image: string,
    duration: {
        seconds: number,
        timestamp: string
    },
    id:string
};

export const state = reactive({
    audio: {} as HTMLAudioElement,
    progress: {} as HTMLInputElement,
    song: {} as ISong,
    hassong: false,
    playlist: [] as ISong[],
    playing: false,
    search: '',
    currenttime: '',
    loading: false,
    inplayer: false
});
/////////////////////////////////////////////IMPORTANT!!!!!! audio.onmetadataloaded->loading=false;/////////////////////////////////////
export function toggle() {
    if (state.audio.paused) {
        state.audio.play();
        state.playing = true;
    } else {
        state.audio.pause();
        state.playing = false;
    }
};

export function seek(time: number) {
    console.log(time);

    state.audio.currentTime = time;
}

export function loadsong() {
    if (state.audio != null) {
        // state.audio.src = 'http://localhost:5000/vidd.mp4';
        state.audio.src = '/rickrollvid.mp4';
        console.log('loaded');
        // state.audio.onloadedmetadata = () => {//loaded song details
        //     // state.progress.max = state.song.duration.seconds.toString();//max ==duration
        //     // totalt.value = format(Math.round(audio.duration));//label set to max formatted
        // }
    }

};

export function again() {
    state.progress.value = (0).toString();
    state.audio.currentTime = 0;
    state.currenttime = '0:00';
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
export const reset = () => {
    again();
    state.audio.pause();
}
export const remove = (song: ISong) => {
    state.playlist.splice(state.playlist.indexOf(song), 1);
}