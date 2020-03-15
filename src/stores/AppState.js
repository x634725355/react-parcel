import {
    observable,
    configure,
    action,
    computed
} from 'mobx';
import { AUDIO_URL_KEY } from '../utils/share';

// 严格模式
configure({
    enforeActions: ''
});

export default class AppState {
   
    // 创建一个音频对象
    @observable _audio = new Audio();
    // 当前音频的url
    @observable audioUrl = localStorage[AUDIO_URL_KEY];
    // 音频的总时长
    @observable duration = 0;
    // 当前的播放时长
    @observable currentTime = 0;
    // 是否播放音乐
    @observable audioPlay = false;
    
    
    // 获取当前音频的url
    @action setAudioUrl() {
        this.audioPlay = localStorage[AUDIO_URL_KEY];
    }

    // 获取到当前音频的总时长
    @action async setDuration() {
        this._audio.src = this.audioUrl;
        await this._audio.play();
        await this._audio.pause();
        this.duration = this._audio.duration;
    }

    @action clickPlayMusic() {
        this.audioPlay = !this.audioPlay; 

        this.audioPlay ? this._audio.play() : this._audio.pause();
    }
}