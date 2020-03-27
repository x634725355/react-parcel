import React, { Component } from "react";
import { List, AutoSizer, WindowScroller } from "react-virtualized";
import { observer } from "mobx-react";

import { Sticky } from "../../components/Sticky";
import { MyPlayStore } from "../MyPlayStore/MyPlayStore";

import './index.less';

@observer
export default class SongBook extends Component {


    static contextType = MyPlayStore;

    // 可以优化
    rowRenderer(onClickSongListId, tracks, { key, index, style }) {
        return (
            <div key={key} style={style} onClick={(e) => { onClickSongListId(tracks[index].id, e, tracks); this.forceUpdate(); }} >
                <div className="songbook-item">
                    <div className="songbook-item-index">
                        {this.context.playId == tracks[index].id ? (
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#iconbofangzhong"></use>
                            </svg>
                        ) : index + 1}

                    </div>
                    <div className="songbook-item-songname">
                        <p>{tracks[index].name}{tracks[index].alia.length ? `(${tracks[index].alia.join('/')})` : ''}</p>
                        <p>{tracks[index].ar.map(p => p.name).join('/')} - {tracks[index].al.name}</p>
                    </div>
                    <div className="songbook-item-icon">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconyinle-bofang"></use>
                        </svg>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconshenglve"></use>
                        </svg>
                    </div>
                </div>
            </div>
        )
    }

    renderSongBookMain(onClickSongListId, tracks) {
        return (
            <WindowScroller>
                {({ height, isScrolling, scrollTop }) => (
                    <AutoSizer>
                        {({ width }) => (
                            <>
                                <List

                                    style={{ backgroundColor: '#fff' }}
                                    autoHeight
                                    isScrolling={isScrolling}
                                    scrollTop={scrollTop}
                                    width={width}
                                    height={height}
                                    rowCount={tracks.length}
                                    rowHeight={45}
                                    rowRenderer={this.rowRenderer.bind(this, onClickSongListId, tracks)}
                                />
                                <div style={{ height: 50, width: 100 }}></div>
                            </>
                        )}
                    </AutoSizer>
                )}
            </WindowScroller>
        )
    }

    render() {
        const { songListData: { tracks = [], subscribedCount } } = this.props;
        const { onClickSongListId } = this.context;
        return (
            <div className="songbook-main" >
                {
                    tracks.length &&
                    <div>
                        <Sticky>
                            <div className="songbook-main-top">
                                <div className="main-top-left">
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#iconyinle-bofang"></use>
                                    </svg>
                                    <span>播放全部<i>共({tracks.length})首</i></span>
                                </div>
                                {!!subscribedCount && (
                                    <div className="main-top-right">
                                        <span>+</span>
                                        <span>收藏({subscribedCount})</span>
                                    </div>
                                )}

                            </div>
                        </Sticky>


                        <div className="songbook-main-middle">
                            {this.renderSongBookMain(onClickSongListId, tracks)}
                        </div>
                    </div>
                }

            </div>
        );
    }

}
