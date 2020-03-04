import React, { Component } from 'react';

import { Tabs } from 'antd-mobile';

import { PlayMusic } from '../../../components/PlayMusic';
import { iphoneHeight } from '../../../utils/iphoneHeight';

import './index.less';



export class Home extends Component {
    state = {
        tabs: [
            { title: '我的', sub: '0' },
            { title: '发现', sub: '1' },
            { title: '云村', sub: '2' },
            { title: '视频', sub: '3' },
        ],
        activeTab: 1,
        userData: null

    }

    render() {
        const { tabs, activeTab } = this.state;
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
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    tabBarUnderlineStyle={{ border: "none" }}
                >
                    <div className="tabs-item" >
                        Content of first tab
                    </div>
                    <div className="tabs-item" >
                        123456
                    </div>
                    <div className="tabs-item" >
                        Content of third tab
                    </div>
                    <div className="tabs-item" >
                        Content of third tab
                    </div>
                </Tabs>


                <PlayMusic></PlayMusic>
            </div>
        )
    }
}