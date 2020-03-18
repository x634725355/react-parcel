import {
    observable,
    configure,
    action,
    computed,
    flow
} from 'mobx';
import {
    AUDIO_URL_KEY, SONG_LIST_KEY
} from '../utils/share';
import { API } from '../utils/fetchAPI';

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
    // 音乐详情页面是否展开
    @observable detailMark = false;
    // 音乐播放列表是否展开
    @observable listMark = false;
    // 音乐播放列表
    @observable playList = (localStorage[SONG_LIST_KEY] && JSON.parse(localStorage[SONG_LIST_KEY])) || [];


    // 音乐切换事件
    @action.bound musicSwitchHandler() {

    }

    // 获取id点击事件
    @action.bound onClickSongListId(e, listId, currentId) {
        // 阻止冒泡到原生事件上面
        e.nativeEvent.stopImmediatePropagation();

        // 用来更新歌曲数据
        this.playListHandler(listId, currentId);

        this.setAudioUrl();

        this.setDuration();

        this.clickPlayMusic();
    }

    // 获取音乐播放列表
    @action.bound async playListHandler(listId, currentId) {
        const mork = this.playList.every(p => p.id === currentId);

        if (mork) {
            const strId = listId.join(',');

            const { songs } = await API.get('/song/detail', { ids: strId });

            const { data } = await API.get('/song/url', { id: strId });

            localStorage[AUDIO_URL_KEY] = data.find(p => p.id === currentId).url;

            // 给playList添加当前播放歌曲标记与url mobx自动转换成了proxy
            this.playList = songs.map(p => ({
                ...p,
                current: p.id === currentId ? true : false,
                url: data.find(m => m.id === p.id).url
            }));

            console.log(this.playList);

            localStorage[SONG_LIST_KEY] = JSON.stringify(this.playList);
        } else {
            const currentSong = this.playList.find(p => p.id === currentId);

            localStorage[AUDIO_URL_KEY] = currentSong.url;

            this.playList.find(p => p.current === true).current = false;

            currentSong.current = true;

            localStorage[SONG_LIST_KEY] = JSON.stringify(this.playList);

            console.log(this.playList);
        }
    }

    // 切换播放模式
    @action.bound onSwitchMode() {
        this.playMode = !this.playMode;
    }

    // 音乐详情与列表点击事件
    @action.bound onClickHandle(mark, e) {
        e && e.stopPropagation();
        this[mark] = !this[mark];
    }

    // 播放结束事件
    @action.bound ended() {
        this._audio.onended = () => {
            this.currentTime = 0;
            this._audio.play();
        }
        // this._audio.addEventListener('ended', () => {
        // })
    }

    // 播放事件出错
    @action.bound audioError() {
        this._audio.addEventListener('error', () => {
            console.log('出错了');
            Toast.info('播放错误，自动跳到下一首', 2, null, false);
        });
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

        this._audio.src = this.audioUrl;

        this.audioPlay = false;
    }

    // 获取到当前音频的总时长
    @action.bound setDuration() {
        this._audio.ondurationchange = () => {
            this.duration = Math.ceil(this._audio.duration);
        }
        // 这里 -> 魔幻的代码 
        // await this._audio.play();
        // this._audio.pause();
    }

    // 解绑durationchange事件
    @action.bound untieDurationchange() {
        this._audio.ondurationchange = null;
    }

    // 音乐是否播放
    @action.bound clickPlayMusic(e) {
        e && e.stopPropagation();
        this.audioPlay = !this.audioPlay;

        this.audioPlay ? this._audio.play() : this._audio.pause();
    }

    // 音乐组件卸载时解绑
    @action.bound untieMusicHandle() {
        this._audio.ondurationchange = null;
        this._audio.ontimeupdate = null;
        this._audio.onended = null;
    }
}