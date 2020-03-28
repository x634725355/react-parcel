import React, { Component } from "react";

import { TopNav } from "../../../components/TopNav";
import SongBook from "../../../components/Songbook";

import { API } from "../../../utils/fetchAPI";

import './index.less'
import mei from '../../../assets/images/timg.jfif';

export class RecommendedDaily extends Component {

    state = {
        songListData: []
    }

    componentDidMount() {
        this.getRecommendDaily();
    }

    dateFormat() {
        const dt = new Date();
        const m = (dt.getMonth() + 1 + '').padStart(2, '0')
        const d = (dt.getDate() + '').padStart(2, '0')
        return `${d}/${m}`;
    }

    async getRecommendDaily() {
        const { recommend } = await API.get('/recommend/songs');

        console.log(recommend);

        const newAry = recommend.map(p => ({ ...p, alia: p.alias, ar: p.artists, al: p.album }));

        this.setState({ songListData: { tracks: newAry } }, () => console.log(this.state.songListData));
    }


    render() {
        const { songListData } = this.state;
        return (
            <div className="recommend-daily">
                <div className="recommend-daily-topnav">
                    <TopNav>每日推荐</TopNav>
                </div>

                <div className="recommend-daily-header">
                    <img src={mei} alt="" />
                    <div className="daily-header-time">
                        {this.dateFormat()}
                    </div>
                </div>

                {/* 渲染主体部分 */}
                <SongBook songListData={songListData}></SongBook>
            </div>
        );
    }
}