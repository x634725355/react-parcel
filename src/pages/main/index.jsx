import React, { Component } from "react";
import { Route } from "react-router-dom";
import { observer } from 'mobx-react';

import { Home } from '../../pages/main/Home';
import { RecommendedDaily } from '../../pages/sub/RecommendedDaily';
import { MusicDetails } from "./MusicDetails";
import { PlayMusic } from "../../components/PlayMusic";
import { PlayList } from "./PlayList";
import { SongList } from "../sub/SongList";
import { Seach } from "../sub/Seach";
// 状态管理器
import { MyPlayStore } from '../../components/MyPlayStore/MyPlayStore';



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
                <Route path="/main/songlist/:id" exact component={SongList} />
                <Route path="/main/seach" exact component={Seach} />

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