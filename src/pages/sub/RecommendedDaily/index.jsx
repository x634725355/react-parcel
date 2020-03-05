import React, { Component } from "react";

import { TopNav } from "../../../components/TopNav";

import './index.less'

export class RecommendedDaily extends Component {
    render() {
        return (
            <div>
                <TopNav></TopNav>
                <div>每日推荐</div>
            </div>
        );
    }
}