import React, { Component } from "react";
import { observer } from 'mobx-react';
import { MyPlayStore } from "../MyPlayStore/MyPlayStore";

import { ProgressCircle } from "../ProgressCircle";

import './index.less';

@observer
export class PlayMusic extends Component {

    state = {
        songData: {},
        audio: React.createRef()
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

    setStore() {
        const store = this.context;
        store.setDuration();
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (nextState.songData === this.state.songData) return false;
    //     return true;
    // }

    render() {
        const { songData: { name, url, al = [], ar = [], tns = [] }, audio } = this.state;
        return (
            <MyPlayStore.Consumer>
                {({ clickPlayMusic }) => (
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
                                <div onClick={() => clickPlayMusic()} className="mode-right-progress">
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
                )}
            </MyPlayStore.Consumer>
        )
    }
}