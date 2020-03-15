import React, { Component, useState, useEffect } from "react";

import './index.less';

export function ProgressCircle({ currentTime, duration }) {

    

    // 如果一首歌是195s 360度
    // 每一秒就要转读360 / 195 度
    const [firstSemicircle, setFirstSemicircle] = useState(() => {
        return duration / 2 < currentTime ? 180 : currentTime;
    });
    const [lastSemicircle, setLastSemicircle] = useState(() => {
        
    });

    useEffect(() => {
        console.log(currentTime, duration);
    })


    return (
        <div className="circle">
            <div className="circle-left">
                <div className="circle-left-circle" style={{ transform: `rotate(${135 + lastSemicircle}deg)` }} ></div>
            </div>
            <div className="circle-right">
                <div className="circle-right-circle" style={{ transform: `rotate(${-135 + firstSemicircle}deg)` }} ></div>
            </div>
        </div>
    )

}