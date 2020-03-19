import React, { Component } from "react";
import { observer } from "mobx-react";
import { Spring } from "react-spring/renderprops";
import { List, AutoSizer, WindowScroller, InfiniteLoader } from "react-virtualized";

import { MyPlayStore } from "../../../components/MyPlayStore/MyPlayStore";

import './index.less';

const data = ['A', 'B', 'C', 'D', 'E', 'F', 'A', 'B', 'C',
    'D', 'E', 'F', 'A', 'B', 'C', 'D', 'E', 'F',
    'A', 'B', 'C', 'D', 'E', 'F'];

@observer
export class PlayList extends Component {

    static contextType = MyPlayStore;

    renderSongList() {
        return (
            <div>
                
            </div>
        );
    }

    render() {
        const { listMark, onClickHandle, onSwitchMode, playMode } = this.context;

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
                            {playMode ? '顺序播放' : '单曲循环'}
                        </div>
                        <div className="wrapper-top-right">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icontrash"></use>
                            </svg>
                        </div>
                    </div>
                    <div className="play-list-wrapper-middle">
                        <div>
                            {this.renderSongList.bind(this)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}