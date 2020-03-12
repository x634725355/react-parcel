import React, { Component } from "react";
import { Progress } from 'antd-mobile';

import { ProgressCircle } from "../ProgressCircle";

import './index.less';
import niao from "../../assets/images/niao.jpg";
import { API } from "../../utils/fetchAPI";
import { SONG_ID_KEY } from "../../utils/share";



export class PlayMusic extends Component {

    state = {
        songData: {}
    }

    // 用来控制props改变时 影响state
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.songData === prevState.songData) return null;
        return { songData: nextProps.songData };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextState.songData === this.state.songData) return false;
        return true;
    }

    render() {
        console.log('更新');
        const { songData } = this.state;
        return (
            <div className="play-music">
                <audio src=""></audio>
                <div className="common-mode">
                    <div className="mode-left">
                        <img src={niao} alt="" />
                        <div className="mode-left-introduction">
                            <p>歌名</p>
                            <p>歌手</p>
                        </div>
                    </div>
                    <div className="mode-right">
                        <div className="mode-right-progress">
                            <ProgressCircle></ProgressCircle>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#iconyinle-bofang"></use>
                            </svg>
                        </div>
                        <svg className="icon mode-right-list" aria-hidden="true">
                            <use xlinkHref="#iconlist"></use>
                        </svg>
                    </div>
                </div>
            </div >
        )
    }
}