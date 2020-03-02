import React, { Component } from "react";

import './index.less';

export function ProgressCircle() {

    // 如果一首歌是195s 360度
    // 每一秒就要转读360/195 度

    return (
        <div className="circle">
            <div className="circle-left">
                <div className="circle-left-circle" style={{transform: `rotate(${135}deg)`}} ></div>
            </div>
            <div className="circle-right">
                <div className="circle-right-circle" style={{transform: `rotate(${-135}deg)`}} ></div>
            </div>
        </div>
    )

}