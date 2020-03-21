import React, { Component } from "react";
import { observer } from "mobx-react";

import { TopNav } from "../../../components/TopNav";
import { SongBook } from "../../../components/Songbook";

import { API } from "../../../utils/fetchAPI";

import './index.less';

@observer
export class SongList extends Component {

    state = {
        songListData: []
    }

    componentDidMount() {
        this.getSongListData();
    }

    async getSongListData() {
        const { id } = this.props.match.params;

        const { playlist } = await API.get('/playlist/detail', { id });

        this.setState({
            songListData: playlist
        });

    }

    renderRreator() {
        const { songListData: { coverImgUrl, description, name, creator } } = this.state;
        return (
            <div className="recommend-sonlist-header">
                <div className="sonlist-header-up">
                    <img className="sonlist-header-up-left" src={coverImgUrl} alt="" />
                    <div className="sonlist-header-up-right">
                        <h3>{name}</h3>
                        <div className="creator">
                            <img src={creator && creator.avatarUrl} alt="" />
                            <span>{creator && creator.nickname}></span>
                        </div>
                        <p>{description}</p>
                    </div>
                </div>
                <div className="sonlist-header-down">
                    {/* 暂时保留 */}
                </div>
            </div>
        );
    }

    render() {
        const { songListData } = this.state;
        return (
            <div className="recommend-sonlist">

                <div className="recommend-sonlist-topnav">
                    <TopNav>歌单</TopNav>
                </div>

                {this.renderRreator()}

                {/* 渲染主体部分 */}
                <SongBook songListData={songListData}></SongBook>
            </div>
        );
    }
}