import React, { Component } from "react";
import { Route } from "react-router-dom";
import { observer } from 'mobx-react';

import { Home } from '../../pages/main/Home';
import { BasicLogin } from '../../pages/sub/Login';
import { RecommendedDaily } from '../../pages/sub/RecommendedDaily';
import { MusicDetails } from "./MusicDetails";
import { PlayMusic } from "../../components/PlayMusic";
import { PlayList } from "./PlayList";
// 状态管理器
import { MyPlayStore } from '../../components/MyPlayStore/MyPlayStore';

import { API } from "../../utils/fetchAPI";
import { SONG_ID_KEY, SONG_DATA_KEY, AUDIO_URL_KEY } from "../../utils/share";

import './index.less'

const id = localStorage[SONG_ID_KEY];

@observer
export class Main extends Component {

    state = {
        songId: '',
        songData: {}
    }

    static contextType = MyPlayStore;

    componentDidMount() {
        !!id && this.getSong();
    }

    // 获取歌曲详情数据
    async getSong() {
        const { songs } = await API.get('/song/detail', { ids: this.state.songId || id });

        const { data } = await API.get('/song/url', { id: this.state.songId || id });

        // 将歌曲url保存到本地
        localStorage[AUDIO_URL_KEY] = data[0].url;

        // 更新url
        this.context.setAudioUrl();

        // 更新到状态管理器
        this.context.setDuration();

        // 更新歌曲数据 并保存在本地
        this.setState({ songData: { ...songs[0], url: data[0].url } }, () => localStorage[SONG_DATA_KEY] = JSON.stringify(this.state.songData));
    }

    // 获取id点击事件
    onClickSongId(e, songId) {
        // 阻止冒泡到原生事件上面
        e.nativeEvent.stopImmediatePropagation();

        // 存储歌曲id到本地
        localStorage[SONG_ID_KEY] = songId;

        // 用来更新歌曲数据
        this.setState({ songId }, () => this.getSong());
    }

    render() {
        const { songData } = this.state;
        const { detailMark, onClickHandle, listMark } = this.context;
        return (
            <div className="box">
                <Route path="/main/home" onClickSongId={this.onClickSongId.bind(this)} component={Home} />
                <Route path="/main/recommended" exact component={RecommendedDaily} />

                <div onClick={() => onClickHandle('detailMark')}>
                    {localStorage[SONG_ID_KEY] && <PlayMusic songData={songData} ></PlayMusic>}
                </div>
                {/* 音乐详情页面 */}
                <div className={detailMark ? "display-block" : "display-none"} >
                    <MusicDetails></MusicDetails>
                </div>
                {/* 音乐列表页面 */}
                <div className={listMark ? "display-block" : "display-none"} >
                    <PlayList></PlayList>
                </div>
            </div>
        )
    }
}