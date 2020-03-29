import React, { Component, Suspense, lazy } from "react";
import { observer } from "mobx-react";

import { TopNav } from "../../../components/TopNav";
const SongBook = lazy(() => import('../../../components/Songbook'));

import { API } from "../../../utils/fetchAPI";

import './index.less';

// mapkey
const mapKey = ['/playlist/detail', '/album'];
const dataKey = ['playlist', 'songs']

@observer
export class SongList extends Component {

    state = {
        songListData: [],
        albumData: []
    }

    componentDidMount() {
        this.getSongListData();
    }

    async getSongListData() {
        const { id, type } = this.props.match.params;

        const res = await API.get(mapKey[type], { id });

        console.log(res);

        this.setState({
            songListData: type == 1 ? { tracks: res[dataKey[type]] } : res[dataKey[type]],
            albumData: type == 1 ? res.album : []
        });
    }

    renderAlbum() {
        const { albumData: { picUrl, name, artist, publishTime } } = this.state;

        return (
            <div className="recommend-sonlist-header">
                <div className="sonlist-header-up">
                    <img className="sonlist-header-up-left" src={picUrl} alt="" />
                    <div className="sonlist-header-up-right">
                        <h3>{name}</h3>
                        <div className="creator">
                            <img src={artist && artist.picUrl} alt="" />
                            <span>{artist && artist.name}></span>
                        </div>
                        <p>发行时间{publishTime}</p>
                    </div>
                </div>
                <div className="sonlist-header-down">
                    {/* 暂时保留 */}
                </div>
            </div>
        );
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
        const { type } = this.props.match.params;
        return (
            <Suspense fallback={<div>Loading.....</div>} >
                <div className="recommend-sonlist">

                    <div className="recommend-sonlist-topnav">
                        <TopNav> {type == 1 ? '专辑' : '歌单'} </TopNav>
                    </div>

                    {type == 1 ? this.renderAlbum() : this.renderRreator()}

                    {/* 渲染主体部分 */}
                    <SongBook songListData={songListData}></SongBook>

                </div>
            </Suspense>
        );
    }
}