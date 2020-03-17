import React, { Component } from 'react';
import { Transition } from 'react-spring/renderprops'
import { observer } from 'mobx-react';
import { Toast, Progress } from 'antd-mobile';

// 状态管理器
import { MyPlayStore } from '../../../components/MyPlayStore/MyPlayStore';
import { TopNav } from "../../../components/TopNav";

import { API } from '../../../utils/fetchAPI';
import { SONG_ID_KEY } from '../../../utils/share';

import './index.less';

@observer
export class MusicDetails extends Component {

    static contextType = MyPlayStore;

    state = {
        like: false
    }

    async markLikeSong() {
        const id = localStorage[SONG_ID_KEY];
        const { code } = await API.get('/like', { id });

        this.setState({ like: !this.state.like });
    }

    render() {
        const { like } = this.state;
        const { songData: { name, al = [], ar = [], alia = [] } } = this.props;
        const { onClickHandle, detailMark, audioPlay } = this.context;
        return (
            // <Transition>
            <div className={["music-details", detailMark ? "display-block" : "display-none"].join(' ')}>
                <div className="details-background">
                    <img src={al.picUrl} alt="" />
                </div>

                <div className="details-top">
                    <TopNav leftClick={(e) => onClickHandle('detailMark', e)}>{(
                        <div className="details-top-title">
                            <p>{name}{alia.length ? `(${alia.join('/')})` : ''}</p>
                            <p>{ar.map(p => p.name).join('/')}</p>
                        </div>
                    )}</TopNav>
                </div>

                <div className="details-middle">
                    <div className="details-middle-cover">
                        <div className="details-middle-img spin" style={{ animationPlayState: audioPlay ? 'running' : 'paused' }} >
                            <img src={al.picUrl} alt="" />
                        </div>
                        <div className="details-middle-icon">
                            <ul>
                                <li></li>
                                <li></li>
                                <li>
                                    <svg onClick={this.markLikeSong.bind(this)} className="icon" aria-hidden="true">
                                        <use xlinkHref={like ? "#iconshoucang1" : "#iconfav-n"}></use>
                                    </svg>
                                </li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <div className="details-middle-lyrics"></div>
                </div>

                <div className="details-bottom">
                    <div className="details-progress-bar">
                        <Progress percent={30} position="normal" style={{}} />
                    </div>
                    <div className="details-bottom-icon">

                    </div>
                </div>
            </div >
            // {/* </Transition> */}
        )
    }
}