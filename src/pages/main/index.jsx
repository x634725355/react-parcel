import React, { Component } from "react";
import { Route } from "react-router-dom";
import { observer } from 'mobx-react';

import { Home } from '../../pages/main/Home';
import { BasicLogin } from '../../pages/sub/Login';
import { RecommendedDaily } from '../../pages/sub/RecommendedDaily';
import { MusicDetails } from "./MusicDetails";
import { PlayMusic } from "../../components/PlayMusic";
import { PlayList } from "./PlayList";
// 状态管理器
import { MyPlayStore } from '../../components/MyPlayStore/MyPlayStore';

import { API } from "../../utils/fetchAPI";
import { SONG_LIST_KEY } from "../../utils/share";

import './index.less'

@observer
export class Main extends Component {

    static contextType = MyPlayStore;

    render() {
        const { onClickHandle, musicMark } = this.context;
        console.log(musicMark);
        
        return (
            <div className="box">
                <Route path="/main/home" component={() => (<Home ></Home>)} />
                <Route path="/main/recommended" exact component={RecommendedDaily} />

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