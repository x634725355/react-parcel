import React, { Component } from "react";
import { observer } from "mobx-react";


import { MyPlayStore } from "../MyPlayStore/MyPlayStore";


import './index.less';

@observer
export default class Singer extends Component {

    static contextType = MyPlayStore;

    state = {
        tabs: [
            { title: '单曲', sub: '1' },
            { title: '歌手', sub: '100' },
            { title: '专辑', sub: '10' },
            { title: '歌单', sub: '1000' },
        ],
        activeTab: 0,
        swipeable: true,
        tabData: new Array(4).fill(0),
        tabIndex: 0
    };

    componentDidMount() {

    }

    async getSingerData() {
        
    }

    // style={{backgroundImage: }}
    render() {
        return (
            <div className="singer-item">
                <div className=""></div>
            </div>
        )
    }

}