import React, { Component } from "react";

import './index.less';

export class ProgressCircle extends Component {
    render() {
        return (
            <div class="circle">
                <div class="circle-left">
                    <div class="circle-left-circle"></div>
                </div>
                <div class="circle-right">
                    <div class="circle-right-circle"></div>
                </div>
            </div>
        )
    }
}