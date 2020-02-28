import React, { Component } from "react";

import './index.less';

export class PlayMusic extends Component {
    render() {
        return (
            <div className="play-music">
                <audio src="https://s128.xiami.net/616/83616/2106019320/1816880441_1581561822448_3499.mp3?ccode=xiami_web_web&expire=86400&duration=195&psid=c56f578bf08e1ff38e01dbc989a3f4cb&ups_client_netip=175.155.251.166&ups_ts=1582880424&ups_userid=0&utid=VkHFFX74S1ICAXcFSN3MFA7+&vid=1816880441&fn=1816880441_1581561822448_3499.mp3&vkey=B68700b741dc6c8979f9c1cf846589e3f"></audio>
                <div className="common-mode"></div>
            </div>
        )
    }
}