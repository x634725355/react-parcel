import React, { Component } from "react";
import { Carousel, Flex } from 'antd-mobile';
import { Link } from "react-router-dom";

import { API } from "../../utils/fetchAPI";

import './index.less';

export class Find extends Component {

    state = {
        bannerData: [],
        imgHeight: 176,
        navList: [
            ['每日推荐', '#iconrili', 'recommended'],
            ['歌单', '#iconlist', 'recommended'],
            ['排行榜', '#iconpaixingbang', 'recommended'],
            ['电台', '#icondiantai', 'recommended'],
            ['私人FM', '#icondiantai1', 'recommended']
        ],
    }

    componentDidMount() {
        this.getbannerData();
    }

    async getbannerData() {
        const { banners } = await API.get('/banner', { type: 1 });

        const newBanners = banners.map(p => ({ img: p.pic, id: p.targetId, type: p.targetType, song: p.song }));

        this.setState({ bannerData: newBanners });

    }

    /* 渲染轮播图 */
    renderBanner() {
        const { onWiperChange } = this.props;
        const { bannerData } = this.state;
        return (
            <div className="banners"
                onTouchStart={() => onWiperChange(false)}
                onTouchEnd={() => onWiperChange(true)}
            >
                <Carousel
                    autoplay
                    infinite
                    dotActiveStyle={{ backgroundColor: '#c81912' }}
                    cellSpacing={15}
                    swipeSpeed={8}
                >
                    {this.state.bannerData.map(p => (
                        <a
                            key={p.id}
                            href="#"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight, padding: "0px 10px" }}
                        >
                            <img
                                src={`${p.img}`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top', height: 150, borderRadius: 10 }}
                                onLoad={() => this.setState({ imgHeight: 'auto' })}
                            />
                        </a>
                    ))}
                </Carousel>
            </div>
        );
    }

    // 导航栏渲染
    renderNavButton() {
        return (
            <div>
                <Flex className="nav">
                    {this.state.navList.map((i, key) => (
                        <Flex.Item key={key}>
                            <Link to={i[2]}>
                                <div className="nav-svg">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlinkHref={i[1]}></use>
                                    </svg>
                                </div>
                                <div className="title">{i[0]}</div>
                            </Link>
                        </Flex.Item>
                    ))}
                </Flex>
            </div >
        )
    }

    render() {
        return (
            <div>
                {/* 渲染轮播图 */}
                {this.renderBanner()}
                {/* 导航栏渲染 */}
                {this.renderNavButton()}
            </div>
        );
    }
}