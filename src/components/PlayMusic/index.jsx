import React, { Component } from "react";
import { observer } from 'mobx-react';
import { MyPlayStore } from "../MyPlayStore/MyPlayStore";

import { ProgressCircle } from "../ProgressCircle";

import './index.less';

@observer
export class PlayMusic extends Component {

    static contextType = MyPlayStore;

    componentDidMount() {
        this.setStore();
    }

    componentWillUnmount() {
        this.context.untieMusicHandle();
    }

    // 绑定音乐状态事件 
    setStore() {
        const store = this.context;

        store.setAudioUrl(); // 获取音频

        store.setDuration(); // 获取音频总时间

        store.timeUpData(); // 更新音乐播放位置

        store.ended(); // 音乐结束事件
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (nextState.songData === this.state.songData) return false;
    //     return true;
    // }

    render() {
        const { clickPlayMusic, audioPlay, onClickHandle, playList } = this.context;
        const { name, al = [], ar = [], alia = [] } = playList.find(p => p.current === true);
        return (
            <div className="play-music">
                <div className="common-mode">
                    <div className="mode-left">
                        <img src={al.picUrl} alt="" />
                        <div className="mode-left-introduction">
                            <p>{name}{alia.length ? `(${alia.join('/')})` : ''}</p>
                            <p>{ar.map(p => p.name).join('/')}</p>
                        </div>
                    </div>
                    <div className="mode-right">
                        <div onClick={(e) => clickPlayMusic(e)} className="mode-right-progress">
                            <ProgressCircle></ProgressCircle>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={audioPlay ? "#iconpcduanbizhixiazaicishutubiao1" : "#iconyinle-bofang"}></use>
                            </svg>
                        </div>
                        <svg onClick={(e) => onClickHandle("listMark", e)} className="icon mode-right-list" aria-hidden="true">
                            <use xlinkHref="#iconlist"></use>
                        </svg>
                    </div>
                </div>
            </div >
        )
    }
}
