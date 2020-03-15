import {
    AUDIO_PLAY_KEY
} from "./share";
import React from "react";


const initialState = {
    audio: React.createRef(),
    audioPlay: false
}

export const bus = (() => {
    const { audio: { current: audio }, audioPlay } = initialState;
    const listeners = new Set();

    function audioHandle(eventName, ...params) {
        switch (eventName) {
            case 'AUDIO_PLAY_KEY': {
                audioPlay ? audio.pause() : audio.play();
                break;
            }
            default:
        }
    }
    return {
        getState() {
            return state;
        },
        dispatch(eventName, ...params) {
            audioHandle(eventName, ...params);
            for (const listener of listeners) {
                listener();
            }
        },
        subscribe(listener) {
            listeners.add(listener);
        },
    };
})();