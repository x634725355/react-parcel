import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer } from 'mobx-react';
import { Tabs, ActivityIndicator } from "antd-mobile";
import { List, AutoSizer, WindowScroller } from "react-virtualized";

import SongBook from "../Songbook";

// 状态管理器
import { MyPlayStore } from "../MyPlayStore/MyPlayStore";
import { API } from "../../utils/fetchAPI";
import { dateFormat } from "../../utils/time";

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

    // 计算播放数据
    getPlaycount(data) {
        const length = data.length
        return length > 5 ? (length > 8 ? data.substring(0, length - 7) + '.' + data.substring(1, length - 7) + '亿' : data.substring(0, length - 4) + '万') : data
    }

    componentDidUpdate({ seachData }) {
        const { seachData: { value } } = this.props;
        const { tabs, tabIndex } = this.state;

        seachData && (value === seachData.value || this.onChange(tabs[tabIndex], tabIndex, value));
    }

    async onChange(tab, index, keywords) {

        const { result } = await API.get('/search', { keywords, type: tab.sub });

        this.state.tabData[index] = result;

        this.setState({ tabData: this.state.tabData, tabIndex: index }, () => console.log(this.state.tabData));
    }

    // 渲染tab栏
    rowRenderer(tabData, id, { key, index, style }) {

        switch (id) {
            case 1:
                return (
                    <div style={style} key={key} >
                        <Link to={`/main/singer/${tabData.artists[index].id}`} >
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
                        </Link>
                    </div>
                );
            case 2:
                return (
                    <div style={style} key={key} >
                        <Link to={`/main/songlist/${tabData.albums[index].id}/1`} >
                            <div className='seachtabs-album-item'>
                                <div className="album-item-left">
                                    <img src={tabData.albums[index].picUrl} alt="" />
                                </div>
                                <div className='album-item-right'>
                                    <p>{tabData.albums[index].name} <span>{tabData.albums[index].transNames ? '(' : ''} {tabData.albums[index].transNames && tabData.albums[index].transNames[0]} {tabData.albums[index].transNames ? ')' : ''}</span>  </p>
                                    <p>{tabData.albums[index].artist.name} &nbsp; {dateFormat(tabData.albums[index].publishTime)}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            case 3:
                return (
                    <div style={style} key={key} >
                        <Link to={`/main/songlist/${tabData.playlists[index].id}/0`} >
                            <div className='seachtabs-playlists-item'>
                                <div className="playlists-item-left">
                                    <img src={tabData.playlists[index].coverImgUrl} alt="" />
                                </div>
                                <div className='playlists-item-right'>
                                    <p>{tabData.playlists[index].name}</p>
                                    <p>{tabData.playlists[index].trackCount}&nbsp;by&nbsp;{tabData.playlists[index].creator.nickname},{this.getPlaycount(tabData.playlists[index].playCount + '')}次</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
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
                            Login.....
                        </div> : <SongBook songListData={seachData} ></SongBook>}

                    </div>
                    <div className="seachtabs-item" >
                        {!tabData[1] ? <div className='wait'>
                            Login.....
                        </div> : this.renderSinger(1)}
                    </div>
                    <div className="seachtabs-item" >
                        {!tabData[2] ? <div className='wait'>
                            Login.....
                        </div> : this.renderSinger(2)}
                    </div>
                    <div className="seachtabs-item" >
                        {!tabData[3] ? <div className='wait'>
                            Login.....
                        </div> : this.renderSinger(3)}
                    </div>
                </Tabs>
            </div>
        );
    }


}