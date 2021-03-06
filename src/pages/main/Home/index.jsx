import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Tabs } from 'antd-mobile';

import { Find } from '../../../components/Find';
import { iphoneHeight } from '../../../utils/share';
import { MyMusic } from '../../../components/MyMusic';

// 状态管理器
import { MyPlayStore } from '../../../components/MyPlayStore/MyPlayStore';
import { observer } from 'mobx-react';

import './index.less';


@observer
export default class Home extends Component {
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

        return (
            <div className="home" style={{ height: iphoneHeight + 50 }} >

                <div className="menu iconfont iconliebiao">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#iconliebiao"></use>
                    </svg>
                </div>
                <div className="search iconfont iconsousuo">
                    <Link to="/main/seach">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconsousuo"></use>
                        </svg>
                    </Link>
                </div>
                <Tabs tabs={tabs}
                    initialPage={activeTab}
                    tabBarUnderlineStyle={{ border: "none" }}
                    swipeable={swipeable}
                    useOnPan={false}
                >
                    <div className="tabs-item" >
                        <MyMusic></MyMusic>
                    </div>
                    <div className="tabs-item" >
                        <Find onWiperChange={this.changeSwipeable.bind(this)} ></Find>
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