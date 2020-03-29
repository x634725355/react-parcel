import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import { MyPlayStore } from '../MyPlayStore/MyPlayStore';
import { USER_DATA_KEY } from '../../utils/share';
import { API } from '../../utils/fetchAPI';

import { observer } from 'mobx-react';

import './index.less';

@observer
export class MyMusic extends Component {

    // Context 获取状态管理器
    static contextType = MyPlayStore;

    state = {
        userData: JSON.parse(localStorage[USER_DATA_KEY]),
        mySongList: []
    }

    componentDidMount() {
        this.getUserSongList();
    }

    async getUserSongList() {
        const { playlist } = await API.get('/user/playlist', { uid: this.state.userData.userId });

        this.setState({ mySongList: playlist });

    }

    renderMySongList() {
        const { mySongList } = this.state;
        return (
            <div className="my-music-songlist">
                <div className="my-music-text">我的音乐</div>

                {
                    mySongList.length &&
                    <div className="music-songlist-main">
                        {mySongList.map(p => (
                            <Link key={p.id} to={`/main/songlist/${p.id}/0`} className="music-songlist-individual">
                                <img src={p.coverImgUrl} alt="" />
                                <div className="songlist-individual-introduction">
                                    <p>{p.name}</p>
                                    <p>{p.trackCount}首</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                }
            </div>
        );
    }



    render() {

        const { userData: { backgroundUrl, avatarUrl, nickname } } = this.state;

        return (
            <div style={{ backgroundImage: `url(${backgroundUrl})` }} className="my-music">

                <div className="my-music-introduction">
                    <img src={avatarUrl} alt="" />
                    <div className="my-introduction-name">
                        <p>{nickname}</p>
                        <p>Lv.9</p>
                    </div>
                </div>


                {this.renderMySongList()}

                <div style={{ height: 50, width: 20 }}></div>
            </div>
        )
    }

}