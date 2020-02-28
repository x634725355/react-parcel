import React, { Component } from 'react';

import { Tabs } from 'antd-mobile';

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
        windowHeight: document.documentElement.clientHeight
    }

    render() {
        const { tabs, activeTab, windowHeight } = this.state;
        return (
            <div className="home" style={{ height: windowHeight }} >
                <div className="menu iconfont iconliebiao"></div>
                <div className="search iconfont iconsousuo"></div>
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
                        Content of second tab
                    </div>
                    <div className="tabs-item" >
                        Content of third tab
                    </div>
                    <div className="tabs-item" >
                        Content of third tab
                    </div>
                </Tabs>

            </div>
        )
    }
}