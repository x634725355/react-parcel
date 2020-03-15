import React, { Component } from "react";
import { observer } from 'mobx-react';
import { MyPlayStore } from "../MyPlayStore/MyPlayStore";

import { ProgressCircle } from "../ProgressCircle";

import './index.less';

@observer
export class PlayMusic extends Component {

    state = {
        songData: {},
    }

    static contextType = MyPlayStore;

    componentDidMount() {

        this.setStore();
    }

    // 用来控制props改变时 影响state
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.songData === prevState.songData) return null;
        return { songData: nextProps.songData };
    }

    async setStore() {
        const store = this.context;
        await store.setDuration();
        console.log(store);
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (nextState.songData === this.state.songData) return false;
    //     return true;
    // }

    render() {
        const { songData: { name, al = [], ar = [], tns = [] } } = this.state;
        const store = this.context;
        return (
            <MyPlayStore.Consumer>
                {({ clickPlayMusic, currentTime, duration }) => (
                    <div className="play-music">
                        <div className="common-mode">
                            <div className="mode-left">
                                <img src={al.picUrl} alt="" />
                                <div className="mode-left-introduction">
                                    <p>{name}{tns.length ? `(${tns.join('/')})` : ''}</p>
                                    <p>{ar.map(p => p.name).join('/')}</p>
                                </div>
                            </div>
                            <div className="mode-right">
                                {/* 注意细节 要bind自己的AppState类 */}
                                <div onClick={clickPlayMusic.bind(store)} className="mode-right-progress">
                                    <ProgressCircle currentTime={currentTime} duration={duration} ></ProgressCircle>
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
                )}
            </MyPlayStore.Consumer>
        )
    }
}