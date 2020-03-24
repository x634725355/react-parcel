import React, { Component } from 'react';
import { Transition } from 'react-spring/renderprops'
import { observer } from 'mobx-react';
import { Progress } from 'antd-mobile';

// 状态管理器
import { MyPlayStore } from '../../../components/MyPlayStore/MyPlayStore';
import { TopNav } from "../../../components/TopNav";

import './index.less';

@observer
export class MusicDetails extends Component {

    static contextType = MyPlayStore;

    state = {
        like: false,
        current: 0
    }

    async markLikeSong() {
        // TODO: 未完成收藏功能
        // const { code } = await API.get('/like', { id });

        this.setState({ like: !this.state.like });
    }

    onTouchStart(e) {
        const touch = e.touches[0];
        this.touch = {
            startX: touch.pageX,
            startY: touch.pageY,
        }
    }

    onTouchMove(e) {
        if (!this.touch) { return }

        const touch = e.touches[0];

        //计算X、Y方向的移动距离
        const offsetX = touch.pageX - this.touch.startX;
        const offsetY = touch.pageY - this.touch.startY;

        if (Math.abs(offsetY) > Math.abs(offsetX)) {
            //如果Y轴方向移动距离大于X轴则return
            return
        }

        console.log(offsetX, offsetY);

        this.setState({ current: offsetX });
    }

    onTouchEnd(e) {
        this.context.changeCurrentTime(this.state.current);
    }

    render() {
        const { like } = this.state;
        const { onClickHandle, detailMark, audioPlay, playMode, currentTime, duration, clickPlayMusic, onSwitchMode, playList, percent, musicSwitchHandler, playId } = this.context;
        const { name, al = [], ar = [], alia = [] } = playList.find(p => p.id == playId);
        return (
            <div className={["music-details", detailMark ? "display-block" : "display-none"].join(' ')}>
                <div className="details-background">
                    <img src={al.picUrl} alt="" />
                </div>

                {/* 详情顶部 */}
                <div className="details-top">
                    <TopNav leftClick={(e) => onClickHandle('detailMark', e)}>{(
                        <div className="details-top-title">
                            <p>{name}{alia.length ? `(${alia.join('/')})` : ''}</p>
                            <p>{ar.map(p => p.name).join('/')}</p>
                        </div>
                    )}</TopNav>
                </div>

                {/* TODO: 还没写歌词滚动  详情中部 */}
                <div className="details-middle">
                    <div className="details-middle-cover">
                        <div className="details-middle-img spin" style={{ animationPlayState: audioPlay ? 'running' : 'paused' }} >
                            <img src={al.picUrl} alt="" />
                        </div>
                        <div className="details-middle-icon">
                            <ul>
                                <li>
                                    <svg onClick={this.markLikeSong.bind(this)} className="icon" aria-hidden="true">
                                        <use xlinkHref={like ? "#iconshoucang1" : "#iconfav-n"}></use>
                                    </svg>
                                </li>
                                <li>
                                    <svg onClick={this.markLikeSong.bind(this)} className="icon" aria-hidden="true">
                                        <use xlinkHref={like ? "#iconshoucang1" : "#iconfav-n"}></use>
                                    </svg>
                                </li>
                                <li>
                                    <svg onClick={this.markLikeSong.bind(this)} className="icon" aria-hidden="true">
                                        <use xlinkHref={like ? "#iconshoucang1" : "#iconfav-n"}></use>
                                    </svg>
                                </li>
                                <li>
                                    <svg onClick={this.markLikeSong.bind(this)} className="icon" aria-hidden="true">
                                        <use xlinkHref={like ? "#iconshoucang1" : "#iconfav-n"}></use>
                                    </svg>
                                </li>
                                <li>
                                    <svg onClick={this.markLikeSong.bind(this)} className="icon" aria-hidden="true">
                                        <use xlinkHref={like ? "#iconshoucang1" : "#iconfav-n"}></use>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="details-middle-lyrics"></div>
                </div>

                {/* 详情底部 */}
                <div className="details-bottom">
                    <div className="details-progress-bar">
                        <span>{currentTime}</span>
                        <Progress percent={percent} position="normal" />
                        {/* 每秒移动2.1px */}
                        <div onTouchEnd={this.onTouchEnd.bind(this)} onTouchMove={this.onTouchMove.bind(this)} onTouchStart={this.onTouchStart.bind(this)} style={{ transform: `translateX(${percent >= 100 ? 720 : percent * 7.2}%)` }} className="details-progress-circle">
                            <div className="progress-circle-btn"></div>
                        </div>
                        <span>{duration}</span>
                    </div>
                    <div className="details-bottom-icon">
                        <ul>
                            <li>
                                <svg onClick={() => onSwitchMode()} className="icon" aria-hidden="true">
                                    <use xlinkHref={playMode ? "#iconshunxu" : "#icondanqu"}></use>
                                </svg>
                            </li>
                            <li>
                                <svg onClick={() => musicSwitchHandler('previous')} className="icon" aria-hidden="true">
                                    <use xlinkHref="#iconshangyishou"></use>
                                </svg>
                            </li>
                            <li>
                                <svg onClick={(e) => clickPlayMusic(e)} className="icon" aria-hidden="true">
                                    <use xlinkHref={audioPlay ? "#iconpcduanbizhixiazaicishutubiao1" : "#iconyinle-bofang"}></use>
                                </svg>
                            </li>
                            <li>
                                <svg onClick={() => musicSwitchHandler('next')} className="icon" aria-hidden="true">
                                    <use xlinkHref="#iconxiayishou"></use>
                                </svg>
                            </li>
                            <li>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#iconliebiao"></use>
                                </svg>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
        )
    }
}