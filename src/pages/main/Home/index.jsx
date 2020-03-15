import React, { Component } from 'react';

import { Tabs } from 'antd-mobile';

import { PlayMusic } from '../../../components/PlayMusic';
import { Find } from '../../../components/Find';
import { iphoneHeight, AUDIO_URL_KEY } from '../../../utils/share';
import { SONG_ID_KEY } from '../../../utils/share';
import { API } from '../../../utils/fetchAPI';
// 状态管理器
import { MyPlayStore } from '../../../components/MyPlayStore/MyPlayStore';
import { observer } from 'mobx-react';


import './index.less';

const id = localStorage[SONG_ID_KEY];

@observer
export class Home extends Component {
    state = {
        tabs: [
            { title: '我的', sub: '0' },
            { title: '发现', sub: '1' },
            { title: '云村', sub: '2' },
            { title: '视频', sub: '3' },
        ],
        activeTab: 1,
        userData: null,
        swipeable: true,
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

        const { data } = await API.get('/song/url', { id: this.state.songId || id })

        // 将歌曲url保存到本地
        localStorage[AUDIO_URL_KEY] = data[0].url;

        // 更新url
        this.context.setAudioUrl();

        // 更新到状态管理器
        this.context.setDuration();

        this.setState({ songData: { ...songs[0], url: data[0].url } });
    }

    changeSwipeable(swipeable) {
        this.setState({ swipeable });
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
        const { tabs, activeTab, swipeable, songData } = this.state;

        return (
            <div className="home" style={{ height: iphoneHeight }} >

                <div className="menu iconfont iconliebiao">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#iconliebiao"></use>
                    </svg>
                </div>
                <div className="search iconfont iconsousuo">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#iconsousuo"></use>
                    </svg>
                </div>
                <Tabs tabs={tabs}
                    initialPage={activeTab}
                    tabBarUnderlineStyle={{ border: "none" }}
                    swipeable={swipeable}
                    useOnPan={false}
                >
                    <div className="tabs-item" >
                        Content of first tab
                    </div>
                    <div className="tabs-item" >
                        <Find onClickSongId={this.onClickSongId.bind(this)} onWiperChange={this.changeSwipeable.bind(this)} ></Find>
                    </div>
                    <div className="tabs-item" >
                        Content of third tab
                    </div>
                    <div className="tabs-item" >
                        Content of third tab
                    </div>
                </Tabs>

                {localStorage[SONG_ID_KEY] && <PlayMusic songData={songData} ></PlayMusic>}
            </div>
        );
    }
}