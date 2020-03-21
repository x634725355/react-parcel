import React, { Component } from "react";
import { observer } from "mobx-react";
import { Spring } from "react-spring/renderprops";
import { List, AutoSizer } from "react-virtualized";

import { MyPlayStore } from "../../../components/MyPlayStore/MyPlayStore";

import './index.less';

@observer
export class PlayList extends Component {

    static contextType = MyPlayStore;


    state = {
        like: false
    }

    async markLikeSong() {
        const id = localStorage[SONG_ID_KEY];
        const { code } = await API.get('/like', { id });

        this.setState({ like: !this.state.like });
    }

    // TODO: 点击后无法更新current 解决 使用this.forceUpdate();
    rowRenderer(playList, onClickSongListId, deleteMusic, { key, index, style }) {
        const { id, name } = playList[index];
        return (
            <div key={key} style={style}>
                <div onClick={(e) => { onClickSongListId(id, e); this.forceUpdate(); }} className={["wrapper-middle-item", this.context.playId == id ? "current-blue" : ""].join(' ')}>
                    <div className="middle-item-left">{name}</div>
                    <div onClick={(e) => { this.forceUpdate(); deleteMusic(e, id, index) }} className="middle-item-right">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icondelete2"></use>
                        </svg>
                    </div>
                </div>
            </div >
        )
    }


    renderSongList(playListLength, playList, onClickSongListId, deleteMusic) {
        return (
            <div>
                <AutoSizer>
                    {({ width }) => (
                        <List
                            width={width}
                            height={300}
                            rowCount={playListLength}
                            rowHeight={40}
                            rowRenderer={this.rowRenderer.bind(this, playList, onClickSongListId, deleteMusic)}
                        />
                    )}
                </AutoSizer>
            </div>
        );
    }

    render() {
        const { listMark, onClickHandle, onSwitchMode, playMode, playListLength, playList, onClickSongListId, deleteMusic } = this.context;

        return (
            <div className={["play-music-list", listMark ? "display-block" : "display-none"].join(' ')}>
                <Spring from={{ opacity: 0 }} to={{ opacity: listMark - 0 }} >
                    {props => !!props.opacity && <div style={props} onClick={(e) => onClickHandle('listMark', e)} className="mask" />}
                </Spring>
                <div className="play-list-wrapper">
                    <div className="play-list-wrapper-top">
                        <div className="wrapper-top-left">
                            <svg onClick={() => onSwitchMode()} className="icon" aria-hidden="true">
                                <use xlinkHref={playMode ? "#iconshunxu" : "#icondanqu"}></use>
                            </svg>
                            {playMode ? '顺序播放' : '单曲循环'}({playListLength})
                        </div>
                        <div onClick={(e) => deleteMusic(e)} className="wrapper-top-right">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icontrash"></use>
                            </svg>
                        </div>
                    </div>
                    <div className="play-list-wrapper-middle">
                        <div>
                            {this.renderSongList(playListLength, playList, onClickSongListId, deleteMusic)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}