import {
    observable,
    configure,
    action,
    computed
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
    @observable currentTime = Math.floor(this._audio.currentTime);
    // 是否播放音乐
    @observable audioPlay = false;
    // 播放模式
    @observable playMode = true;
    // 音乐详情页面是否展开
    @observable detailMark = false;
    // 音乐播放列表是否展开
    @observable listMark = false;
    // 音乐播放列表  mobx 将playList转换成了proxy
    @observable playList = (localStorage[SONG_LIST_KEY] && JSON.parse(localStorage[SONG_LIST_KEY])) || [];
    // 音乐列表长度
    @observable playListLength = (localStorage[SONG_LIST_KEY] && JSON.parse(localStorage[SONG_LIST_KEY]).length) || false;
    // 是否显示音乐播放组件
    @observable musicMark = this.playListLength;

    // 获取音乐播放百分比
    @computed get percent() {
        if (this.duration) {
            return this.currentTime / this.duration * 100;
        } else {
            return 0;
        }
    }

    // 删除音乐操作
    @action.bound deleteMusic(e, id, index) {
        e && e.stopPropagation();
        if (id && this.playListLength !== 1) {

            this.playList[index].current ? this.playList[(index + 1) % (this.playListLength)].current = true : '';
            // 删除单个
            this.playListLength--;

            this.playList = this.playList.filter(p => p.id !== id);

            // localStorage[SONG_LIST_KEY] = JSON.stringify(this.playList);

            console.log(this.playList);


        } else {
            // 清空
            this.playList = [];
            this.playListLength = 0;
            this.musicMark = false;
            this.detailMark = false;
            this.listMark = false;
            localStorage.removeItem(SONG_LIST_KEY);
        }
    }

    // 音乐切换事件
    @action.bound musicSwitchHandler(mode) {

        const index = this.playList.findIndex(p => p.current === true);
        // 获取下一首或上一首的索引
        const nextIndex = ((index + (mode === 'next' ? 1 : -1)) % this.playListLength) < 0 ? this.playListLength - 1 : (index + (mode === 'next' ? 1 : -1)) % this.playListLength;

        localStorage[AUDIO_URL_KEY] = this.playList[nextIndex].url;

        this.playList[index].current = false;

        this.playList[nextIndex].current = true;

        localStorage[SONG_LIST_KEY] = JSON.stringify(this.playList);

        this.setAudioUrl();

        this.setDuration();

        this.clickPlayMusic();
    }

    // 获取id点击事件
    @action.bound onClickSongListId(currentId, e, listId = []) {
        // 阻止冒泡到原生事件上面
        e && e.nativeEvent.stopImmediatePropagation();

        // 用来更新歌曲数据
        this.playListHandler(listId, currentId);

    }

    // 获取音乐播放列表
    @action.bound async playListHandler(listId, currentId) {
        const mork = this.playList.some(p => p.id === currentId);

        if (!mork) {
            const strId = listId.join(',');

            const { songs } = await API.get('/song/detail', { ids: strId });

            // api接口缺陷
            // const { data } = await API.get('/song/url', { id: strId });

            localStorage[AUDIO_URL_KEY] = `https://music.163.com/song/media/outer/url?id=${currentId}.mp3`;

            // 给playList添加当前播放歌曲标记与url mobx自动转换成了proxy
            this.playList = songs.map(p => ({
                ...p,
                current: p.id === currentId ? true : false,
                url: `https://music.163.com/song/media/outer/url?id=${p.id}.mp3`
            }));

            this.playListLength = songs.length;
            !!this.playListLength && (this.musicMark = true);

            console.log('1', this.playList);

            localStorage[SONG_LIST_KEY] = JSON.stringify(this.playList);

        } else {
            const currentSong = this.playList.find(p => p.id === currentId);

            localStorage[AUDIO_URL_KEY] = currentSong.url;

            this.playList.find(p => p.current === true).current = false;

            currentSong.current = true;

            localStorage[SONG_LIST_KEY] = JSON.stringify(this.playList);

            console.log('2', this.playList);

        }

        this.setAudioUrl();

        this.setDuration();

        this.clickPlayMusic();
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
            if (this.playMode) {
                this.musicSwitchHandler('next');
            } else {
                this.currentTime = 0;
                this.audioPlay = true;
                this._audio.play();
            }
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
            this.currentTime = Math.floor(this._audio.currentTime);
        }
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
            this.duration = Math.floor(this._audio.duration);
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