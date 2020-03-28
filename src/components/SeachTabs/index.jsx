import React, { Component } from "react";
import { observer } from 'mobx-react';
import { Tabs, ActivityIndicator } from "antd-mobile";
import { List, AutoSizer, WindowScroller } from "react-virtualized";

import SongBook from "../Songbook";

// 状态管理器
import { MyPlayStore } from "../MyPlayStore/MyPlayStore";
import { API } from "../../utils/fetchAPI";

import './index.less';

const tabsKey = [0, 'artists', 'albums', 'playlists'];

@observer
export class SeachTabs extends Component {

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

    componentDidUpdate({ seachData }) {
        const { seachData: { value } } = this.props;
        const { tabs, tabIndex } = this.state;

        seachData && (value === seachData.value || this.onChange(tabs[tabIndex], tabIndex, value));
    }

    async onChange(tab, index, keywords) {
        console.log(tab);

        const { result } = await API.get('/search', { keywords, type: tab.sub });

        this.state.tabData[index] = result;

        this.setState({ tabData: this.state.tabData, tabIndex: index }, () => console.log(this.state.tabData));
    }

    rowRenderer(tabData, id, { key, index, style }) {

        switch (id) {
            case 1:
                return (
                    <div style={style} key={key} >
                        <div className='seachtabs-singer-item'>
                            <div className="singer-item-left">
                                <img src={tabData.artists[index].picUrl || tabData.artists[index].img1v1Url} alt="" />
                                <span>{tabData.artists[index].name}</span>
                                <span> {tabData.artists[index].alias[0] ? '(' : ''} {tabData.artists[index].trans || tabData.artists[index].alias[0]} {tabData.artists[index].alias[0] ? ')' : ''} </span>
                            </div>
                            {tabData.artists[index].followed &&
                                <div className="singer-item-right">
                                    <div>🦄</div>
                                    <span>已入驻</span>
                                </div>
                            }

                        </div>
                    </div>
                );
            case 2:
                return (
                    <div style={style} key={key} >
                        <div className='seachtabs-album-item'>
                            <div className="album-item-left">
                                <img src={tabData.albums[index].picUrl} alt="" />
                            </div>
                            <div className='album-item-right'>
                                <p></p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                );
            case 3:

                break;
            default:
                break;
        }


    }

    renderSinger(index) {
        const { tabData } = this.state;
        return (
            <WindowScroller>
                {({ height, isScrolling, scrollTop }) => (
                    <AutoSizer>
                        {({ width }) => (
                            <>
                                <List
                                    style={{ backgroundColor: '#fff' }}
                                    autoHeight
                                    isScrolling={isScrolling}
                                    scrollTop={scrollTop}
                                    width={width}
                                    height={height}
                                    rowCount={tabData[index][tabsKey[index]].length}
                                    rowHeight={60}
                                    rowRenderer={this.rowRenderer.bind(this, tabData[index], index)}
                                />
                                <div style={{ height: 60, width: 100 }}></div>
                            </>
                        )}
                    </AutoSizer>
                )}
            </WindowScroller>
        );
    }

    render() {
        const { tabs, activeTab, swipeable, tabData } = this.state;
        const { seachData } = this.props;
        return (
            <div className="seachtabs" >
                <Tabs
                    tabs={tabs}
                    onChange={(tab, index) => this.onChange(tab, index, seachData.value)}
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
                    <div className="seachtabs-item" >
                        {!tabData[1] ? <div className='wait'>
                            <ActivityIndicator
                                toast
                                text="Loading..."
                                animating={!tabData[1]}
                            />
                        </div> : this.renderSinger(1)}
                    </div>
                    <div className="seachtabs-item" >
                        {!tabData[2] ? <div className='wait'>
                            <ActivityIndicator
                                toast
                                text="Loading..."
                                animating={!tabData[2]}
                            />
                        </div> : this.renderSinger(2)}
                    </div>
                    <div className="seachtabs-item" >
                        Content of third tab
                    </div>
                </Tabs>
            </div>
        );
    }


}