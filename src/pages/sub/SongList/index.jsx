import React, { Component } from "react";

import { TopNav } from "../../../components/TopNav";

import { API } from "../../../utils/fetchAPI";

import './index.less'

export class SongList extends Component {

    state = {
        songListData: [],
        songListId: []
    }

    componentDidMount() {
        this.getSongListData();
    }

    async getSongListData() {
        const { id } = this.props.match.params;

        const { playlist } = await API.get('/playlist/detail', { id });

        this.setState({
            songListData: playlist,
            songListId: playlist.tracks.map(p => p.id)
        });

        console.log(playlist);

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

        return (
            <div className="recommend-sonlist">
                <TopNav>歌单</TopNav>
                {this.renderRreator()}
            </div>
        );
    }
}