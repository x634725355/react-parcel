import React, { Component } from "react";

import { ProgressCircle } from "../ProgressCircle";

import './index.less';

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
        const { songData: { name, url, al = [], ar = [], tns = [] } } = this.state;
        return (
            <div className="play-music">
                <audio src={url}></audio>
                <div className="common-mode">
                    <div className="mode-left">
                        <img src={al.picUrl} alt="" />
                        <div className="mode-left-introduction">
                            <p>{name}{tns.length ? `(${tns.join('/')})` : ''}</p>
                            <p>{ar.map(p => p.name).join('/')}</p>
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