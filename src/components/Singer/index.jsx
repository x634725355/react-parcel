import React, { Component } from "react";
import { observer } from "mobx-react";


import { MyPlayStore } from "../MyPlayStore/MyPlayStore";
import { API } from "../../utils/fetchAPI";

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
        tabIndex: 0,
        singerData: {}
    };

    componentDidMount() {
        console.log(this.props.match.params);
        this.getSingerData(this.props.match.params.id);
    }

<<<<<<< HEAD
    async getSingerData() {
        const res = API.get();
=======
    async getSingerData(id) {
        const res = await API.get('/artist/desc', { id });

        console.log(res);

        this.setState({ singerData: { data: res.introduction[0], briefDesc: res.briefDesc } });
>>>>>>> 563b538a98824377ad66072fab8ad4a30fecd178
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