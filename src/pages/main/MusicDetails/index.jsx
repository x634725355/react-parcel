import React, { Component } from 'react';
import { Transition } from 'react-spring/renderprops'
import { observer } from 'mobx-react';

// 状态管理器
import { MyPlayStore } from '../../../components/MyPlayStore/MyPlayStore';
import { TopNav } from "../../../components/TopNav";

import { API } from '../../../utils/fetchAPI';
import { SONG_ID_KEY } from '../../../utils/share';

import './index.less';

@observer
export class MusicDetails extends Component {

    static contextType = MyPlayStore;

    async markLikeSong() {
        const id = localStorage[SONG_ID_KEY];
        const res = await API.get('/like', { id });
        console.log(res);
    }

    render() {
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
                            <p>{name}</p>
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
                                        <use xlinkHref="#iconfav-n"></use>
                                    </svg>
                                </li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <div className="details-middle-lyrics"></div>
                </div>
            </div >
            // {/* </Transition> */}
        )
    }
}