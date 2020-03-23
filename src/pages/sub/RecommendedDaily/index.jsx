import React, { Component } from "react";

import { TopNav } from "../../../components/TopNav";

import './index.less'
import { API } from "../../../utils/fetchAPI";

export class RecommendedDaily extends Component {

    state = {
        songListData: []
    }

    componentDidMount() {
        this.getRecommendDaily();
    }

    async getRecommendDaily() {
        const res = await API.get("/recommend/songs");
        console.log(res);
    }
    

    render() {
        return (
            <div className="recommend-daily">
                <div className="recommend-daily-topnav">
                    <TopNav>每日推荐</TopNav>
                </div>

                {/* 渲染主体部分 */}
                {/* <SongBook songListData={songListData}></SongBook> */}
            </div>
        );
    }
}