import { reactive } from "vue";

export interface ISong {
    title: string,
    author: string,
    image: string,
    duration: {
        seconds: number,
        timestamp: string
    },
    id: string
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
    const newarr = state.playlist;
    for (let i = 0; i < newarr.length; ++i) {
        if (newarr[i] == state.song)
            continue;
        const rand = Math.floor(Math.random() * newarr.length);
        [newarr[i], newarr[rand]] = [newarr[rand], newarr[i]];
    }
    state.playlist = newarr;
};

export function back() {
    reset();
    state.song = state.playlist[state.playlist.indexOf(state.song) - 1];
    loadsong();
    toggle();
};

export function next() {
    reset();
    state.song = state.playlist[state.playlist.indexOf(state.song) + 1];
    loadsong();
    toggle();
};

export const reset = () => {
    again();
    state.audio.pause();
}
export const remove = (song: ISong) => {
    state.playlist.splice(state.playlist.indexOf(song), 1);
    state.playlist.splice(state.playlist.indexOf(song), 1);
}