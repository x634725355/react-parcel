import React, { Component, useState, useEffect } from "react";
import { MyPlayStore } from "../MyPlayStore/MyPlayStore";
import { observer } from "mobx-react";

import './index.less';
// { currentTime, duration, UntieTimeUpData, timeUpData }

@observer
export class ProgressCircle extends Component {

    // 如果一首歌是241s 360度
    // 241/2 = 120.5s  180度
    // 每一秒就要转读360 / 241 度
    // const [firstSemicircle, setFirstSemicircle] = useState(() => {
    //     return duration / 2 < currentTime ? 180 : currentTime;
    // });
    // const [lastSemicircle, setLastSemicircle] = useState(() => {

    // });
    static contextType = MyPlayStore;

    // 圆形进度条函数
    Semicircle(flag = true) {
        const { currentTime, duration } = this.context;
        const TimeHalf = duration / 2;

        if (flag) {
            return TimeHalf < currentTime ? 180 : currentTime * 180 / TimeHalf;
        } else {
            return TimeHalf < currentTime ? ((currentTime - TimeHalf) * 180 / TimeHalf >= TimeHalf ? 180 : (currentTime - TimeHalf) * 180 / TimeHalf) : 0;
        }
    }

    componentDidMount() {
        const store = this.context;

        store.timeUpData();
        store.ended();
    }

    componentWillUnmount() {
        const store = this.context;
    }

    render() {
        return (
            <div className="circle">
                <div className="circle-left">
                    <div className="circle-left-circle" style={{ transform: `rotate(${135 + this.Semicircle(false)}deg)` }} ></div>
                </div>
                <div className="circle-right">
                    <div className="circle-right-circle" style={{ transform: `rotate(${-135 + this.Semicircle()}deg)` }} ></div>
                </div>
            </div>
        )
    }



}