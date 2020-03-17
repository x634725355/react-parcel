import React, { Component } from 'react';

import { Tabs } from 'antd-mobile';

import { Find } from '../../../components/Find';
import { iphoneHeight } from '../../../utils/share';
import { API } from '../../../utils/fetchAPI';

// 状态管理器
import { MyPlayStore } from '../../../components/MyPlayStore/MyPlayStore';
import { observer } from 'mobx-react';


import './index.less';


@observer
export class Home extends Component {
    state = {
        tabs: [
            { title: '我的', sub: '0' },
            { title: '发现', sub: '1' },
            { title: '云村', sub: '2' },
            { title: '视频', sub: '3' },
        ],
        activeTab: 1,
        userData: null,
        swipeable: true,
    }

    // Context 获取状态管理器
    static contextType = MyPlayStore;

    changeSwipeable(swipeable) {
        this.setState({ swipeable });
    }


    render() {
        const { tabs, activeTab, swipeable } = this.state;
        const { onClickSongId } = this.props;
        
        return (
            <div className="home" style={{ height: iphoneHeight }} >

                <div className="menu iconfont iconliebiao">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#iconliebiao"></use>
                    </svg>
                </div>
                <div className="search iconfont iconsousuo">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#iconsousuo"></use>
                    </svg>
                </div>
                <Tabs tabs={tabs}
                    initialPage={activeTab}
                    tabBarUnderlineStyle={{ border: "none" }}
                    swipeable={swipeable}
                    useOnPan={false}
                >
                    <div className="tabs-item" >
                        Content of first tab
                    </div>
                    <div className="tabs-item" >
                        <Find onClickSongId={onClickSongId} onWiperChange={this.changeSwipeable.bind(this)} ></Find>
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