import React, { Component } from "react";
import { Progress } from 'antd-mobile';

import { ProgressCircle } from "../ProgressCircle";

import './index.less';
import niao from "../../assets/images/niao.jpg";



export class PlayMusic extends Component {

    state = {

    }

    render() {
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