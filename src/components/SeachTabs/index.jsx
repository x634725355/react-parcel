import React, { Component } from "react";
import { observer } from 'mobx-react';
import { Tabs, ActivityIndicator } from "antd-mobile";
import { List, AutoSizer, WindowScroller } from "react-virtualized";

import SongBook from "../Songbook";

// 状态管理器
import { MyPlayStore } from "../MyPlayStore/MyPlayStore";
import { API } from "../../utils/fetchAPI";

import './index.less';

@observer
export class SeachTabs extends Component {

    static contextType = MyPlayStore;

    state = {
        tabs: [
            { title: '单曲', sub: '0' },
            { title: '歌手', sub: '100' },
            { title: '专辑', sub: '10' },
            { title: '歌单', sub: '1000' },
        ],
        activeTab: 0,
        swipeable: true,
    };

    componentDidMount() {

    }

    

    render() {
        const { tabs, activeTab, swipeable } = this.state;
        const { seachData } = this.props;
        return (
            <div className="seachtabs" >
                <Tabs
                    tabs={tabs}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    initialPage={activeTab}
                    tabBarUnderlineStyle={{ border: "none" }}
                    swipeable={swipeable}
                    useOnPan
                    tabBarUnderlineStyle={{ height: 5, backgroundColor: '#108ee9' }}
                // usePaged
                >
                    <div className="tabs-item" >
                        {!seachData ? <div className='wait'>
                            <ActivityIndicator
                                toast
                                text="Loading..."
                                animating={!seachData}
                            />
                        </div> : <SongBook songListData={seachData} ></SongBook>}

                    </div>
                    <div className="tabs-item" >
                        歌手
                    </div>
                    <div className="tabs-item" >
                        Content of third tab
                    </div>
                    <div className="tabs-item" >
                        Content of third tab
                    </div>
                </Tabs>
            </div>
        );
    }


}