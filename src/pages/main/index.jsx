import React, { Component, lazy } from "react";
import { Route } from "react-router-dom";
import { observer } from 'mobx-react';

// import Home from '../../pages/main/Home';
import { RecommendedDaily } from '../../pages/sub/RecommendedDaily';
// import MusicDetails  from "./MusicDetails";
// import PlayMusic from "../../components/PlayMusic";
// import PlayList from "./PlayList";
import { SongList } from "../sub/SongList";
// import Seach from "../sub/Seach";
// 状态管理器
import { MyPlayStore } from '../../components/MyPlayStore/MyPlayStore';

const PlayMusic = lazy(async () => await import('../../components/PlayMusic'));
const PlayList = lazy(async () => await import('./PlayList'));
const MusicDetails = lazy(async () => await import('./MusicDetails'));
const Seach = lazy(async () => await import('../sub/Seach'));
const Home = lazy(async () => await import('../../pages/main/Home'));
const Singer = lazy(async () => await import('../../components/Singer'));

import './index.less';

@observer
export class Main extends Component {

    static contextType = MyPlayStore;

    render() {
        const { onClickHandle, musicMark } = this.context;

        return (
            <div className="box">
                <Route path="/main/home" component={() => (<Home ></Home>)} />
                <Route path="/main/recommended/:id?" exact component={RecommendedDaily} />
                <Route path="/main/songlist/:id/:type?" exact component={SongList} />
                <Route path="/main/seach" component={Seach} />
                <Route path="/main/singer/:id" component={Singer} />

                {
                    musicMark && (
                        <>
                            <div onClick={() => onClickHandle('detailMark')}>
                                <PlayMusic></PlayMusic>
                            </div>

                            {/* 音乐详情页面  */}
                            <MusicDetails></MusicDetails>

                            {/* 音乐列表页面 */}
                            <PlayList></PlayList>
                        </>
                    )
                }


            </div>
        )
    }
}