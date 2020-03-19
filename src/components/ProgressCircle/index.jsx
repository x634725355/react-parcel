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
        const { percent } = this.context;

        if (flag) {
            return 50 < percent ? 180 : 3.6 * percent;
        } else {
            return 50 < percent ? (percent >= 100 ? 180 : 3.6 * (percent-50)) : 0;
        }
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