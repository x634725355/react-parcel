import {
    observable,
    configure,
    action,
    computed
} from 'mobx';
import {
    AUDIO_URL_KEY
} from '../utils/share';

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
    @observable currentTime = Math.ceil(this._audio.currentTime);
    // 是否播放音乐
    @observable audioPlay = false;
    // 播放模式
    @observable playMode = true;



    // 播放结束事件
    @action.bound ended() {
        this._audio.onended = () => {
            this.playMode ? this.audioPlay = false : this._audio.play();
        }
        // this._audio.addEventListener('ended', () => {
        // })
    }

    // 绑定播放位置改变事件 timeupdate
    @action.bound timeUpData() {
        this._audio.ontimeupdate = () => {
            this.currentTime = Math.ceil(this._audio.currentTime);
        }
        // this._audio.addEventListener('timeupdate', () => {
        // });
    }

    // 解除播放位置改变事件 timeupdate 与 播放结束事件
    @action.bound untieTimeUpData() {
        this._audio.ontimeupdate = null;
        this._audio.onended = null;
    }

    // 获取当前音频的url
    @action.bound setAudioUrl() {
        this.audioUrl = localStorage[AUDIO_URL_KEY];

        this.audioPlay = false;
    }

    // 获取到当前音频的总时长
    @action.bound setDuration() {
        this._audio.src = this.audioUrl;
        this._audio.addEventListener('durationchange', () => {
            this.duration = Math.ceil(this._audio.duration);
        });
        // 这里 -> 魔幻的代码 
        // await this._audio.play();
        // this._audio.pause();
    }

    // 解绑durationchange事件
    @action.bound untieDurationchange() {
        this._audio.removeEventListener('durationchange');
    }

    @action.bound clickPlayMusic(e) {
        e.stopPropagation();
        this.audioPlay = !this.audioPlay;

        this.audioPlay ? this._audio.play() : this._audio.pause();
    }
}